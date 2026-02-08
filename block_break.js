        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87CEEB); // Sky blue
        
        // Camera setup (fixed position - looking straight ahead)
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        camera.position.set(0, 0, 4); // Position camera back from origin
        camera.lookAt(0, 0, 0); // Look at center
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        document.getElementById('canvas-container').appendChild(renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        
        // Simple block colors
        const colors = {
            red: 0xff0000,
            blue: 0x0000ff,
            green: 0x00ff00,
            yellow: 0xffff00,
            orange: 0xff8800,
            purple: 0x8800ff
        };
        
        const blocks = [];
        const colorNames = Object.keys(colors);
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
        
        // Add grass ground
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const grassTexture = createTexture(0x4CAF50, 512);
        const groundMaterial = new THREE.MeshLambertMaterial({ map: grassTexture });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1.5;
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
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        
        animate();