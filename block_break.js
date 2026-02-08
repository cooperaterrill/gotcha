    const blocks = [];
    let objective = Math.random() % (block_ids_to_mesh.length - 1);
    let objective_count = 0   

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