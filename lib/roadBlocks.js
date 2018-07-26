import Game from './game';
import GameView from './gameView';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 450;
  canvasEl.height = 600;
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);
  let prevPos;
  document.addEventListener("mousemove", (e) => {
    if (!prevPos) {
      prevPos = e.clientX;
      game.moveSnake(e, canvasEl);
    } else if (!Math.abs(prevPos - e.clientX) < 3) {
      prevPos = e.clientX;
      game.moveSnake(e, canvasEl);
    }
  });
  gameView.start();
});
