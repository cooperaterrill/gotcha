// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7ec0ee);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 4); // Position camera back from origin
camera.lookAt(0, 0, 0); // Look at center

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById("canvas-container").appendChild(renderer.domElement);
// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfffeee, 0.6);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

scene.add(ground);

const raycaster = new THREE.Raycaster();
let mouseX = 0;
let mouseY = 0;
let pitch = 0; // Up/down rotation
let yaw = 0; // Left/right rotation

document.addEventListener("mousemove", (e) => {
  mouseX = e.movementX || 0;
  mouseY = e.movementY || 0;

  yaw -= mouseX * 0.002;
  pitch -= mouseY * 0.002;

  // Limit pitch to prevent flipping
  pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
});
const moveSpeed = 0.1;
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  space: false,
  shift: false,
};

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key in keys) keys[key] = true;
});

window.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();
  if (key in keys) keys[key] = false;
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  camera.rotation.order = "YXZ";
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
  if (keys.w) camera.position.z -= moveSpeed;
  if (keys.s) camera.position.z += moveSpeed;
  if (keys.a) camera.position.x -= moveSpeed;
  if (keys.d) camera.position.x += moveSpeed;
  if (keys.space) camera.position.y += moveSpeed;
  if (keys.shift) camera.position.y -= moveSpeed;
  renderer.render(scene, camera);
}

animate();
