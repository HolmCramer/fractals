import Complex from "../js/classes/complex.js";

const canvas = document.querySelector(".mandelbrot-canv");
//const width = (canvas.width = window.innerWidth);
//const height = (canvas.height = window.innerHeight);
const width = (canvas.width = 400);
const height = (canvas.height = 300);
const ctx = canvas.getContext("2d");

function initCanvas() {
	ctx.fillStyle = "rgb(0 0 0)";
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

function calculate(x, c, currentDepth, maxDepth) {
	x = math.add(math.pow(x, 2), c);
	currentDepth++;
	if (math.re(x) === Infinity || math.im(x) === Infinity || math.re(x) === -Infinity || math.im(x) === -Infinity) {
		return x;
	}
	if (currentDepth > maxDepth) {
		return x;
	}
	return calculate(x, c, currentDepth, maxDepth);
}

function isDiverging(complexPoint) {
	//if (math.re(complexPoint) === Infinity || math.im(complexPoint) === Infinity || math.re(complexPoint) === -Infinity || math.im(complexPoint) === -Infinity) {
	//	console.log("diverge");
	//	return true;
	if (math.re(complexPoint) >= Number.MAX_VALUE || math.im(complexPoint) >= Number.MAX_VALUE || math.re(complexPoint) <= Number.MIN_VALUE || math.im(complexPoint) <= Number.MIN_VALUE) {
		console.log("diverge");
		return true;
	} else {
		console.log("converge")
		return false;
	}
}

function renderFrame() {
	let complexPoint;

	for (let yCor = -(height / 2); yCor <= height / 2; yCor++) {
		for (let xCor = -(width / 2); xCor <= width / 2; xCor++) {
			complexPoint = calculate(0, math.complex(xCor, yCor), 0, 7);

			if (isDiverging(complexPoint)) {
				drawPixel(xCor, yCor, "rgb(0 0 0)");
			} else {
				drawPixel(xCor, yCor, "rgb(0 255 255)");
			}
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
	draw();

}

main();
