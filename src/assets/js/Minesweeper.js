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