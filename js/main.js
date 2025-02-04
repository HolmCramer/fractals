math.config({
	number: 'BigNumber',      // Default type of number
	// 'number' (default), 'BigNumber', or 'Fraction'
	precision: 64,            // Number of significant digits for BigNumbers
	relTol: 1e-60,
	absTol: 1e-63
});


const canvas = document.querySelector(".mandelbrot-canv");
//const width = (canvas.width = window.innerWidth);
//const height = (canvas.height = window.innerHeight);
const width = (canvas.width = 400);
const height = (canvas.height = 300);
const ctx = canvas.getContext("2d");
const MAX_ITERATIONS = 255;
let xScale = 1 / 100;
let yScale = 1 / 100;
let scaleMatrix = [xScale, 0, 0, 0, yScale, 0, 0, 0];
const valueMatrix = initValueMatrix();
const ZOOM = 100;

function initValueMatrix() {
	const valueMatrix = new Array(height);

	for (let column = 0; column <= height; column++) {
		valueMatrix[column] = new Array(width);
	}

	for (let column = 0; column <= height; column++) {
		for (let row = 0; row <= width; row++) {
			valueMatrix[column][row] = "rgb(0 0 0)";
		}
	}

	return valueMatrix;
}


function initCanvas() {
	ctx.fillStyle = "rgb(255 255 255)";
	ctx.fillRect(0, 0, width, height);
	ctx.translate(width / 2, height / 2);
}

function drawCoordinates() {
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.strokeStyle = "rgb(255 255 255)";
	ctx.moveTo(0, height / 2);
	ctx.lineTo(0, -(height / 2));
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "rgb(255 255 255)";
	ctx.moveTo(width / 2, 0);
	ctx.lineTo(-(width / 2), 0);
	ctx.stroke();

}

function drawPixel(x, y, color) {
	ctx.lineWidth = 1;
	ctx.fillStyle = color;
	ctx.fillRect(x, y, 1, 1);
}

function calculate(x, c, currentDepth) {
	x = math.add(math.pow(x, 2), c);
	currentDepth++;
	if (math.re(x) === Infinity || math.im(x) === Infinity || math.re(x) === -Infinity || math.im(x) === -Infinity) {
		return x;
	}
	if (currentDepth > MAX_ITERATIONS) {
		return x;
	}
	return calculate(x, c, currentDepth);
}

function isDiverging(complexPoint) {
	if (math.re(complexPoint) === Infinity || math.im(complexPoint) === Infinity || math.re(complexPoint) === -Infinity || math.im(complexPoint) === -Infinity) {
		return true;
	} else {
		return false;
	}
}

function fillValueMatrix() {
	let complexPoint;

	for (let yCor = -(height / 2); yCor <= height / 2; yCor++) {
		for (let xCor = -(width / 2); xCor <= width / 2; xCor++) {
			complexPoint = calculate(0, math.complex(math.divide(xCor, ZOOM), math.divide(yCor, ZOOM)), 0);
			if (isDiverging(complexPoint)) {
				valueMatrix[yCor + (height / 2)][xCor + (width / 2)] = "rgb(0 0 0)";
			} else {
				valueMatrix[yCor + (height / 2)][xCor + (width / 2)] = "rgb(0 255 255)";
			}
		}
	}
}

function OLDrenderFrame() {
	let complexPoint;

	for (let yCor = -(height / 2); yCor <= height / 2; yCor++) {
		for (let xCor = -(width / 2); xCor <= width / 2; xCor++) {
			complexPoint = calculate(0, math.complex(math.divide(xCor, ZOOM), math.divide(yCor, ZOOM)), 0);

			if (isDiverging(complexPoint)) {
				drawPixel(xCor, yCor, "rgb(0 0 0)");
			} else {
				drawPixel(xCor, yCor, "rgb(0 255 255)");
			}
		}
	}
}

function renderFrame() {
	for (let yCor = -(height / 2); yCor <= height / 2; yCor++) {
		for (let xCor = -(width / 2); xCor <= width / 2; xCor++) {
			drawPixel(xCor, yCor, valueMatrix[yCor + (height / 2)][xCor + (width / 2)]);
			//console.log(valueMatrix[yCor + (height / 2)][xCor + (width / 2)]);
		}
	}
}

function draw() {
	renderFrame();
	//drawCoordinates();

	//requestAnimationFrame(draw);
}

function main() {
	initCanvas();
	initValueMatrix();
	fillValueMatrix();
	draw();
}

main();
