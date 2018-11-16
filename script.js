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
let canvas;

function init(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    canvas = document.body.appendChild( renderer.domElement );

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
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    return cube;
}

function makeRubik(){
    let rubik = new THREE.Group();
    let currentCube;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            for(let k = -1; k < 2; k++){
                currentCube = makeCube(i * 1.05, j * 1.05, k * 1.05);
                rubik.add(currentCube);
            }
        }
    }
    return rubik;
}

function paintCube(geometry){
    for ( let i = 0; i < geometry.faces.length; i += 2 ) {
        let faceColor = CUBE_COLORS[i / 2];
        geometry.faces[i].color = faceColor;
        geometry.faces[i+1].color = faceColor;
    }
    return geometry;
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

// MOUSE

let mouseDown = false,
mouseX = 0,
mouseY = 0;

function onMouseMove(evt) {
    if (!mouseDown) {
        return;
    }

    evt.preventDefault();

    let deltaX = evt.clientX - mouseX,
        deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rubik.rotation.x += deltaY / 500;
    rubik.rotation.y += deltaX / 500;
}

function onTouchMove(evt){
    if (!mouseDown) {
        return;
    }

    evt.preventDefault();

    let deltaX = evt.touches[0].clientX - mouseX,
        deltaY = evt.touches[0].clientY - mouseY;
    mouseX = evt.touches[0].clientX;
    mouseY = evt.touches[0].clientY;
    rubik.rotation.x += deltaY / 500;
    rubik.rotation.y += deltaX / 500;
}

function onMouseDown(evt) {
    evt.preventDefault();

    mouseDown = true;
    mouseX = evt.clientX || evt.touches[0].clientX;
    mouseY = evt.clientY || evt.touches[0].clientX;
}

function onMouseUp(evt) {
    evt.preventDefault();

    mouseDown = false;
}

function addMouseHandler(canvas) {
    canvas.addEventListener('mousemove', function (e) {
        onMouseMove(e);
    }, false);
    canvas.addEventListener('touchmove', function (e) {
        onTouchMove(e);
    }, false);

    canvas.addEventListener('mousedown', function (e) {
        onMouseDown(e);
    }, false);
    canvas.addEventListener('touchstart', function (e) {
        onMouseDown(e);
    }, false);

    canvas.addEventListener('mouseup', function (e) {
        onMouseUp(e);
    }, false);
    canvas.addEventListener('touchend', function (e) {
        onMouseUp(e);
    }, false);
}

// MAIN CODE

init();

camera.position.z = 5;

let rubik = makeRubik();
scene.add(rubik);

addMouseHandler(canvas);

animate();