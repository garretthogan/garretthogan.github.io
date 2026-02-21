/**
 * Chromatic aberration shader – RGB separation strongest at the periphery (edges).
 * Uses radial offset from center; amount scales with distance from center.
 */
export const ChromaticAberrationShader = {
  name: 'ChromaticAberrationShader',
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 0.003 },
    radius: { value: 0.75 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float amount;
    uniform float radius;

    varying vec2 vUv;

    void main() {
      vec2 uv = vUv - 0.5;
      float dist = length(uv);
      float fringe = smoothstep(radius, 1.0, dist / 0.71) * amount;

      vec2 dir = dist > 0.0001 ? normalize(uv) : vec2(1.0, 0.0);

      float r = texture2D(tDiffuse, vUv - dir * fringe).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv + dir * fringe).b;
      float a = texture2D(tDiffuse, vUv).a;

      gl_FragColor = vec4(r, g, b, a);
    }
  `,
};
