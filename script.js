//Declaro y asigno variables a elementos del HTML.
var btnOklossModalControls = document.getElementById('btnOkContorls');
var closeModalButton = document.getElementsByClassName('close')[0];
var btncontrolsModal = document.getElementById('controls-button');
var btnDashboardModal = document.getElementById('dashboard-button');
var buttonsColors = document.querySelectorAll('.simon-button');
var controlsModal = document.getElementById('controlsModal');
var playerNameInput = document.getElementById('playerName');
var levelDisplay = document.getElementById('level-display');
var timerDisplay = document.getElementById('timer-display');
var scoreDisplay = document.getElementById('score-display');
var startButton = document.getElementById('start-button');
var btnOklossModal = document.getElementById('btnOk');
var btnUserModal = document.getElementById('btnUser');
var userModal = document.getElementById('userModal');
var lossModal = document.getElementById('lossModal');
var popup = document.getElementById('popup');

//Declaro variables numericas, strings, boleanas y arrays.
var time = 0;
var level = 0;
var score = 0;
var lesspoints = 0;
var gameStarted = false;
var playerName = '';
var timerInterval;
var gameSequence = [];
var playerSequence = [];

//Cuando se detecte el click de alguna de estas variables se va a ejecutar alguna funcion.
startButton.addEventListener('click', startGame);
btnUserModal.addEventListener('click', validateUser);
closeModalButton.addEventListener('click', closeModal);
btnOklossModal.addEventListener('click', closeModal);
btncontrolsModal.addEventListener('click', opencontrolsModal);
btnDashboardModal.addEventListener('click', showPopup);
btnOklossModalControls.addEventListener('click', closeModal);

//Esta funcion ejecuta el juego.
function startGame() {
  if (gameStarted == false) {
    if (playerName == "") {
      openModal();
    } else {
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

//Esta funcion resetea el juego.
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

//Esta funcion ejecuta la secuencia del juego.
function playGame() {
  getSequence();
  sequenceOn();
}

//Esta funcinon obtiene la secuencia del juego.
function getSequence() {
  var colors = ['red', 'blue', 'green', 'yellow'];
  gameSequence.push(colors[Math.floor(Math.random() * colors.length)]);
}

//Esta funcion se encarga de mostrar la secuencia de colores almacenada en el array gameSequence.
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

//Esta funcion enciende el boton que sea necesario.
function buttonOn(color) {
  var btn = document.getElementById(color);
  btn.style.opacity = 1;
  setTimeout(function () {
    btn.style.opacity = 0.5;
  }, 600);
}

//Esta funcion guarda las variables del juego en LocalStorage.
function savedata() {
  var playerData = {
    playerName: playerName,
    level: level,
    time: time,
    score: score,
    date: new Date().toLocaleString(),
  };
  var allPlayerData = JSON.parse(localStorage.getItem('playerData') || '[]');
  allPlayerData.push(playerData);
  localStorage.setItem('playerData', JSON.stringify(allPlayerData));
}

//Esta funcion compara playerSequence con gameSequence y verifica que sea correcta.
function checkSequence() {
  for (var i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== gameSequence[i]) {
      showLossModal();
      resetGame();
      return;
    }
  }
  if (playerSequence.length === gameSequence.length) {
    level++;
    setTimeout(playGame, 1000);
    updateLevel();
  }
  if (gameStarted==true){
    score++;
    lessscore();
    updateScore();
  }
}

//Este codigo escucha e interpreta el color que toca el jugador.
for (var i = 0; i < buttonsColors.length; i++) {
  buttonsColors[i].addEventListener('click', playerInput);
}

//Esta funcion enciendo y guarda el boton que toca el juegador.
function playerInput() {
  if (gameStarted) {
    var color = this.id;
    buttonOn(color);
    playerSequence.push(color);
    checkSequence();
  }
}

//Esta funcion valida que el nombre de usuario poseea al menos 3 letras.
function validateUser() {
  playerName = playerNameInput.value.trim();
  if (playerName.length < 3) {
    alert('El nombre debe tener al menos 3 letras.');
  } else {
    closeModal();
  }
}

//Esta funcion se encarga del timer.
function Timer() {
  timerInterval = setInterval(function () {
    time++;
    updateTimer();
  }, 1000);
}

//Esta funcion muestra el modal de perdida.
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
  savedata();
}

//Esta funcion updatea el nivel en pantalla.
function updateLevel() {
  levelDisplay.textContent = level;
}

//Esta funcion resta puntos dependiendo del tiempo demorado.
function lessscore() {
  lesspoints = time * 0.005;
  score = score - lesspoints;
  score = parseFloat(score.toFixed(3));
}

//Esta funcion updatea el tiempo en pantalla.
function updateTimer() {
  timerDisplay.innerHTML = time;
}

//Esta funcion updatea el puntaje en pantalla.
function updateScore() {
  scoreDisplay.textContent = score;
}

//Esta funcion abre el modal que pide el nombre de usuario.
function openModal() {
  userModal.style.display = 'block';
}

//Esta funcion abre el modal que muestra los controles.
function opencontrolsModal() {
  controlsModal.style.display = 'block';
}

//Esta funcion cierra los modales.
function closeModal() {
  userModal.style.display = 'none';
  lossModal.style.display = 'none';
  controlsModal.style.display = 'none';
}

//Esta muestra los datos de partidas guardadas en una tabla que pertenece al popup.
function showLeaderboard() {
  var allPlayerData = JSON.parse(localStorage.getItem('playerData') || '[]');
  allPlayerData.sort(function(a, b) {
    return b.score - a.score;
  });
  var leaderboardContent = document.createElement('div');
  leaderboardContent.classList.add('leaderboard-container');
  var leaderboardTable = document.createElement('table');
  leaderboardTable.innerHTML = '<tr>' +
    '<th>Username</th>' +
    '<th>Level</th>' +
    '<th>Score</th>' +
    '<th>Date</th>' +
    '</tr>';

  for (var i = 0; i < allPlayerData.length; i++) {
    var playerEntry = document.createElement('tr');
    playerEntry.innerHTML = '<td>' + allPlayerData[i].playerName + '</td>' +
      '<td>' + allPlayerData[i].level + '</td>' +
      '<td>' + allPlayerData[i].score + '</td>' +
      '<td>' + allPlayerData[i].date + '</td>';
    leaderboardTable.appendChild(playerEntry);
  }

  leaderboardContent.appendChild(leaderboardTable);
  var popup = document.querySelector('.popup');
  popup.querySelector('.popup-content').innerHTML = '';
  popup.querySelector('.popup-content').appendChild(leaderboardContent);
}

//Esta funcion muestra el popup.
function showPopup() {
  if (popup.style.display === 'block') {
    popup.style.display = 'none';
  } else {
    showLeaderboard();
    popup.style.display = 'block';
  }
}