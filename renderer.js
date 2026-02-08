// renderer.js
import * as THREE from "three";

export function createRenderer(containerId) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7ec0ee);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 4);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  document.getElementById(containerId).appendChild(renderer.domElement);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));

  const dir = new THREE.DirectionalLight(0xfffeee, 0.6);
  dir.position.set(5, 10, 5);
  dir.castShadow = true;
  scene.add(dir);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, renderer };
}

export function startRenderLoop({ scene, camera, renderer, update }) {
  function animate() {
    requestAnimationFrame(animate);
    if (update) update();
    renderer.render(scene, camera);
  }
  animate();
}
