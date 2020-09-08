class Square {
  visited = false;
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
    this.visited = true;
    return this.visited;
  }

  paint = (color) => {
    if (!color && this.hasMine) {
      this.board.fillStyle = 'red';
      this.board.fillRect(this.x, this.y, size, size);
      this.board.strokeRect(this.x, this.y, size, size);
    }

    this.board.fillStyle = color ? color : "#c1c1c1";
    this.board.fillRect(this.x, this.y, this.size, this.size);
    this.board.strokeRect(this.x, this.y, this.size, this.size);

    let adjascentMines = this.hasAdjascentMines(this.row, this.col)

    if (adjascentMines) {
      this.board.fillStyle = "red";
      this.board.textAlign = "center";
      this.board.font = `${this.size - 10}px Open Sans`;
      this.board.fillText(`${adjascentMines}`, this.x + 20, (this.y + size) - 10);
    }

    this.visited = true;
  }

  hasAdjascentMines = (grid, row, col, rowCol) => {
    let count = 0;

    if (row > 0 &&
      grid[row - 1][col] === 'M') {
      count++;
    }
    if (row > 0 && col > 0 &&
      grid[row - 1][col - 1] === 'M') {
      count++;
    }
    if (col > 0 &&
      grid[row][col - 1] === 'M') {
      count++;
    }
    if (row < rowCol - 1 &&
      grid[row + 1][col] === 'M') {
      count++;
    }
    if (row < rowCol - 1 &&
      col < rowCol - 1 &&
      grid[row + 1][col + 1] === 'M') {
      count++;
    }
    if (col < rowCol - 1 &&
      grid[row][col + 1] === 'M') {
      count++;
    }

    return count;
  }

  draw = () => {
    this.board.fillRect(this.x, this.y, this.size, this.size);
    this.board.strokeRect(this.x, this.y, this.size, this.size);
    return this.board;
  }
}
