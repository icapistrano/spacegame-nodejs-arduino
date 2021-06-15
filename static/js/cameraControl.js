const { Vector3 } = require('three');


class ThirdPersonCamera {
    constructor(params) {
        this.params = params;
        this.camera = params.camera;

        this.currentPosition = new Vector3();
        this.currentLookAt = new Vector3();

        console.log(this.params.target.quaternion.x);
    }

    calculateIdealOffset() {
        const idealOffset = new Vector3(0, 50, -500);
        idealOffset.applyQuaternion(this.params.target.quaternion);
        idealOffset.add(this.params.target.position);
        return idealOffset
    }

    calculateIdealLookAt() {
        const idealLookAt = new Vector3(0, 10, 1000);
        idealLookAt.applyQuaternion(this.params.target.quaternion);
        idealLookAt.add(this.params.target.position);
        return idealLookAt;
    }


    update(timeElapsed) {
        const idealOffset = this.calculateIdealOffset();
        // const idealLookAt = this.calculateIdealLookAt();

        const t = 0.000000001 * timeElapsed;

        // const idealOffset = new Vector3(this.params.target.position.x, this.params.target.position.y, this.params.target.position.z - 1000);

        // this.camera.position.lerp(idealOffset, t)

        // console.log(this.params.target.position, this.camera.position);

        this.currentPosition.lerp(idealOffset, t);
        // this.currentLookAt.lerp(idealLookAt, t);
        //
        // //
        // this.camera.position.copy(this.currentPosition);
        // this.camera.lookAt(this.currentLookAt);
    }
}

export { ThirdPersonCamera }
