import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { ChromaticAberrationShader } from './shaders/ChromaticAberrationShader.js';

const HDRI_PATH = '/hdri.jpg';
const SKYBOX_LOAD_TIMEOUT_MS = 15000;

export function initSpaceScene(container, options = {}) {
  const { onReady } = options;
  let skyboxReadyCalled = false;
  function skyboxReady() {
    if (skyboxReadyCalled) return;
    skyboxReadyCalled = true;
    onReady?.();
  }

  const width = container.clientWidth;
  const height = container.clientHeight;

  let renderer;
  let composer;
  let chromaticPass;
  let pmremGenerator;
  let animateId;

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    composer = new EffectComposer(renderer);
    composer.setSize(width, height);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.addPass(new RenderPass(scene, camera));
    chromaticPass = new ShaderPass(ChromaticAberrationShader);
    chromaticPass.renderToScreen = true;
    composer.addPass(chromaticPass);

    pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    function setFallbackBackground() {
      scene.background = new THREE.Color(0x020208);
    }

    const loadTimeout = setTimeout(() => {
      setFallbackBackground();
      skyboxReady();
    }, SKYBOX_LOAD_TIMEOUT_MS);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      HDRI_PATH,
      (texture) => {
        clearTimeout(loadTimeout);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        texture.dispose();
        scene.background = envMap;
        scene.environment = envMap;
        pmremGenerator.dispose();
        skyboxReady();
      },
      undefined,
      () => {
        clearTimeout(loadTimeout);
        setFallbackBackground();
        skyboxReady();
      }
    );

    const clock = new THREE.Clock();
    const radius = 8;
    const heightAmplitude = 2;
    const orbitSpeed = 0.08;
    const verticalSpeed = 0.03;

    function animate() {
      animateId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      camera.position.x = Math.sin(t * orbitSpeed) * radius;
      camera.position.z = Math.cos(t * orbitSpeed) * radius;
      camera.position.y = Math.sin(t * verticalSpeed) * heightAmplitude;
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();
      composer.render();
    }
    animate();

    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
      composer.setPixelRatio(renderer.getPixelRatio());
    }
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(loadTimeout);
      window.removeEventListener('resize', onResize);
      if (animateId != null) cancelAnimationFrame(animateId);
      chromaticPass?.dispose();
      composer?.dispose();
      renderer?.dispose();
      if (renderer?.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  } catch (err) {
    console.warn('Space scene: WebGL unavailable (e.g. on some mobile devices).', err);
    skyboxReady();
    return () => {};
  }
}
