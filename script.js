var buttonsColors = document.querySelectorAll('.simon-button');
var levelDisplay = document.getElementById('level-display');
var timerDisplay = document.getElementById('timer-display');
var scoreDisplay = document.getElementById('score-display');
var startButton = document.getElementById('start-button');
var playerNameInput = document.getElementById('playerName');
var userModal = document.getElementById('userModal');
var closeModalButton = document.getElementsByClassName('close')[0];
var btnUserModal = document.getElementById('btnUser');
var lossModal = document.getElementById('lossModal');
var btnOklossModal = document.getElementById('btnOk');
var time = 0;
var level = 0;
var score = 0;
var gameStarted = false;
var playerName = '';
var timerInterval;
var gameSequence = [];
var playerSequence = [];


startButton.addEventListener('click', startGame);
btnUserModal.addEventListener('click', validateUser);
closeModalButton.addEventListener('click', closeModal);
btnOklossModal.addEventListener('click', closeModal);

function startGame() {
  if (gameStarted == false) {
    if (playerName == "") {
      openModal();
    }
    else {
      gameStarted = true;
      startButton.textContent = 'RESTART';
      buttonsColors[1].style.opacity = 0.5;
      buttonsColors[2].style.opacity = 0.5;
      buttonsColors[3].style.opacity = 0.5;
      buttonsColors[0].style.opacity = 0.5;
      playGame();
      Timer();
      updateLevel();
    }
  } else {
    resetGame();
  }
}

function resetGame() {
  gameStarted = false;
  startButton.textContent = 'START';
  gameSequence = [];
  playerSequence = [];
  level = 0;
  time = 0;
  score = 0;
  clearInterval(timerInterval);
  updateTimer();
  updateScore();
  updateLevel();
}

function playGame() {
  getSequence();
  sequenceOn();
}

function getSequence() {
  var colors = ['red', 'blue', 'green', 'yellow'];
  gameSequence.push(colors[Math.floor(Math.random() * colors.length)]);
}

function sequenceOn() {
  var i = 0;
  var interval = setInterval(function () {
    buttonOn(gameSequence[i]);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
      playerSequence = [];
    }
  }, 800);
}

function buttonOn(color) {
  var btn = document.getElementById(color);
  btn.style.opacity = 1;
  setTimeout(function () {
    btn.style.opacity = 0.5;
  }, 600);
}

function showLossModal() {
  var modalUsername = document.getElementById('modal-username');
  var modalLevel = document.getElementById('modal-level');
  var modalTime = document.getElementById('modal-time');
  var modalScore = document.getElementById('modal-score');

  modalUsername.textContent = playerName;
  modalLevel.textContent = level;
  modalTime.textContent = time;
  modalScore.textContent = score;

  lossModal.style.display = 'block';
}

function checkSequence() {
  for (var i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== gameSequence[i]) {
      showLossModal();
      resetGame();
      return;
    }
    score++;
    updateScore();
  }
  if (playerSequence.length === gameSequence.length) {
    level++;
    setTimeout(playGame, 1000);
    updateLevel();
  }
}

function Timer() {
  timerInterval = setInterval(function () {
    time++;
    updateTimer();
  }, 1000);
}

function updateLevel() {
  levelDisplay.textContent = level;
}

function updateTimer() {
  timerDisplay.innerHTML = time;
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function openModal() {
  userModal.style.display = 'block';
}

function closeModal() {
  userModal.style.display = 'none';
  lossModal.style.display = 'none';
}

function validateUser() {
  playerName = playerNameInput.value.trim();
  if (playerName.length < 3) {
    alert('El nombre debe tener al menos 3 letras.');
  }
  else{
    closeModal();
  }
}

for (var i = 0; i < buttonsColors.length; i++) {
  buttonsColors[i].addEventListener('click', playerInput);
}

function playerInput() {
  if (gameStarted) {
    var color = this.id;
    buttonOn(color);
    playerSequence.push(color);
    checkSequence();
  }
}