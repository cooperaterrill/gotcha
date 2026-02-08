// renderer.js
import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

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

/*
 *
 * EXAMPLE:
 * await loadModel({
  url: "static/models/zombie/scene.gltf",
  scene,
  pos: [5, -0.6, -3],
  scale: 0.06,
  rot: [0, Math.PI / 2, 0],
});
 */
export async function loadModel({
  url,
  scene,
  pos = [0, 0, 0],
  scale = 1,
  rot = [0, 0, 0],
  colliderScale = 1,
}) {
  const loader = new GLTFLoader();
  const { scene: root } = await loader.loadAsync(url);

  /* ---- transforms ---- */
  root.position.set(...pos);
  root.rotation.set(...rot);

  if (typeof scale === "number") root.scale.setScalar(scale);
  else root.scale.set(...scale);

  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root); // world-space bounds
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  // convert world center to model's local space
  root.worldToLocal(center);

  const geo = new THREE.BoxGeometry(size.x, size.y, size.z);
  geo.translate(center.x, center.y, center.z); // bake center into geometry
  geo.scale(colliderScale, colliderScale, colliderScale);

  const mat = new THREE.MeshBasicMaterial({
    visible: false, // debug
  });

  const collider = new THREE.Mesh(geo, mat);
  collider.userData.isCollider = true;
  collider.userData.model = root;

  root.add(collider);
  scene.add(root);

  return { object: root, collider };
}

export function startRenderLoop({ scene, camera, renderer, update }) {
  function animate() {
    requestAnimationFrame(animate);
    if (update) update();
    renderer.render(scene, camera);
  }
  animate();
}
