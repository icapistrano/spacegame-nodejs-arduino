const { Vector3, Euler } = require('three');

class Controls {
    constructor(params) {
        this.params = params;

        this.move = {
            forward:false,
            backward:false,
            left:false,
            right:false
        };

        this._velocity = new Vector3(0, 0, 0);
        this.acceleration = 0.075;

        document.addEventListener('keydown', (e) => { this.onKeyDown(e) });
        document.addEventListener('keyup', (e) => { this.onKeyUp(e)});
    }

    onKeyDown(event) {
        switch(event.keyCode) {
            case 87: // w
                this.move.forward = true;
                break;
            case 83: // w
                this.move.backward = true;
                break;
            case 65: // a
                this.move.left = true;
                break;
            case 68: // d
                this.move.right = true;
                break;
        }
    }

    onKeyUp(event) {
        switch(event.keyCode) {
            case 87: // w
                this.move.forward = false;
                break;
            case 83: // w
                this.move.backward = false;
                break;
            case 65: // a
                this.move.left = false;
                break;
            case 68: // d
                this.move.right = false;
                break;
        }
    }

    degToRad(deg) {
        return deg * (Math.PI/180);
    }

    update(timeInSeconds) {

        if (this.move.forward) {
            this.params.ship.translateZ(-this.acceleration * timeInSeconds);
        }

        if (this.move.backward) {
            this.params.ship.translateZ(this.acceleration * timeInSeconds);
        }

        if (this.move.left) {
            this.params.ship.rotateY(this.degToRad(this.acceleration) * timeInSeconds);
        }

        if (this.move.right) {
            this.params.ship.rotateY(this.degToRad(-this.acceleration) * timeInSeconds);
        }
    }
}

export { Controls }
