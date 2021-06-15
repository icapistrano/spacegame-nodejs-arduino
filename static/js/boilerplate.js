const { Vector3, Scene, PerspectiveCamera, WebGLRenderer, PointLight, BoxGeometry, MeshBasicMaterial, Mesh, AxesHelper, Color, Clock, GridHelper } = require('three');
const OrbitControls = require('three-orbitcontrols');

import { Controls } from './controls.js';
import { ThirdPersonCamera } from './cameraControl.js';

class GameHandler {
    constructor() {
        this.scene;
        this.camera;
        this.renderer;

        [this.boxW, this.boxH, this.boxD] = [5, 5, 5];

        this.canvas = document.getElementById('game-canvas');

        this.reqAnimtionId;
        this.runAnimation = this.animate.bind(this);

        this.controls;

        this.clock = new Clock();

        this.ThirdPersonCamera;

        this.startAnimation();
    }

    startAnimation() {
        this.createBasicUtils();

        this.animate();
    }

    animate() {
        // this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.thirdPersonCamera.camera);

        const elapsedTime = this.clock.getElapsedTime();
        this.controls.update(elapsedTime);
        this.thirdPersonCamera.update(elapsedTime);
        // console.log(elapsedTime);

        this.reqAnimtionId = requestAnimationFrame(this.runAnimation);
    }

    createBasicUtils() {
        this.scene = new Scene();
        this.scene.background = new Color( 0x3A3A3A );

        const fov = 60;
        const aspect = this.canvas.width / this.canvas.height;
        const near = 1.0;
        const far = 1000.0

		this.camera = new PerspectiveCamera(fov, aspect, near, far);
		this.camera.position.set(0, 50, 100);
        const s = new Vector3(0,0,0)
        this.camera.lookAt(s)

		this.camera.updateProjectionMatrix();

        const gridHelper = new GridHelper( 100, 10 );
        this.scene.add( gridHelper );

        console.log(gridHelper);

        this.box = this.createBox();
        this.scene.add(this.box);

        const ax = new AxesHelper(1000);
        this.box.add(ax);

        this.controls = new Controls({
            ship:this.box,
        });

        this.thirdPersonCamera = new ThirdPersonCamera({
            camera:this.camera,
            target:this.box
        })


		this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
		this.renderer.setSize(this.canvas.width, this.canvas.height);

        // const controls = new OrbitControls(this.camera, this.renderer.domElement)
    }

    createBox() {
        const geometry = new BoxGeometry(this.boxW, this.boxH, this.boxD);
        const material = new MeshBasicMaterial({ color: 0xffffff});
        const mesh = new Mesh(geometry, material);
        return mesh;
    }
}

export { GameHandler }
