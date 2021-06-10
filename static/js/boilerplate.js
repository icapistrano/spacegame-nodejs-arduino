const { Scene, PerspectiveCamera, WebGLRenderer, PointLight, BoxGeometry, MeshBasicMaterial, Mesh, AxesHelper, Color } = require('three');
const OrbitControls = require('three-orbitcontrols');

class GameHandler {
    constructor() {
        this.scene;
        this.camera;
        this.renderer;

        [this.boxW, this.boxH, this.boxD] = [100, 100, 100];

        this.canvas = document.getElementById('game-canvas');

        this.reqAnimtionId;
        this.runAnimation = this.animate.bind(this);

        this.box;
    }

    startAnimation() {
        this.createBasicUtils();
        this.box = this.createBox();
        this.scene.add(this.box);

        console.log(this.box);

        const ax = new AxesHelper(1000);
        this.scene.add(ax);

        this.animate();
    }

    animate() {
        this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);

        this.box.rotation.z += 0.01;

        this.reqAnimtionId = requestAnimationFrame(this.runAnimation);
    }

    createBasicUtils() {
        this.scene = new Scene();
        this.scene.background = new Color( 0xA9A9A9 );

		this.camera = new PerspectiveCamera(50, this.canvas.width / this.canvas.height, 0.1, 1000);
		this.camera.position.set(0, 0, 900);
		this.camera.updateProjectionMatrix();

		this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
		this.renderer.setSize(this.canvas.width, this.canvas.height);

        const controls = new OrbitControls(this.camera, this.renderer.domElement)
    }

    createBox() {
        const geometry = new BoxGeometry(this.boxW, this.boxH, this.boxD);
        const material = new MeshBasicMaterial({ color: 0xffffff});
        const mesh = new Mesh(geometry, material);
        return mesh;
    }
}

export { GameHandler }
