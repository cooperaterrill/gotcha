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
const blocks = [];
let objective = Math.random() % (block_ids_to_mesh.length - 1);
let objective_count = 0;

// Renderer setup
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

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            let idx = Math.floor(Math.random() * block_ids_to_mesh.size);
            const material = block_ids_to_mesh.get(idx);
            const block = createTextureBlock(material, (x - 1), (1 - y), 0);
            blocks.push(block);
            scene.add(block);
            }
    }
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(blocks);
        if (intersects.length > 0) {
            const block = intersects[0].object;
            if (block.userData.color === 'red') {
                scene.remove(block);
                blocks.splice(blocks.indexOf(block), 1);
            }
        }
    });

        
    animate();