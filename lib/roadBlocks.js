import Game from './game';
import GameView from './gameView';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 450;
  canvasEl.height = 600;
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);
  document.addEventListener("mousemove", (e) => {
    game.moveSnake.call(game, e, canvasEl);
  });
  gameView.start();
});
