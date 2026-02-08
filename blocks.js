// blocks.js
import * as THREE from "three";

const BOX = new THREE.BoxGeometry(1, 1, 1);
const EDGE_MAT = new THREE.LineBasicMaterial({ color: 0x000000 });

export function createTextureBlock(material, blockId, x, y, z) {
  const block = new THREE.Mesh(BOX, material);

  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(BOX), EDGE_MAT);
  block.add(edges);

  block.position.set(x, y, z);
  block.userData.block_id = blockId;
  return block;
}
