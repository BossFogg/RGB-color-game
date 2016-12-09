var colors;
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#current-color");
var messageDisplay = document.querySelector("#message");
var resetBtn = document.querySelector("#reset");
var titleBar = document.querySelector("#title");
var diffBtns = document.querySelectorAll(".diff")
var optionBtn = document.querySelector("#option");
var menu = document.querySelector("ul");
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
				this.style.backgroundColor = "rgb(50, 50, 50)";
				this.style.boxShadow = "none"
				messageDisplay.textContent = "Try again";
			}
		})
	};
}

function setButtons() {
	resetBtn.addEventListener("click", function(){
		reset(difficulty);
	});

	optionBtn.addEventListener("click", toggleMenu);

	for(i = 0; i < diffBtns.length; i++) {
		diffBtns[i].addEventListener("click", function(){
			this.textContent === "easy" ? difficulty = 3: difficulty = 6;
			if (this.textContent==="hard") { difficulty = 9 };
			menu.classList.add("hidden")
			clearSelection();
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
		var currentText = diffBtns[i].textContent;
		diffBtns[i].classList.remove("selected");
		if(currentText === "easy" && difficulty === 3) {
			diffBtns[i].classList.add("selected");
		}
		else if (currentText === "medium" && difficulty === 6) {
			diffBtns[i].classList.add("selected");
		}
		else if(currentText === "hard" && difficulty === 9) {
			diffBtns[i].classList.add("selected");
		}
	}
};

function toggleMenu() {
	menu.classList.toggle("hidden");
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
		squares[i].style.boxShadow = "4px 4px 2px rgba(0, 0, 0, 0.3)"
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