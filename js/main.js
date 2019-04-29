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

let gamesPlayed = 0;
let p1wins = 0;
let p2wins = 0;

let ticTacToe = {
	board: null,
	currentPlayer: null,
	lastPieceLoc: null,
	lastPiece: null,
	winner: null,

	initGame: function() {
		this.currentPlayer = P1;
		this.board = this.createBoard();
		this.lastPiece = null;
		this.lastPieceLoc = null;
		this.winner = null;
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

		if (this.isOpenPosition([r - 1, c - 1])) {
			if (this.winner === null) {
				if (!this.boardIsFull()) {
					this.lastPieceLoc = [r - 1, c - 1];
					this.lastPiece = cell;
					this.inputPiece(this.lastPieceLoc);
					if (this.isThereAWinner()) {
						this.winner = this.currentPlayer;
						let playerString;
						if (this.currentPlayer === P1) {
							playerString = "Player 1";
							currentPlayerElem.classList.add("red");
							currentPlayerElem.classList.remove("blue");
							p1wins++;
						}
						else {
							playerString = "Player 2";
							currentPlayerElem.classList.add("blue");
							currentPlayerElem.classList.remove("red");
							p2wins++;
						}
						currentPlayerElem.innerHTML = playerString + " won!";
						gamesPlayed++;
						updateWinBar();
						endGameButtons();
					}
					else {
						if(this.boardIsFull()) {
							currentPlayerElem.innerHTML = "Game is tied!";
							gamesPlayed++;
							updateWinBar();
							endGameButtons();
						}
						else {
							this.switchPlayers();
						}
					}
				}
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
		if (this.currentPlayer === P1) {
			this.currentPlayer = P2;
			currentPlayerElem.classList.add("blue");
			currentPlayerElem.classList.remove("red");
			currentPlayerElem.innerHTML = "Player 2!";
		}
		else {
			this.currentPlayer = P1;
			currentPlayerElem.classList.add("red");
			currentPlayerElem.classList.remove("blue");
			currentPlayerElem.innerHTML = "Player 1!";
		}

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
	}
};

let aiBtn;
let aiWrapper;
let friendBtn;
let friendWrapper;
let instructions;
let gamePlay;
let gameBoard;
let endBtns;
let currentPlayerElem;
let gamesPlayedView;
let p1winView;
let p2winView;

function connectButtons() {
	aiBtn = document.querySelector(".ai");
	aiBtn.addEventListener('click', setUpAi);

	aiWrapper = document.querySelector(".wrapAI");

	friendBtn = document.querySelector(".friend");
	friendBtn.addEventListener('click', setUpFriend);

	friendWrapper = document.querySelector(".wrapFriend");

	instructions = document.querySelector(".instructions");
	endBtns = document.querySelector(".endBtns");

	currentPlayerElem = document.querySelector(".currPlayer");

	setUpWinBar();
	updateWinBar();
}

function setUpWinBar() {
	gamesPlayedView = document.querySelector("#games-played");	
	p1winView = document.querySelector("#p1-win");
	p2winView = document.querySelector("#p2-win");
}

function updateWinBar() {
	gamesPlayedView.textContent = "Games Played: " + gamesPlayed;
	p1winView.textContent = "Player 1 Wins: " + p1wins;
	p2winView.textContent = "Player 2 Wins: " + p2wins;
}

function setUpAi() {
	alert("Sorry! The AI functionality is not set up yet!");
}

function setUpFriend() {
	ticTacToe.initGame();
	aiWrapper.classList.add("wrapper-closed");
	aiWrapper.classList.remove("wrapper");
	friendWrapper.classList.add("wrapper-closed");
	friendWrapper.classList.remove("wrapper");
	instructions.style.visibility = "hidden";
	gamePlay = document.querySelector(".gamePlay");
	drawBoard();
}

function drawBoard() {
	gameBoard = document.createElement("div");
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

	gamePlay.appendChild(gameBoard);
	currentPlayerElem.classList.add("red");
	currentPlayerElem.innerHTML = "Player 1!";
}

function endGameButtons() {
	let btnWrapperReset = document.createElement("div");
	btnWrapperReset.classList.add("wrapper");
	btnWrapperReset.classList.add("wrapReset");

	let btnReset = document.createElement("div");
	btnReset.classList.add("btn");
	btnReset.classList.add("slider");
	btnReset.classList.add("reset");
	btnReset.textContent = "Play again?";

	btnWrapperReset.appendChild(btnReset);

	let btnWrapperEndAI = document.createElement("div");
	btnWrapperEndAI.classList.add("wrapper");
	btnWrapperEndAI.classList.add("wrapEndAI");

	let btnEndAI = document.createElement("div");
	btnEndAI.classList.add("btn");
	btnEndAI.classList.add("slider");
	btnEndAI.classList.add("endAI");
	btnEndAI.textContent = "Challenge Computer?";

	btnWrapperEndAI.appendChild(btnEndAI);

	let btnWrapperEndMain = document.createElement("div");
	btnWrapperEndMain.classList.add("wrapper");
	btnWrapperEndMain.classList.add("wrapEndMain");

	let btnEndMain = document.createElement("div");
	btnEndMain.classList.add("btn");
	btnEndMain.classList.add("slider");
	btnEndMain.classList.add("endMain");
	btnEndMain.textContent = "Main Menu";

	btnWrapperEndMain.appendChild(btnEndMain);

	btnEndMain.addEventListener('click', endMainFun);
	btnReset.addEventListener('click', function() { 
		ticTacToe.initGame();
		gamePlay.removeChild(gamePlay.childNodes[0]);
		drawBoard();
		endBtns.innerHTML = "";
	});
	btnEndAI.addEventListener('click', setUpAi);

	endBtns.appendChild(btnWrapperReset);
	endBtns.appendChild(btnWrapperEndAI);
	endBtns.appendChild(btnWrapperEndMain);
}

function endMainFun() {
	gamePlay.removeChild(gamePlay.childNodes[0]);
	endBtns.innerHTML = "";
	instructions.style.visibility = "visible";
	aiWrapper.classList.add("wrapper");
	aiWrapper.classList.remove("wrapper-closed");
	friendWrapper.classList.add("wrapper");
	friendWrapper.classList.remove("wrapper-closed");
}

connectButtons();