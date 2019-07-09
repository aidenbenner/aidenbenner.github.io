
class Bubbles3DAnim {
init() {
    var camera, scene, renderer, material;
    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 2, 2000 );
    camera.position.z = 10;
    camera.position.x = 100
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.001 );
    var geometry = new THREE.BufferGeometry();
    var vertices = [];
    var sprite = new THREE.TextureLoader().load( '/js/sprites/disc.png' );
    for ( var i = 0; i < 2000; i ++ ) {
        var x = 2000 * Math.random() - 1000;
        var y = 2000 * Math.random() - 1000;
        var z = 2000 * Math.random() - 1000;
        vertices.push( x, y, z );    camera.position.z = 100;
    }
    let canvas=document.getElementById('can')
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

    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    material = new THREE.PointsMaterial( { size: 35, sizeAttenuation: true, map:sprite, color: 0x00ff00, alphaTest: 0.5, transparent: true } );

    material.color.setHSL( 1.0, 0.3, 0.7 );
    var particles = new THREE.Points( geometry, material );
    scene.add( particles );

    //
    renderer = new THREE.WebGLRenderer({canvas:document.getElementById('can')});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    //
    //document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    //document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    //
    //window.addEventListener( 'resize', onWindowResize, false );
    let anim = function animate() {
        this.frameId = requestAnimationFrame( anim );
        render();
    }.bind(this)

    var i = 0
    function render() {
        var time = Date.now() * 0.00005;
        i  = 0
        camera.position.x += Math.sin(i / 1000) * 10 + ( mouseX * 0.1 - camera.position.x ) * 0.01;
        i += 1
        camera.position.y += Math.cos(i / 1000) * 10 + ( - mouseY * 0.1 - camera.position.y ) * 0.01;
        //camera.rotation.x += 0.001;
        //camera.rotation.y += 0.001;

        scene.rotation.x += 0.0005
        camera.lookAt( scene.position );
        var h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
        material.color.setHSL( h, 0.5, 0.5 );
        renderer.render( scene, camera );
    }
    anim();
}
stop() {
    cancelAnimationFrame(this.frameId)
}
}
