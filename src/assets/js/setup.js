var game;
var timerInterval;
var canvas = document.getElementById('board');
var size = 0;
var ctx = canvas.getContext('2d');

if(window.innerWidth < 790) {
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = ctx.canvas.width;
} else {
  ctx.canvas.width = 500;
  ctx.canvas.height = 500;
}

var canvasSize = ctx.canvas.width;

const setUpMines = (level) => {
  switch (level) {
    case 'easy':
      return 10;
    case 'medium':
      return 40;
    case 'hard':
      return 99;
  }
}

const setUpRowCol = (level) => {
  switch (level) {
    case 'easy':
      return 9;
    case 'medium':
      return 16;
    case 'hard':
      return 22;
  }
}

const setup = (event, level) => {
  event.preventDefault();
  clearCounters();
  let mines = setUpMines(level);
  let rowCol = setUpRowCol(level);
  size = canvasSize / rowCol;
  game = new MineSweeper(rowCol, mines);
  game.board.fillStyle = "#575757";
  game.init();
}

const clearCounters = () => {
  clearInterval(timerInterval);
  let mineCounter = document.getElementById('mine-counter');
  mineCounter.innerHTML = 0;
  let timer = document.getElementById('seconds');
  timer.innerHTML = 0;
}

const clicked = (event) => {
  !game.isRunning && game.startTimer();
  game.squareClicked(event);
}

const rightClicked = (event) => {
  event.preventDefault();
  !game.isRunning && game.startTimer();
  game.squareFlagged(event);
  game.updateMineCounter();
  return false;
}