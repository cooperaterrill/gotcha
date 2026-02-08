        const textureLoader = new THREE.TextureLoader();
        const groundGeo = new THREE.PlaneGeometry(50,50);
        const grassTexture = makeTexture('grass_block_top.png');
        grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
        grassTexture.repeat.set(25,25);
        const groundMaterial = new THREE.MeshLambertMaterial({
            map: grassTexture,
            color: 0x7cbd6b
        })
        const ground = new THREE.Mesh(groundGeo, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1.5;
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
    const block_ids_to_mesh = new Map([[0, {material: log, name: "log_block"}], [1, {material: stone, name: "stone_block"}], [2, {material: dirt, name: "dirt_block"}]]);
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x7EC0EE);
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
        
    const directionalLight = new THREE.DirectionalLight(0xfffeee, 0.6);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
        function makeTexture(path) {
            const texture = textureLoader.load(`/textures/${path}`);
            texture.anisotropy = 1;
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestFilter;
            texture.generateMipmaps = false;
            return texture
        }
    scene.add(ground);

        function createTexture(color, size = 16) {
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = size;
            const ctx = canvas.getContext('2d');
            const r = (color >> 16) & 255, g = (color >> 8) & 255, b = color & 255;
                    
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    const n = (Math.random() - 0.5) * 0.2;
                    ctx.fillStyle = `rgb(${r*(1+n)},${g*(1+n)},${b*(1+n)})`;
                    ctx.fillRect(x, y, 1, 1);
                }
            }
            const tex = new THREE.CanvasTexture(canvas);
            tex.magFilter = tex.minFilter = THREE.NearestFilter;
            return tex;
        }
        
        function createColorBlock(colorName, x, y, z) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshLambertMaterial({ map: createTexture(colors[colorName]) });
            const block = new THREE.Mesh(geometry, material);
            
            const edges = new THREE.EdgesGeometry(geometry);
            const wireframe = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
            block.add(wireframe);
            
            block.position.set(x, y, z);
            block.userData.color = colorName;
            return block;
        }
        function createTextureBlock(material, block_type, x, y, z) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const block = new THREE.Mesh(geometry, material);
            const edges = new THREE.EdgesGeometry(geometry);
            const wireframe = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
            block.add(wireframe);
            block.position.set(x, y, z);
            block.userData = {
                block_id: block_type
            }
            return block;
        }
    
    const moveSpeed = 0.1;
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
