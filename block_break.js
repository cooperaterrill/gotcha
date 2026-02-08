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
    scene.add(ground);
    
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
                red_count-=1;
                if (red_count===0) {
                    console.log("Craftcha Passed");
                }
            }
        }
    });
    let mouseX = 0;
    let mouseY = 0;
    let pitch = 0; // Up/down rotation
    let yaw = 0;   // Left/right rotation

    document.addEventListener('mousemove', (e) => {
        mouseX = e.movementX || 0;
        mouseY = e.movementY || 0;
        
        yaw -= mouseX * 0.002;
        pitch -= mouseY * 0.002;
        
        // Limit pitch to prevent flipping
        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
    });
    const moveSpeed = 0.1;
    const keys = {
        w: false,
        a: false,
        s: false,
        d: false,
        space: false,
        shift: false
    };

    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        if (key in keys) keys[key] = true;
    });

    window.addEventListener('keyup', (e) => {
        const key = e.key.toLowerCase();
        if (key in keys) keys[key] = false;
    });
        
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    function animate() {
        requestAnimationFrame(animate);
        camera.rotation.order = 'YXZ';
        camera.rotation.y = yaw;
        camera.rotation.x = pitch;
        if (keys.w) camera.position.z -= moveSpeed;
        if (keys.s) camera.position.z += moveSpeed;
        if (keys.a) camera.position.x -= moveSpeed;
        if (keys.d) camera.position.x += moveSpeed;
        if (keys.space) camera.position.y += moveSpeed;
        if (keys.shift) camera.position.y -= moveSpeed;
        renderer.render(scene, camera);
    }
        
    animate();