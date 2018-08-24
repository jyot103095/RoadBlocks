import Game from './game';
import GameView from './gameView';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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

  firebase.auth().signInAnonymously().catch(function(error) {
    console.log(error.message);
  });

  let database = firebase.database();
  let ref = database.ref("scores");
  ref.on('value', displayHighScores, errData);

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

  function displayHighScores(data) {
    let scoreList = document.getElementById("highscore-list");
    while(scoreList.firstChild) {
      scoreList.firstChild.remove();
    }
    debugger
    let scores = Object.values(data.val());

    scores = scores.sort((a, b) => b.score - a.score).slice(0, 8);

    let listing = document.createElement('tr');
    let rank = document.createElement('th');
    let rankContent = document.createTextNode("Rank");
    rank.appendChild(rankContent);
    listing.appendChild(rank);

    let score = document.createElement('th');
    let scoreContent = document.createTextNode("Score");
    score.appendChild(scoreContent);
    listing.appendChild(score);

    let initials = document.createElement('th');
    let initialsContent = document.createTextNode("Initials");
    initials.appendChild(initialsContent);
    listing.appendChild(initials);
    document.getElementById("highscore-list").appendChild(listing);

    scores.forEach((scoreObj, idx) => {
      let listing = document.createElement('tr');
      let rank = document.createElement('td');
      let rankContent = document.createTextNode(`${idx + 1}`);
      rank.appendChild(rankContent);
      listing.appendChild(rank);

      let score = document.createElement('td');
      let scoreContent = document.createTextNode(`${scoreObj.score}`);
      score.appendChild(scoreContent);
      listing.appendChild(score);

      let initials = document.createElement('td');
      let initialsContent = document.createTextNode(`${scoreObj.initials}`);
      initials.appendChild(initialsContent);
      listing.appendChild(initials);
      document.getElementById("highscore-list").appendChild(listing);
    });
  }

  function errData(error) {
    console.log(error);
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
