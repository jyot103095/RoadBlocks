import Game from './game';
import GameView from './gameView';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 600;
  canvasEl.height = 800;
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);
  document.addEventListener("mousemove", (e) => {
    game.moveSnake(e, canvasEl);
  });``
  gameView.start();
});
