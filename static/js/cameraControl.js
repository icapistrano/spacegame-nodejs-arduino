const { Vector3, Object3D } = require('three');


class ThirdPersonCamera {
    constructor(params) {
        this.params = params;
        this.camera = params.camera;
        this.cameraLookat = new Vector3()
    }

    calculateIdealOffset() {
        const idealOffset = new Vector3(0, 20, -50);
        idealOffset.applyQuaternion(this.params.target.quaternion);
        idealOffset.add(this.params.target.position);
        return idealOffset
    }

    calculateIdealLookAt() {
        const idealLookAt = new Vector3(0, 0, 50);
        idealLookAt.applyQuaternion(this.params.target.quaternion);
        idealLookAt.add(this.params.target.position);
        return idealLookAt;
    }

    update(timeElapsed) {
        const idealOffset = this.calculateIdealOffset();
        const idealLookat = this.calculateIdealLookAt();

        const t = 0.01 * timeElapsed;

        this.camera.position.lerp(idealOffset, t);
        this.cameraLookat.lerp(idealLookat, t)

        this.camera.lookAt(this.cameraLookat);
    }
}


export { ThirdPersonCamera }
