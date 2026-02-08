import { createRenderer, startRenderLoop, loadModel } from "./renderer.js";
import { createGround, createMaterials } from "./textures.js";
import { attachFPSControls } from "./input.js";
import * as THREE from "three";

const { scene, camera, renderer } = createRenderer("canvas-container");

scene.add(createGround());

const wolf1x = (Math.random() - 0.5) * 20;
const wolf1y = (Math.random() - 0.5) * 20;
const wolf1r = Math.random() * Math.PI * 2;
const wolf2x = (Math.random() - 0.5) * 20;
const wolf2y = (Math.random() - 0.5) * 20;
const wolf2r = Math.random() * Math.PI * 2;

let wolf1Tamed = false;
let wolf2Tamed = false;

const wolf1collider = (
  await loadModel({
    url: "static/models/wolf/scene.gltf",
    scene,
    pos: [wolf1x, -1, wolf1y],
    scale: 0.06,
    rot: [0, wolf1r, 0],
    colliderScale: 15,
  })
).collider;

const wolf2collider = (
  await loadModel({
    url: "static/models/wolf/scene.gltf",
    scene,
    pos: [wolf2x, -1, wolf2y],
    scale: 0.06,
    rot: [0, wolf2r, 0],
    colliderScale: 15,
  })
).collider;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
raycaster.near = 0.1;
raycaster.far = 100;

window.addEventListener("click", (e) => {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObjects(scene.children, true);

  console.log("click");
  for (const hit of hits) {
    if (hit.object.userData.isCollider) {
      if (hit.object === wolf1collider) {
        wolf1Tamed = true;
      }
      if (hit.object === wolf2collider) {
        wolf2Tamed = true;
      }

      console.log("Clicked model:", hit.object.userData.model);
      if (wolf1Tamed && wolf2Tamed) {
        document.getElementById("overlay-text").style = document.getElementById(
          "overlay-text",
        ).style =
          "position: absolute; top: 20px; left: 20px; color: white; font-size: 24px; font-family: Arial, sans-serif; pointer-events: none; color: green;";
        document.getElementById("overlay-text").textContent =
          "Craftcha Passed! Thanks for playing, the window will close shortly.";
        setTimeout(() => {
          window.close();
        }, 2000);
      }
      break;
    }
  }
});

//const materials = createMaterials();
//scene.add(createTextureBlock(materials.get(0).material, 0, 0, 0, 0));
//scene.add(createTextureBlock(materials.get(1).material, 1, 1, 0, 0));

const update = attachFPSControls(camera, renderer);

startRenderLoop({ scene, camera, renderer, update });
