const CUBE_COLORS = [
    new THREE.Color( 0xff4500 ), // right
    new THREE.Color( 0xffa500 ), // left
    new THREE.Color( 0xffffff ), // top
    new THREE.Color( 0xffff00 ), // down
    new THREE.Color( 0x008040 ), // front
    new THREE.Color( 0x4169e1 ) // back
];

class Game {
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 550 );
        this.renderer = new THREE.WebGLRenderer();
        this.canvas = null;
    }

    getCanvas(){
        return this.canvas;
    }

    getCamera(){
        return this.camera;
    }

    getScene(){
        return this.scene;
    }

    getRenderer(){
        return this.renderer;
    }

    init(){
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.canvas = document.body.appendChild( this.renderer.domElement );

        this.scene.background = new THREE.Color( 0xdadada );

        let light = new THREE.PointLight( 0xffffff, 1.5, 20 );
        light.position.set( 0, 0, 5 );
        this.scene.add( light );
        light = new THREE.PointLight( 0xffffff, 1, 10 );
        light.position.set( 0, 5, 0 );
        this.scene.add( light );
        light = new THREE.PointLight( 0xffffff, 1, 10 );
        light.position.set( 0, -5, 0 );
        this.scene.add( light );
        light = new THREE.PointLight( 0xffffff, 1, 10 );
        light.position.set( 5, 0, 0 );
        this.scene.add( light );
        light = new THREE.PointLight( 0xffffff, 1, 10 );
        light.position.set( -5, 0, 0 );
        this.scene.add( light );
    }
}

class Cuber {
    makeCube(x, y, z){
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshPhongMaterial( {color: "white", shininess: 0} );
        material.vertexColors = THREE.FaceColors;
        geometry = this.paintCube(geometry);
        let cube = new THREE.Mesh( geometry, material );
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        return cube;
    }

    makeRubik(){
        let rubik = new THREE.Group();
        let currentCube;
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                for(let k = -1; k < 2; k++){
                    currentCube = this.makeCube(i * 1.05, j * 1.05, k * 1.05);
                    rubik.add(currentCube);
                }
            }
        }
        return rubik;
    }

    paintCube(geometry){
        for ( let i = 0; i < geometry.faces.length; i += 2 ) {
            let faceColor = CUBE_COLORS[i / 2];
            geometry.faces[i].color = faceColor;
            geometry.faces[i+1].color = faceColor;
        }
        return geometry;
    }
}

// MOUSE
class Mouser {
    constructor(rubik){
        this.mouseDown = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.rubik = rubik;
    }

    onMouseMove(evt) {
        if (!this.mouseDown) {
            return;
        }

        evt.preventDefault();

        let deltaX = evt.clientX - this.mouseX,
            deltaY = evt.clientY - this.mouseY;
        this.mouseX = evt.clientX;
        this.mouseY = evt.clientY;
        this.rubik.rotation.x += deltaY / 300;
        this.rubik.rotation.y += deltaX / 300;
    }

    onTouchMove(evt){
        if (!this.mouseDown || !evt.touches[1]) {
            return;
        }

        evt.preventDefault();

        let deltaX = evt.touches[0].clientX - this.mouseX,
            deltaY = evt.touches[0].clientY - this.mouseY;
        if (this.rubik.rotation.x > Math.PI / 2 && this.rubik.rotation.x < Math.PI * 1.5)
            deltaX *= -1;
        this.mouseX = evt.touches[0].clientX;
        this.mouseY = evt.touches[0].clientY;
        this.rubik.rotation.x += deltaY / 300;
        this.rubik.rotation.y += deltaX / 300;
        this.rubik.rotation.x = (rubik.rotation.x + 2 * Math.PI) % (Math.PI * 2);
        this.rubik.rotation.y = (rubik.rotation.y + 2 * Math.PI) % (Math.PI * 2);
    }

    onMouseDown(evt) {
        evt.preventDefault();

        this.mouseDown = true;
        this.mouseX = evt.clientX || evt.touches[0].clientX;
        this.mouseY = evt.clientY || evt.touches[0].clientY;
    }

    onMouseUp(evt) {
        evt.preventDefault();

        this.mouseDown = false;
    }

    addMouseHandler(canvas) {
        let theMouser = this;
        canvas.addEventListener('mousemove', function (e) {
            theMouser.onMouseMove(e);
        }, false);
        canvas.addEventListener('touchmove', function (e) {
            theMouser.onTouchMove(e);
        }, false);

        canvas.addEventListener('mousedown', function (e) {
            theMouser.onMouseDown(e);
        }, false);
        canvas.addEventListener('touchstart', function (e) {
            theMouser.onMouseDown(e);
        }, false);

        canvas.addEventListener('mouseup', function (e) {
            theMouser.onMouseUp(e);
        }, false);
        canvas.addEventListener('touchend', function (e) {
            theMouser.onMouseUp(e);
        }, false);
    }
}

// MAIN CODE

function animate() {
    requestAnimationFrame( animate );
    game.getRenderer().render( game.getScene(), game.getCamera() );
}

let game = new Game();
let cuber = new Cuber();

let rubik = cuber.makeRubik();

let mouser = new Mouser(rubik);

game.init();

mouser.addMouseHandler(game.getCanvas());

game.getCamera().position.z = 5;

game.getScene().add(rubik);

animate();