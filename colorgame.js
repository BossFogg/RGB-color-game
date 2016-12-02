var colors;
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#current-color");
var messageDisplay = document.querySelector("#message");
var resetBtn = document.querySelector("#reset");
var titleBar = document.querySelector("#title");
var diffBtns = document.querySelectorAll(".diff")
var difficulty = 6;

init();

function init() {
	setSquares();
	setButtons();
	reset(difficulty);
}

function setSquares() {
	for(var i = 0; i<squares.length; i++) {
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if(clickedColor===pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetBtn.textContent = "Play Again";
				winnerDisplay(clickedColor);
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again";
			}
		})
	};
}

function setButtons() {
	resetBtn.addEventListener("click", function(){
		reset(difficulty);
	});

	for(i = 0; i < diffBtns.length; i++) {
		diffBtns[i].addEventListener("click", function(){
			clearSelection();
			this.classList.add("selected");
			this.textContent === "easy" ? difficulty = 3: difficulty = 6;
			if (this.textContent==="hard") { difficulty = 9 };
			reset(difficulty);
		})
	};
}

function reset(diff) {
	titleBar.style.backgroundColor = "steelblue";
	showHideSquares(diff);
	colors = generateColors(diff);
	paintSquares();
	pickedColor = colors[pickColor()];
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "Click the matching color!";
	resetBtn.textContent = "New Colors";
};

function clearSelection() {
	for (i = 0; i < diffBtns.length; i++) {
		diffBtns[i].classList.remove("selected");
	}
};

function showHideSquares(diff) {
	for(i = 0; i<squares.length; i++) {
		if(i < difficulty) {
			squares[i].style.display = "block";
		}
		else {
			squares[i].style.display = "none";
		}
	}
};

function paintSquares() {
	for(i = 0; i<difficulty; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
};

function generateColors(num) {
	var arr = [];
	for(i = 0; i<num; i++) {
		arr.push(randomColor());
	}
	return arr;
};

function randomColor() {
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	var rgb = "rgb(" + red + ", " + green + ", " + blue + ")";
	return rgb;
};

function pickColor() {
	var random = Math.floor(Math.random() * difficulty);
	return random;
};

function winnerDisplay(color) {
	for(i = 0; i<squares.length; i++) {
		squares[i].style.backgroundColor = color;
	};
	titleBar.style.backgroundColor = pickedColor;
};