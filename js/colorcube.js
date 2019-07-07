class ColorCubeAnim {
    init() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        var can = document.getElementById("can")
        var renderer = new THREE.WebGLRenderer({canvas: can});
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        let canvas = can;
        canvas.addEventListener('resize', function () {
            canvas.width  = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        });

        window.addEventListener('resize', function () {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });

        let numCubes = 15;

        const bigCube = new THREE.Object3D()
        let cubes = []
        for (let i = 0; i<numCubes; i++) {
            for (let k = 0; k<numCubes; k++) {
                for (let z = 0; z<numCubes; z++) {
                    if (i == 0 || k == 0 || z == 0 || i == numCubes - 1|| k == numCubes - 1 || z == numCubes - 1)  {
                        var geometry = new THREE.SphereGeometry(0.1, 0.1, 0.1);
                        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
                        var cube = new THREE.Mesh(geometry, material);
                        const offset = 1.1
                        cube.position.x = i * offset - numCubes / 2 * offset
                        cube.position.y = k * offset - numCubes / 2 * offset
                        cube.position.z = z * offset - numCubes / 2 * offset
                        bigCube.add(cube);
                        cubes.push(cube)
                    }
                }
            }
        }

        cubes.sort((a, b) => {
            let adist = a.position.x + a.position.y + a.position.z
            let bdist = b.position.x + b.position.y + b.position.z
            if (adist > bdist) return 1;
            if (adist < bdist) return -1;
            return 0;
        })

        scene.add(bigCube)

        camera.position.z = 5;

        const colorDelayMs = 5000
        const colorTransitionMs = 4000
        const startTime = new Date().getTime()

        let currCol = 0
        let i = 0
        let anim = function animate() {
            this.frameId = requestAnimationFrame( anim );

            let currTime = new Date().getTime()  - startTime

            if (currCol * colorDelayMs < currTime) {
                currCol += 1
            }

            new Date().getTime()

            const colorCnst = 10000

            const deltaTime = currTime % colorDelayMs
            let cubeN = Math.min(deltaTime / colorTransitionMs) * cubes.length
            cubes.forEach((cube, idx) => {
                // (i + 2 * idx) % colorCnst / colorCnst
                if (idx < cubeN) {
                    cube.material.color.setHSL((Math.min(deltaTime / colorTransitionMs, 2) / 2.0 + currCol) / 5.0 , 1.0, 0.5);
                }
            })
            i += 1

            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            bigCube.rotation.x += 0.001
            bigCube.rotation.y += 0.001
            renderer.render( scene, camera );
        }.bind(this)
        anim();
    }

    start() {
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }
}
