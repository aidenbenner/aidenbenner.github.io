
class Bubbles3DAnim {
init() {
    var camera, scene, renderer, material;
    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 2, 2000 );
    camera.position.z = 10;
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.001 );
    var geometry = new THREE.BufferGeometry();
    var vertices = [];
    var sprite = new THREE.TextureLoader().load( 'js/sprites/disc.png' );
    for ( var i = 0; i < 10000; i ++ ) {
        var x = 2000 * Math.random() - 1000;
        var y = 2000 * Math.random() - 1000;
        var z = 2000 * Math.random() - 1000;
        console.log(x,y,z)
        vertices.push( x, y, z );
    }
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    material = new THREE.PointsMaterial( { size: 35, sizeAttenuation: false, color: 0x00ff00, alphaTest: 0.5, transparent: true } );

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
    function render() {
        var time = Date.now() * 0.00005;
        camera.position.x += ( mouseX - camera.position.x ) * 0.05 + 1.11;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.05 + 1.11;

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
