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
  const logtext = makeTexture('oak_log.png');
  const log = new THREE.MeshLambertMaterial({
    map: logtext,
  });
  const stonetext = makeTexture('stone.png');
  const stone = new THREE.MeshLambertMaterial({
    map: stonetext,
  });
  const dirttext = makeTexture('dirt.png');
  const dirt = new THREE.MeshLambertMaterial({
    map: dirttext,
  });
  const cobbletext = makeTexture('cobblestone.png');
  const cobble = new THREE.MeshLambertMaterial({
    map: cobbletext
  });

  const diamondtext = makeTexture('diamond_ore.png');
  const diamond = new THREE.MeshLambertMaterial({
    map: diamondtext
  });

  const goldtext = makeTexture('gold_ore.png');
  const gold = new THREE.MeshLambertMaterial({
    map: goldtext
  });

  const irontext = makeTexture('iron_ore.png');
  const iron = new THREE.MeshLambertMaterial({
    map: irontext
  });

  const plankstext = makeTexture('oak_planks.png');
  const planks = new THREE.MeshLambertMaterial({
    map: plankstext
  });

  const block_ids_to_mesh = new Map([
    [0, {material: log, name: "log_block"}], 
    [1, {material: stone, name: "stone_block"}], 
    [2, {material: dirt, name: "dirt_block"}],
    [3, {material: cobble, name: "cobble_block"}],
    [4, {material: diamond, name: "diamond_ore_block"}],
    [5, {material: gold, name: "gold_ore_block"}],
    [6, {material: iron, name: "iron_ore_block"}],
    [7, {material: planks, name: "planks_block"}]
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
