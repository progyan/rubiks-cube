const CUBE_COLORS = [
    new THREE.Color( 0xff4500 ), // right
    new THREE.Color( 0xffa500 ), // left
    new THREE.Color( 0xffffff ), // top
    new THREE.Color( 0xffff00 ), // down
    new THREE.Color( 0x008040 ), // front
    new THREE.Color( 0x4169e1 ) // back
];

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 550 );
let renderer = new THREE.WebGLRenderer();

function init(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene.background = new THREE.Color( 0xdadada );

    let light = new THREE.PointLight( 0xffffff, 1.5, 20 );
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
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshPhongMaterial( {color: "white", shininess: 0} );
    material.vertexColors = THREE.FaceColors;
    geometry = paintCube(geometry);
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    return cube;
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
    for ( let i = 0; i < geometry.faces.length; i += 2 ) {
        let faceColor = CUBE_COLORS[i / 2];
        geometry.faces[i].color = faceColor;
        geometry.faces[i+1].color = faceColor;
        console.log(faceColor);
    }
    console.log(geometry.faces);
    return geometry;
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

// MAIN CODE

init();

camera.position.z = 5;

makeRubik();

animate();