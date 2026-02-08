// input.js
import * as THREE from "three";

export function attachFPSControls(camera) {
  const keys = { w: 0, a: 0, s: 0, d: 0, space: 0, shift: 0 };
  let pitch = 0,
    yaw = 0;
  const speed = 0.1;

  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);

  document.addEventListener("mousemove", (e) => {
    yaw -= e.movementX * 0.002;
    pitch -= e.movementY * 0.002;
    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
  });

  window.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (k in keys) keys[k] = 1;
  });

  window.addEventListener("keyup", (e) => {
    const k = e.key.toLowerCase();
    if (k in keys) keys[k] = 0;
  });

  return () => {
    // Apply rotation
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    // Get forward direction (ignore vertical component)
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    // Right vector
    right.crossVectors(forward, up).normalize();

    // Movement
    if (keys.w) camera.position.addScaledVector(forward, speed);
    if (keys.s) camera.position.addScaledVector(forward, -speed);
    if (keys.a) camera.position.addScaledVector(right, -speed);
    if (keys.d) camera.position.addScaledVector(right, speed);
    if (keys.space) camera.position.y += speed;
    if (keys.shift) camera.position.y -= speed;
  };
}
