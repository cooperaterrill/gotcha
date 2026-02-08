import * as THREE from "three";
import { createRenderer, startRenderLoop } from "./renderer.js";
import { createGround, createMaterials } from "./textures.js";
import { createTextureBlock } from "./blocks.js";
import { attachFPSControls } from "./input.js";

const { scene, camera, renderer } = createRenderer("canvas-container");
scene.add(createGround());

const materials = createMaterials();
const materialsCount = materials.size;

const update = attachFPSControls(camera, renderer);

const blocks = []
const objective_idx = Math.floor(Math.random() * materialsCount);
const objective = materials.get(objective_idx).name;
const blockCount = Math.floor(Math.random() * 16) + 10;
let objectiveBlocksRemaining = 0;
document.getElementById("overlay-text").style = document.getElementById(
          "overlay-text",
        ).style =
          "position: absolute; top: 20px; left: 20px; color: white; font-size: 24px; font-family: Arial, sans-serif; pointer-events: none; color: black;";
        document.getElementById("overlay-text").textContent =
          `Break of all the ${objective}`;
const occupiedPositions = new Set();

// Define spawn area
const spawnRadius = 10;
const maxHeight = 2;
for (let i = 0; i < blockCount; i++) {
    let x,y,z
    do {
        x = Math.floor(Math.random() * (spawnRadius * 2 + 1)) - spawnRadius;
        y = Math.floor(Math.random() * maxHeight) - 1;
        z = Math.floor(Math.random() * (spawnRadius * 2 + 1)) - spawnRadius;
    }while(occupiedPositions.has(`${x}, ${y}, ${z}`));
    occupiedPositions.add(`${x}, ${y}, ${z}`);

    const idx = Math.floor(Math.random() * materialsCount);
    const blockData = materials.get(idx);

    const block = createTextureBlock(blockData.material, blockData.name, x, y, z);

    if (block.userData.block_id === objective) {
        objectiveBlocksRemaining++;
    }
    
    blocks.push(block);
    scene.add(block);
}
const raycaster = new THREE.Raycaster();
raycaster.far = 500;
raycaster.params.Points.threshold = 1.0; // Make click detection more forgiving
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(blocks);
    
    if (intersects.length > 0) {
        const block = intersects[0].object;
        const index = blocks.indexOf(block, false);
        
        console.log(`Clicked block: ${block.userData.block_id} at position ${block.position.x}, ${block.position.y}, ${block.position.z}`);
        
        // Check if it's an objective block
        if(block.userData.block_id === objective) {
            console.log('✓ Removed an objective block');
            objectiveBlocksRemaining--;
            console.log(`Objective blocks remaining: ${objectiveBlocksRemaining}`);
            if (objectiveBlocksRemaining <= 0) {
                console.log('🎉 Congratulations! You removed all objective blocks!');
                window.opener.postMessage({ type: "CRAFTCHA_PASS" }, "*");
                setTimeout(() => {
                window.close();
                }, 2000);
            }
        }
        scene.remove(block);
    }
});

startRenderLoop({ scene, camera, renderer, update });
