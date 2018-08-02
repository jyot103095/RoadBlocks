import Game from './game';
import GameView from './gameView';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 455;
  canvasEl.height = 700;
  const ctx = canvasEl.getContext("2d");
  const gameView = new GameView(canvasEl, ctx);
  
  function startGame(e) {
    if (e.keyCode === 32) {
      gameView.start();
    }

    document.removeEventListener("keypress", startGame);
    document.addEventListener("keypress", (e) => {
      if (e.keyCode === 32) {
        gameView.pause();
      }
    });
  }
  
  document.addEventListener("keypress", startGame);
});
