
        const textureLoader = new THREE.TextureLoader();
        function makeTexture(path) {
            const texture = textureLoader.load(`/textures/${path}`);
            texture.anisotropy = 1;
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestFilter;
            texture.generateMipmaps = false;
            return texture
        }

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
        function createTextureBlock(material, x, y, z) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const block = new THREE.Mesh(geometry, material);
            const edges = new THREE.EdgesGeometry(geometry);
            const wireframe = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
            block.add(wireframe);
            
            block.position.set(x, y, z);
            return block;
        }
        const groundGeo = new THREE.PlaneGeometry(50,50);
        const grassTexture = textureLoader.makeTexture('grass_block_top.png');
        const logtext = makeTexture('oak_log.png');
        const log = new THREE.MeshLambertMaterial({
            map: logtext
        });
        const stonetext = makeTexture('stone.png');
        const stone = new THREE.MeshLambertMaterial({
            map: stonetext
        });
        const dirttext = makeTexture('dirt.png');
        const dirt = new THREE.MeshLambertMaterial({
            map: dirttext
        });
        const block_ids = new Map([[0, "log"], [1, "stone"], [2, "dirt"]]);
        const block_ids_to_mesh = new Map([[0, log], [1, stone], [2, dirt]]);