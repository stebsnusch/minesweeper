class Square {
  visited = false;
  flagged = false;
  constructor(board, row, col, x, y, size, hasMine) {
    this.board = board;
    this.row = row;
    this.col = col;
    this.x = x;
    this.y = y;
    this.size = size;
    this.hasMine = hasMine;
  }

  getVisited = () => {
    return this.visited;
  }

  setVisited = () => {
    !this.visited && game.visitedSquares++;
    this.visited = true;
  }

  paint = () => {
    if (this.hasMine) {
      this.board.fillStyle = 'red';
      this.board.fillRect(this.x, this.y, this.size, this.size);
      this.board.strokeRect(this.x, this.y, this.size, this.size);
      return;
    }

    this.board.fillStyle = "#c1c1c1";
    this.board.fillRect(this.x, this.y, this.size, this.size);
    this.board.strokeRect(this.x, this.y, this.size, this.size);

    let adjacentMines = this.hasAdjacentMines();

    if (adjacentMines > 0) {
      this.board.fillStyle = "red";
      this.board.textAlign = "center";
      this.board.textBaseline = "middle";
      this.board.font = `${this.size - 10}px Open Sans`;
      this.board.fillText(`${adjacentMines}`, this.x + (this.size / 2), this.y + (this.size / 2));
    }
  }

  flag = () => {
    if (!this.visited) {
      this.flagged = true;
      this.hasMine && game.flags++;
      game.remainingMines--;
      this.board.fillStyle = "blue";
      this.board.fillRect(this.x, this.y, this.size, this.size);
      this.board.strokeRect(this.x, this.y, this.size, this.size);
    }
  }

  unflag = () => {
    this.flagged = false;
    game.remainingMines++;
    this.board.fillStyle = "#575757";
    this.board.fillRect(this.x, this.y, this.size, this.size);
    this.board.strokeRect(this.x, this.y, this.size, this.size);
  }

  cancelFlag = () => {
    this.board.fillStyle = "orange";
    this.board.fillRect(this.x, this.y, this.size, this.size);
    this.board.strokeRect(this.x, this.y, this.size, this.size);
  }

  hasAdjacentMines = () => {
    let count = 0;

    let adjacentSquares = this.getAdjacentSquares();

    !adjacentSquares.right.isEmpty && adjacentSquares.right.hasMine && count++;
    !adjacentSquares.left.isEmpty && adjacentSquares.left.hasMine && count++;
    !adjacentSquares.leftDiagDown.isEmpty && adjacentSquares.leftDiagDown.hasMine && count++;
    !adjacentSquares.leftDiagUp.isEmpty && adjacentSquares.leftDiagUp.hasMine && count++;
    !adjacentSquares.rightDiagDown.isEmpty && adjacentSquares.rightDiagDown.hasMine && count++;
    !adjacentSquares.rightDiagUp.isEmpty && adjacentSquares.rightDiagUp.hasMine && count++;
    !adjacentSquares.up.isEmpty && adjacentSquares.up.hasMine && count++;
    !adjacentSquares.down.isEmpty && adjacentSquares.down.hasMine && count++;

    return count;
  }

  draw = () => {
    this.board.fillRect(this.x, this.y, this.size, this.size);
    this.board.strokeRect(this.x, this.y, this.size, this.size);
    return this.board;
  }

  getAdjacentSquares = () => {
    let right = game.getSquareByIndex(this.row, this.col + 1);
    let left = game.getSquareByIndex(this.row, this.col - 1);
    let rightDiagUp = game.getSquareByIndex(this.row - 1, this.col + 1);
    let leftDiagUp = game.getSquareByIndex(this.row - 1, this.col - 1);
    let up = game.getSquareByIndex(this.row - 1, this.col);
    let down = game.getSquareByIndex(this.row + 1, this.col);
    let rightDiagDown = game.getSquareByIndex(this.row + 1, this.col + 1);
    let leftDiagDown = game.getSquareByIndex(this.row + 1, this.col - 1);

    let adjasdentSquares = {
      right: right ? right : { isEmpty: true },
      left: left ? left : { isEmpty: true },
      rightDiagUp: rightDiagUp ? rightDiagUp : { isEmpty: true },
      rightDiagDown: rightDiagDown ? rightDiagDown : { isEmpty: true },
      leftDiagUp: leftDiagUp ? leftDiagUp : { isEmpty: true },
      leftDiagDown: leftDiagDown ? leftDiagDown : { isEmpty: true },
      up: up ? up : { isEmpty: true },
      down: down ? down : { isEmpty: true },
    };

    return adjasdentSquares;
  }
}

class MineSweeper {
  board = ctx;
  grid;
  flags = 0;
  winner = false;
  loser = false;
  squares = [];
  isRunning = false;
  allVisited = false;
  emptySquares = 0;
  visitedSquares = 0;
  constructor(rowCol, mines) {
    this.rowCol = rowCol;
    this.mines = mines;
    this.remainingMines = mines;
  };

  init() {
    this.drawGrid();
    this.drawSquares();
    this.updateMineCounter();
    this.emptySquares = this.squares.length - this.mines;
  }


  updateMineCounter = () => {
    let mineCounter = document.getElementById('mine-counter');
    mineCounter.innerHTML = game.remainingMines;
  }

  startTimer = () => {
    this.isRunning = true;
    let count = 1;
    let timer = document.getElementById('seconds');
    timerInterval = setInterval(() => {
      timer.innerHTML = count++;
    }, 1000)
  }

  hasVisitedAll = () => {
    setTimeout(() => {
      this.emptySquares === this.visitedSquares && this.setWinner();
    }, 20);
  }

  drawGrid = () => {
    if (this.mines > this.rowCol * this.rowCol) {
      return "Erro!";
    };

    this.grid = this.build2DArray(this.rowCol);

    this.fillCols(this.rowCol);
    this.placeMines(this.grid, this.mines);
    return this.grid;
  };

  build2DArray = (rowCol) => {
    let grid = new Array(rowCol);
    for (let i = 0; i < rowCol; i++) {
      grid[i] = new Array(rowCol);
    }
    return grid;
  }

  fillCols = (rowCol) => {
    for (let i = 0; i < rowCol; i++) {
      for (let j = 0; j < this.rowCol; j++) {
        this.grid[i][j] = '';
      }
    }
  }

  placeMines = (grid, mines) => {
    let i = 0
    while (i < mines) {
      let randomRow = Math.floor(Math.random() * grid.length);
      let randomCol = Math.floor(Math.random() * grid.length);
      let randomElement = Math.floor(Math.random() * grid.length);

      if (grid[randomRow, randomCol][randomElement] !== 'M') {
        grid[randomRow, randomCol][randomElement] = 'M';
        i++;
      }
    }

    return grid;
  }

  drawSquares = () => {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let x = i * size;
        let y = j * size;
        let square = new Square(this.board, i, j, y, x, size);
        square.draw();
        this.squares.push(square);
      }
    }
    this.bindSquaresAndMines()

    return board;
  }

  bindSquaresAndMines = () => {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === 'M') {
          let mineSquare = this.getSquareByIndex(i, j)
          mineSquare.hasMine = true;
        }
      }
    }
  }

  getClickPosition = (event) => {
    let canvasLimit = canvas.getBoundingClientRect();
    let clickX = event.clientX - Math.floor(canvasLimit.left);
    let clickY = event.clientY - Math.floor(canvasLimit.top);

    return [clickX, clickY];
  };

  getSquareByIndex = (row, col) => {
    let square;
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i].row === row &&
        this.squares[i].col === col) {
        square = this.squares[i];
        break;
      }
    }

    return square;
  }

  getSquareByClick = (clickPosition) => {
    let x = clickPosition[0];
    let y = clickPosition[1];
    let square;

    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i].row === Math.floor(y / size) &&
        this.squares[i].col === Math.floor(x / size)) {
        square = this.squares[i];

      }
    }

    return square;
  }


  setLoser = () => {
    clearInterval(timerInterval);
    this.loser = true;
    this.revealMines();
    setTimeout(() => { alert('Game Over!') }, 50);
    return;
  }

  revealMines = () => {
    this.squares.map((square) => {
      square.hasMine && !square.flagged && square.paint();
      !square.hasMine && square.flagged && square.cancelFlag();
    })
  }

  squareClicked = (event) => {
    if (this.loser || this.winner) return;
    let clickPosition = this.getClickPosition(event);
    let square = this.getSquareByClick(clickPosition);
    square.hasMine && this.setLoser();
    square.paint();
    if (!square.hasMine && !square.hasAdjacentMines()) {
      this.expand(square);
    }
    square.setVisited();
    this.hasVisitedAll();
  };

  expand = (square) => {

    square.paint();
    if (!square.hasAdjacentMines() &&
      !square.visited) {
      square.setVisited();
      let adjacentSquares = square.getAdjacentSquares();
      Object.values(adjacentSquares).map((currentSquare) => {
        !currentSquare.isEmpty && this.expand(currentSquare);
      });
    }

    if (square.hasAdjacentMines() &&
      !square.visited) {
      square.setVisited();
    }
  }

  squareFlagged = (event) => {
    if (this.loser || this.winner) return;
    let clickPosition = this.getClickPosition(event);
    let square = this.getSquareByClick(clickPosition);

    if (square.flagged) {
      square.unflag();
    } else {
      square.flag();
    }
  }

  showFinalBoard = () => {
    this.squares.map((square) => {
      square.flagged ? square.flag() : square.paint();
    })
  }

  setWinner = () => {
    clearInterval(timerInterval);
    this.winner = true;
    alert('You won!');
    let count = 0;
    while (count <= 5000) {
      setTimeout(this.victoryParty.bind(null, count, size), 500);
      count++;
    }
  }

  victoryParty = (count, size) => {
    let randomCol = Math.floor(Math.random() * canvas.height);
    let randomRow = Math.floor(Math.random() * canvas.height);
    let randomSquare = this.getSquareByClick([randomCol, randomRow]);
    this.board.fillStyle = this.randomColor();
    this.board.fillRect(randomSquare.x, randomSquare.y, size, size);
    this.board.strokeRect(randomSquare.x, randomSquare.y, size, size);

    if (count === 5000) {
      game.showFinalBoard();
    }
  }

  randomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}

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