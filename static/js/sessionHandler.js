import { showPage } from './global.js';
import { GameHandler } from './boilerplate.js';

class SessionHandler {
    constructor() {
        this.pages = document.getElementsByClassName('page');
        this.starterPage = document.getElementById('starter-page');
        this.gamePage = document.getElementById('space-game-page');

        this.gameHandler = new GameHandler();

        this.showGamePageBtn = document.getElementById('show-threejs-btn');
        this.exitGamePageBtn = document.getElementById('exit-game-btn');
        this.attachSessionBtns(this.showGamePageBtn, this.exitGamePageBtn);
    }

    attachSessionBtns(gameBtn, exitGameBtn) {
        gameBtn.addEventListener('click', () => {
            showPage(this.pages, this.gamePage);
            this.gameHandler.startAnimation();
        })

        exitGameBtn.addEventListener('click', () => {
            showPage(this.pages, this.starterPage);
            cancelAnimationFrame(this.gameHandler.reqAnimtionId);
        })
    }
}



const sessionHandler = new SessionHandler();
