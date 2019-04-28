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
	lastPiece: null,
	winner: null,

	playGame: function() {
		this.initGame();
		// while(this.winner === null && !this.boardIsFull()) {
		// 	let position = this.getInput();
		// 	this.inputPiece(position);
		// 	this.lastPiece = position;
		// 	if (this.isThereAWinner()) {
		// 		this.winner = this.currentPlayer;
		// 	}
		// 	else {
		// 		this.switchPlayers();
		// 	}
		// 	this.render();
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

	getInput: function() {
		let row = prompt("Insert row: ");
		row = parseInt(row);
		let col = prompt("Insert col: ");
		col = parseInt(col);

		//Need to check that the input is proper
		//Open position on the board
		//Empty space

		return [row - 1, col - 1];
	},

	inputPiece: function(location) {
		this.board[location[0]][location[1]] = this.currentPlayer;
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
		let modifiablePosition = [this.lastPiece[0], this.lastPiece[1]];
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
	alert("Ready to play with a friend!");

	aiWrapper.classList.add("wrapper-closed");
	aiWrapper.classList.remove("wrapper");
	friendWrapper.classList.add("wrapper-closed");
	friendWrapper.classList.remove("wrapper");

	instructions.style.visibility = "hidden";
}

connectButtons();
ticTacToe.playGame();