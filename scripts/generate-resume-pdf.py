#!/usr/bin/env python3
"""Generate Garrett Hogan's static resume PDF from public/resume.md."""

from __future__ import annotations

import argparse
import html
import re
import shutil
from dataclasses import dataclass, field
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "resume.md"
OUTPUT = ROOT / "output" / "pdf" / "Garrett-Hogan-Resume.pdf"
PUBLIC_OUTPUT = ROOT / "public" / "Garrett-Hogan-Resume.pdf"

INK = colors.HexColor("#172033")
MUTED = colors.HexColor("#566176")
ACCENT = colors.HexColor("#126B72")
ACCENT_LIGHT = colors.HexColor("#DCECEF")
RULE = colors.HexColor("#CBD4DD")
PAPER = colors.HexColor("#FCFDFD")


@dataclass
class Entry:
    title: str
    date: str = ""
    url: str = ""
    paragraphs: list[str] = field(default_factory=list)
    bullets: list[str] = field(default_factory=list)


@dataclass
class Resume:
    name: str
    website: str
    contacts: list[str]
    summary: str
    skills: list[tuple[str, str]]
    experience: list[Entry]
    independent_work: list[Entry]


def ascii_hyphens(value: str) -> str:
    """Normalize dash-like Unicode characters while preserving ordinary text."""
    return (
        value.replace("\u2010", "-")
        .replace("\u2011", "-")
        .replace("\u2012", "-")
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2212", "-")
    )


def strip_md_inline(value: str) -> str:
    value = ascii_hyphens(value.strip())
    value = re.sub(r"\*\*(.*?)\*\*", r"\1", value)
    return value


def parse_resume(source: Path) -> Resume:
    lines = source.read_text(encoding="utf-8").splitlines()
    if not lines or not lines[0].startswith("# "):
        raise ValueError("resume.md must start with a level-one name heading")

    name = strip_md_inline(lines[0][2:])
    index = 1

    def next_nonempty() -> str:
        nonlocal index
        while index < len(lines) and not lines[index].strip():
            index += 1
        if index >= len(lines):
            raise ValueError("resume.md ended unexpectedly")
        value = lines[index].strip()
        index += 1
        return value

    website = strip_md_inline(next_nonempty())
    contacts = [strip_md_inline(item) for item in next_nonempty().split("|")]
    summary_parts: list[str] = []
    while index < len(lines) and not lines[index].startswith("## "):
        if lines[index].strip():
            summary_parts.append(strip_md_inline(lines[index]))
        index += 1
    summary = " ".join(summary_parts)

    sections: dict[str, list[str]] = {}
    current = ""
    for raw_line in lines[index:]:
        if raw_line.startswith("## "):
            current = raw_line[3:].strip()
            sections[current] = []
        elif current:
            sections[current].append(raw_line)

    required = {"Skills", "Experience", "Independent Work"}
    missing = required - sections.keys()
    if missing:
        raise ValueError(f"resume.md is missing sections: {sorted(missing)}")

    skills: list[tuple[str, str]] = []
    for raw_line in sections["Skills"]:
        match = re.match(r"\*\*(.+?):\*\*\s*(.+)", raw_line.strip())
        if match:
            skills.append((strip_md_inline(match.group(1)), strip_md_inline(match.group(2))))

    experience = parse_entries(sections["Experience"], has_date=True)
    independent = parse_entries(sections["Independent Work"], has_date=False)

    return Resume(
        name=name,
        website=website,
        contacts=contacts,
        summary=summary,
        skills=skills,
        experience=experience,
        independent_work=independent,
    )


def parse_entries(lines: list[str], *, has_date: bool) -> list[Entry]:
    entries: list[Entry] = []
    current: Entry | None = None
    paragraph_lines: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph_lines
        if current and paragraph_lines:
            current.paragraphs.append(" ".join(paragraph_lines))
        paragraph_lines = []

    for raw_line in lines + [""]:
        line = raw_line.strip()
        if raw_line.startswith("### "):
            flush_paragraph()
            current = Entry(title=strip_md_inline(raw_line[4:]))
            entries.append(current)
        elif not current:
            continue
        elif not line:
            flush_paragraph()
        elif has_date and re.fullmatch(r"\*\*.+\*\*", line) and not current.date:
            current.date = strip_md_inline(line)
        elif line.startswith("- "):
            flush_paragraph()
            current.bullets.append(strip_md_inline(line[2:]))
        elif re.fullmatch(r"https?://\S+", line) and not current.url:
            flush_paragraph()
            current.url = strip_md_inline(line)
        else:
            paragraph_lines.append(strip_md_inline(line))

    return entries


def href(value: str) -> str:
    if value.startswith("http://") or value.startswith("https://"):
        return value
    if "@" in value and " " not in value:
        return f"mailto:{value}"
    return f"https://{value}"


def link_markup(label: str) -> str:
    escaped_label = html.escape(label)
    escaped_href = html.escape(href(label), quote=True)
    return f'<link href="{escaped_href}" color="#126B72">{escaped_label}</link>'


def url_link_markup(value: str) -> str:
    display = re.sub(r"^https?://", "", value).rstrip("/")
    escaped_display = html.escape(display)
    escaped_href = html.escape(href(value), quote=True)
    return f'<link href="{escaped_href}" color="#126B72">{escaped_display}</link>'


def make_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "ResumeName",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=30,
            leading=32,
            textColor=INK,
            spaceAfter=2,
        ),
        "role": ParagraphStyle(
            "ResumeRole",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            textColor=ACCENT,
            tracking=1.25,
            spaceAfter=9,
        ),
        "contact": ParagraphStyle(
            "ResumeContact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.35,
            leading=10.5,
            textColor=MUTED,
        ),
        "body": ParagraphStyle(
            "ResumeBody",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.8,
            leading=13.2,
            textColor=INK,
            spaceAfter=6,
        ),
        "section": ParagraphStyle(
            "ResumeSection",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=11.5,
            textColor=ACCENT,
            tracking=1.15,
            spaceBefore=8,
            spaceAfter=5,
        ),
        "skill": ParagraphStyle(
            "ResumeSkill",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.1,
            leading=11.7,
            textColor=INK,
            spaceAfter=3,
        ),
        "entry": ParagraphStyle(
            "ResumeEntry",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=11.2,
            leading=13,
            textColor=INK,
        ),
        "date": ParagraphStyle(
            "ResumeDate",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.7,
            leading=10.5,
            textColor=MUTED,
            alignment=TA_RIGHT,
        ),
        "bullet": ParagraphStyle(
            "ResumeBullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.25,
            leading=12.3,
            textColor=INK,
            leftIndent=12,
            firstLineIndent=-8,
            bulletIndent=0,
            spaceAfter=4,
        ),
        "project_url": ParagraphStyle(
            "ResumeProjectUrl",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.3,
            leading=10.5,
            textColor=ACCENT,
            alignment=TA_RIGHT,
        ),
        "project_desc": ParagraphStyle(
            "ResumeProjectDesc",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.1,
            leading=12.2,
            textColor=INK,
            spaceAfter=8,
        ),
    }


def section_heading(title: str, style: ParagraphStyle, width: float) -> Table:
    label = Paragraph(html.escape(title.upper()), style)
    table = Table([[label]], colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                ("LINEBELOW", (0, 0), (-1, -1), 0.6, RULE),
            ]
        )
    )
    return table


def first_role_title(resume: Resume) -> str:
    if not resume.experience:
        return "SOFTWARE ENGINEER"
    return resume.experience[0].title.split(",", 1)[0].upper()


def build_story(resume: Resume, width: float, styles: dict[str, ParagraphStyle]):
    story = [
        Paragraph(html.escape(resume.name), styles["name"]),
        Paragraph(html.escape(first_role_title(resume)), styles["role"]),
    ]

    contact_values = [resume.website, *resume.contacts]
    contact_text = " &nbsp;|&nbsp; ".join(link_markup(item) for item in contact_values)
    story.extend(
        [
            Paragraph(contact_text, styles["contact"]),
            Spacer(1, 11),
            Paragraph(html.escape(resume.summary), styles["body"]),
            section_heading("Skills", styles["section"], width),
            Spacer(1, 4),
        ]
    )

    for label, value in resume.skills:
        text = f"<b>{html.escape(label)}:</b> {html.escape(value)}"
        story.append(Paragraph(text, styles["skill"]))

    story.extend(
        [
            section_heading("Experience", styles["section"], width),
            Spacer(1, 4),
        ]
    )

    for entry in resume.experience:
        row = Table(
            [
                [
                    Paragraph(html.escape(entry.title), styles["entry"]),
                    Paragraph(html.escape(entry.date), styles["date"]),
                ]
            ],
            colWidths=[width * 0.76, width * 0.24],
        )
        row.setStyle(
            TableStyle(
                [
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            )
        )
        story.append(row)
        for paragraph in entry.paragraphs:
            story.append(Paragraph(html.escape(paragraph), styles["body"]))
        for bullet in entry.bullets:
            story.append(Paragraph(html.escape(bullet), styles["bullet"], bulletText="-"))

    story.extend(
        [
            section_heading("Independent Work", styles["section"], width),
            Spacer(1, 4),
        ]
    )

    for entry in resume.independent_work:
        url = url_link_markup(entry.url) if entry.url else ""
        description = " ".join(entry.paragraphs)
        project = Table(
            [
                [
                    Paragraph(html.escape(entry.title), styles["entry"]),
                    Paragraph(url, styles["project_url"]),
                ],
                [
                    Paragraph(html.escape(description), styles["project_desc"]),
                    "",
                ],
            ],
            colWidths=[width * 0.45, width * 0.55],
        )
        project.setStyle(
            TableStyle(
                [
                    ("SPAN", (0, 1), (1, 1)),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 1),
                    ("BOTTOMPADDING", (0, 1), (-1, 1), 5),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            )
        )
        story.append(KeepTogether([project]))

    return story


def draw_page(canvas, doc) -> None:
    page_width, page_height = LETTER
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, page_width, page_height, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, page_height - 7, page_width, 7, fill=1, stroke=0)

    footer_y = 24
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, footer_y + 12, page_width - doc.rightMargin, footer_y + 12)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(doc.leftMargin, footer_y, "Garrett Hogan | Resume")
    page_label = f"Page {doc.page}"
    canvas.drawString(
        page_width - doc.rightMargin - stringWidth(page_label, "Helvetica", 7.5),
        footer_y,
        page_label,
    )
    canvas.restoreState()


def generate(source: Path, output: Path, public_output: Path) -> None:
    resume = parse_resume(source)
    output.parent.mkdir(parents=True, exist_ok=True)
    public_output.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(output),
        pagesize=LETTER,
        rightMargin=0.70 * inch,
        leftMargin=0.70 * inch,
        topMargin=0.50 * inch,
        bottomMargin=0.58 * inch,
        title=f"{resume.name} Resume",
        author=resume.name,
        subject="Professional resume",
        creator="scripts/generate-resume-pdf.py",
    )
    story = build_story(resume, doc.width, make_styles())
    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
    shutil.copyfile(output, public_output)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=SOURCE)
    parser.add_argument("--output", type=Path, default=OUTPUT)
    parser.add_argument("--public-output", type=Path, default=PUBLIC_OUTPUT)
    args = parser.parse_args()
    generate(args.source, args.output, args.public_output)
    print(args.output)
    print(args.public_output)


if __name__ == "__main__":
    main()
