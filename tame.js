import { createRenderer, startRenderLoop } from "./renderer.js";
import { createGround, createMaterials } from "./textures.js";
import { createTextureBlock } from "./blocks.js";
import { attachFPSControls } from "./input.js";

const { scene, camera, renderer } = createRenderer("canvas-container");

scene.add(createGround());

const materials = createMaterials();
scene.add(createTextureBlock(materials.get(0).material, 0, 0, 0, 0));
scene.add(createTextureBlock(materials.get(1).material, 1, 1, 0, 0));

const update = attachFPSControls(camera);

startRenderLoop({ scene, camera, renderer, update });
