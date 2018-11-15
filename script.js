var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 550 );
var renderer = new THREE.WebGLRenderer();
var cube;
function init(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene.background = new THREE.Color( 0xdadada );

    var light = new THREE.PointLight( 0xffffff, 2, 20 );
    light.position.set( 0, 0, 5 );
    scene.add( light );
    light = new THREE.PointLight( 0xffffff, 1, 10 );
    light.position.set( 0, 5, 0 );
    scene.add( light );
    light = new THREE.PointLight( 0xffffff, 1, 10 );
    light.position.set( 0, -5, 0 );
    scene.add( light );
    light = new THREE.PointLight( 0xffffff, 1, 10 );
    light.position.set( 5, 0, 0 );
    scene.add( light );
    light = new THREE.PointLight( 0xffffff, 1, 10 );
    light.position.set( -5, 0, 0 );
    scene.add( light );
}

function makeCube(x, y, z){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshPhongMaterial( {color: "royalblue", shininess: 0} );
    material.vertexColors = THREE.FaceColors;
    geometry = paintCube(geometry);
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
}

function makeRubik(){
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            for(let k = -1; k < 2; k++){
                makeCube(i * 1.05, j * 1.05, k * 1.05);
            }
        }
    }
}

function paintCube(geometry){
    for ( var i = 0; i < geometry.faces.length; i += 2 ) {
        var faceColor = new THREE.Color( Math.random() * 0xffffff );
        geometry.faces[i].color = faceColor;
        geometry.faces[i+1].color = faceColor;
    }
    return geometry;
}

function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

// MAIN CODE //

init();

camera.position.z = 5;

makeRubik();

animate();