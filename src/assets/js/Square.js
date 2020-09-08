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