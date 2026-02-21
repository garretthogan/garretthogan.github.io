import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { ChromaticAberrationShader } from './shaders/ChromaticAberrationShader.js';

const HDRI_PATH = '/hdri.jpg';

export function initSpaceScene(container) {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const composer = new EffectComposer(renderer);
  composer.setSize(width, height);
  composer.setPixelRatio(renderer.getPixelRatio());
  composer.addPass(new RenderPass(scene, camera));
  const chromaticPass = new ShaderPass(ChromaticAberrationShader);
  chromaticPass.renderToScreen = true;
  composer.addPass(chromaticPass);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  function setFallbackBackground() {
    scene.background = new THREE.Color(0x020208);
  }

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    HDRI_PATH,
    (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      texture.dispose();
      scene.background = envMap;
      scene.environment = envMap;
      pmremGenerator.dispose();
    },
    undefined,
    () => {
      console.warn(
        'Space scene: skybox not loaded. Put an equirectangular image at public/hdri.jpg'
      );
      setFallbackBackground();
    }
  );

  // Flying camera: smooth orbital path with gentle vertical drift
  const clock = new THREE.Clock();
  const radius = 8;
  const heightAmplitude = 2;
  const orbitSpeed = 0.08;
  const verticalSpeed = 0.03;

  function animate() {
    requestAnimationFrame(animate);
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
    window.removeEventListener('resize', onResize);
    chromaticPass.dispose();
    composer.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}
