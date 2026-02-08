    let blocks = []
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            let idx = Math.floor(Math.random() * block_ids_to_mesh.size);
            const blockData = block_ids_to_mesh.get(idx);
            const block = createTextureBlock(blockData.material, blockData.name, (x - 1), (1 - y), 0);
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
            console.log(block.userData.block_id);
        }
    });

    animate();