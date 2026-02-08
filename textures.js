// textures.js
import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export function makeTexture(path) {
  const tex = textureLoader.load(`/textures/${path}`);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  return tex;
}

export function createMaterials() {
  const log = new THREE.MeshLambertMaterial({
    map: makeTexture("oak_log.png"),
  });
  const stone = new THREE.MeshLambertMaterial({
    map: makeTexture("stone.png"),
  });
  const dirt = new THREE.MeshLambertMaterial({ map: makeTexture("dirt.png") });

  return new Map([
    [0, { material: log, name: "log_block" }],
    [1, { material: stone, name: "stone_block" }],
    [2, { material: dirt, name: "dirt_block" }],
  ]);
}

export function createGround() {
  const geo = new THREE.PlaneGeometry(50, 50);
  const tex = makeTexture("grass_block_top.png");
  tex.repeat.set(25, 25);

  const mat = new THREE.MeshLambertMaterial({
    map: tex,
    color: 0x7cbd6b,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -1.5;
  return mesh;
}
