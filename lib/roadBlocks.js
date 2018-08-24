import Game from './game';
import GameView from './gameView';
import firebase from 'firebase/app';
import 'firebase/database';

document.addEventListener("DOMContentLoaded", () => {
  let config = {
    apiKey: "AIzaSyDwvZCcAAbO5qHoaCTuB6NRL-aQtChpvXE",
    authDomain: "roadblocks-3e141.firebaseapp.com",
    databaseURL: "https://roadblocks-3e141.firebaseio.com",
    projectId: "roadblocks-3e141",
    storageBucket: "roadblocks-3e141.appspot.com",
    messagingSenderId: "466735811018"
  };
  firebase.initializeApp(config);

  let database = firebase.database();
  let ref = database.ref("scores");

  function submitScore(e) {
    e.preventDefault();
    let initials = document.getElementById("initials").value;
    let data = {
      initials,
      score: gameView.getScore()
    };

    ref.push(data);

    gameView.restartGame();
    document.getElementsByClassName("md-modal")[0].classList.remove("md-show");
  }

  function closeModal(e) {
    e.preventDefault();
    gameView.restartGame();
    document.getElementsByClassName("md-modal")[0].classList.remove("md-show");
  }

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
  document.getElementById("highscore-submit-form").addEventListener("submit", submitScore);
  document.getElementById("modal-close-button").addEventListener("click", closeModal);
});
