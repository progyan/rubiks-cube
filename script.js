var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 550 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background = new THREE.Color( 0xdadada );

var light = new THREE.PointLight( 0xffffff, 1, 20 );
light.position.set( 0, 0, 5 );
scene.add( light );
light = new THREE.PointLight( 0xffffff, 0.5, 10 );
light.position.set( 0, 5, 0 );
scene.add( light );
light = new THREE.PointLight( 0xffffff, 0.5, 10 );
light.position.set( 0, -5, 0 );
scene.add( light );
light = new THREE.PointLight( 0xffffff, 0.5, 10 );
light.position.set( 5, 0, 0 );
scene.add( light );
light = new THREE.PointLight( 0xffffff, 0.5, 10 );
light.position.set( -5, 0, 0 );
scene.add( light );
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( {color: "royalblue", shininess: 0, opacity: 0.8, transparent: true} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

cube.rotation.x = 0.4;

function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

animate();