import Game from './game';
import GameView from './gameView';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 450;
  canvasEl.height = 650;
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);
  document.addEventListener("mousemove", game.moveSnake.bind(game));
  gameView.start();
});
