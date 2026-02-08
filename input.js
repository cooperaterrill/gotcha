// fpsControls.js
import * as THREE from "three";

export function attachFPSControls(camera, renderer, options = {}) {
  const canvas = renderer.domElement;

  // Options
  const moveSpeed = options.moveSpeed ?? 0.1;
  const mouseSensitivity = options.mouseSensitivity ?? 0.002;

  // Camera rotation
  let yaw = 0;
  let pitch = 0;

  // Movement keys
  const keys = { w: 0, a: 0, s: 0, d: 0 };

  // Pointer lock request
  canvas.addEventListener("click", () => {
    canvas.requestPointerLock();
  });

  // Mouse movement
  document.addEventListener("mousemove", (e) => {
    if (document.pointerLockElement === canvas) {
      yaw -= e.movementX * mouseSensitivity;
      pitch -= e.movementY * mouseSensitivity;

      // clamp pitch
      pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

      camera.rotation.order = "YXZ";
      camera.rotation.y = yaw;
      camera.rotation.x = pitch;
    }
  });

  // Key press
  window.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (k in keys) keys[k] = 1;
  });
  window.addEventListener("keyup", (e) => {
    const k = e.key.toLowerCase();
    if (k in keys) keys[k] = 0;
  });

  // Vector helpers
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);

  // Call this inside your render loop
  function update() {
    // Compute camera directions
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(forward, up).normalize();

    // Move camera
    if (keys.w) camera.position.addScaledVector(forward, moveSpeed);
    if (keys.s) camera.position.addScaledVector(forward, -moveSpeed);
    if (keys.a) camera.position.addScaledVector(right, -moveSpeed);
    if (keys.d) camera.position.addScaledVector(right, moveSpeed);
  }

  return update;
}
