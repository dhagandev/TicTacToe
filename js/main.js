const P1 = 1;
const P2 = -1;
const EMPTY = 0;
const BOARD_SIZE = 3;
const DIRECTIONS = {
	UP: [-1, 0], 
	DOWN: [1, 0],
	LEFT: [0, -1],
	RIGHT: [0, 1],
	UPLEFT: [-1, -1],
	UPRIGHT: [-1, 1],
	DOWNLEFT: [1, -1],
	DOWNRIGHT: [1, 1]
};

let ticTacToe = {
	board: null,
	currentPlayer: null,
	lastPieceLoc: null,
	lastPiece: null,
	winner: null,

	playGame: function() {
		this.initGame();
		// while(this.winner === null && !this.boardIsFull()) {
		// let position = this.processInput();
		// 	this.inputPiece(position);
		// 	this.lastPieceLoc = position;
		// 	if (this.isThereAWinner()) {
		// 		this.winner = this.currentPlayer;
		// 	}
		// 	else {
		// 		this.switchPlayers();
		// 	}
			// this.render();
		// }

	},

	initGame: function() {
		this.currentPlayer = P1;
		this.board = this.createBoard();
	},

	createBoard: function() {
		let newBoard = [];
		for (let row = 0; row < BOARD_SIZE; row++) {
			let column = [];
			for (let col = 0; col < BOARD_SIZE; col++) {
				column.push(EMPTY);
			}
			newBoard.push(column);
		}

		return newBoard;
	},

	processInput: function(cell) {
		let r = cell.getAttribute("row");
		let c = cell.getAttribute("col");

		console.log("Processing Input");
		if (this.isOpenPosition([r - 1, c - 1])) {
			console.log("Position is open");
			if (this.winner === null) {
				console.log("Winner is null");
				if (!this.boardIsFull()) {
					console.log("Board is not full");
					this.lastPieceLoc = [r - 1, c - 1];
					this.lastPiece = cell;
					this.inputPiece(this.lastPieceLoc);
					if (this.isThereAWinner()) {
						this.winner = this.currentPlayer;
					}
					else {
						this.switchPlayers();
					}
				}
				else {
					//Display tie game
				}
			}
			else {
				//Display winner
			}
		}
		else {
			alert("That spot has been taken!");
		}
	},

	inputPiece: function(location) {
		this.board[location[0]][location[1]] = this.currentPlayer;
		if (this.currentPlayer === P1) {
			this.lastPiece.textContent = "x";
			this.lastPiece.classList.add("red");
		}
		else {
			this.lastPiece.textContent = "0";
			this.lastPiece.classList.add("blue");
		}
	},

	switchPlayers: function() {
		this.currentPlayer === P1 ? this.currentPlayer = P2 : this.currentPlayer = P1;
	},

	boardIsFull: function() {
		for (let row = 0; row < BOARD_SIZE; row++) {
			for (let col = 0; col < BOARD_SIZE; col++) {
				if (this.board[row][col] === EMPTY) {
					return false;
				}
			}
		}
		return true;
	},

	isThereAWinner: function() {
		let count = 1;
		count += this.countInDir(DIRECTIONS.DOWN);
		count += this.countInDir(DIRECTIONS.UP);
		if (count === BOARD_SIZE) {
			return true;
		}

		count = 1;
		count += this.countInDir(DIRECTIONS.DOWNLEFT);
		count += this.countInDir(DIRECTIONS.UPRIGHT);
		if (count === BOARD_SIZE) {
			return true;
		}

		count = 1;
		count += this.countInDir(DIRECTIONS.DOWNRIGHT);
		count += this.countInDir(DIRECTIONS.UPLEFT);
		if (count === BOARD_SIZE) {
			return true;
		}

		count = 1;
		count += this.countInDir(DIRECTIONS.LEFT);
		count += this.countInDir(DIRECTIONS.RIGHT);
		if (count === BOARD_SIZE) {
			return true;
		}

		return false;
	},

	countInDir: function(dir) {
		let count = 0;
		let modifiablePosition = [this.lastPieceLoc[0], this.lastPieceLoc[1]];
		let newRow = modifiablePosition[0] + dir[0];
		let newCol = modifiablePosition[1] + dir[1];
		while(this.isValidPosition([newRow, newCol]) && this.board[newRow][newCol] === this.currentPlayer) {
			count++;
			modifiablePosition = [newRow, newCol];
			newRow = modifiablePosition[0] + dir[0];
			newCol = modifiablePosition[1] + dir[1];
		}
		return count;
	},

	isOpenPosition: function(position) {
		return this.board[position[0]][position[1]] === EMPTY;
	},

	isValidPosition: function(position) {
		return position[0] >= 0 && position[0] < BOARD_SIZE && position[1] >= 0 && position[1] < BOARD_SIZE;
	},

	render: function() {
		console.log(this.board);
	}
};

let aiBtn;
let aiWrapper;
let friendBtn;
let friendWrapper;
let instructions;
let gamePlay;

function connectButtons() {
	aiBtn = document.querySelector(".ai");
	aiBtn.addEventListener('click', setUpAi);

	aiWrapper = document.querySelector(".wrapAI");

	friendBtn = document.querySelector(".friend");
	friendBtn.addEventListener('click', setUpFriend);

	friendWrapper = document.querySelector(".wrapFriend");

	instructions = document.querySelector(".instructions");
}

function setUpAi() {
	alert("Sorry! The AI functionality is not set up yet!");
}

function setUpFriend() {
	aiWrapper.classList.add("wrapper-closed");
	aiWrapper.classList.remove("wrapper");
	friendWrapper.classList.add("wrapper-closed");
	friendWrapper.classList.remove("wrapper");
	instructions.style.visibility = "hidden";
	gamePlay = document.querySelector(".gamePlay");
	drawBoard();
}

function drawBoard() {
	let gameBoard = document.createElement("div");
	gameBoard.classList.add("game-board");

	let row = 1;
	let col = 1;
	for (let cell = 0; cell < BOARD_SIZE * BOARD_SIZE; cell++) {
		let cellSpace = document.createElement("div");
		cellSpace.classList.add("game-cell");
		cellSpace.setAttribute("row", row);
		cellSpace.setAttribute("col", col);
		cellSpace.addEventListener('click', function () {
			ticTacToe.processInput(this);
		})
		gameBoard.appendChild(cellSpace);

		if (col % 3 === 0) {
			row++;
			col = 0;
		}
		col++;
	}

	// for (let cellR = 0; cellR < BOARD_SIZE; cellR++) {
	// 	for (let cellC = 0; cellC < BOARD_SIZE; cellC) {
	// 		let cellSpace = document.createElement("div");
	// 		cellSpace.classList.add("game-cell");
	// 		// cellSpace.setAttribute("row", cellR);
	// 		// cellSpace.setAttribute("col", cellC)
	// 		gameBoard.appendChild(cellSpace);
	// 	}
	// }
	gamePlay.appendChild(gameBoard);
}

connectButtons();
ticTacToe.initGame();