import Complex from "../js/classes/complex.js";

const canvas = document.querySelector(".mandelbrot-canv");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
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

function degToRad(degrees) {
	return (degrees * Math.PI) / 180;
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawCircle() {
	ctx.fillStyle = "rgb(0 0 255)";
	ctx.beginPath();
	ctx.arc(150, 106, 50, degToRad(0), degToRad(360), false);
	ctx.fill();
}

function drawTriangle() {
	ctx.fillStyle = "rgb(255 0 0)";
	ctx.beginPath();
	ctx.moveTo(50, 50);
	ctx.lineTo(150, 50);
	const triHeight = 50 * Math.tan(degToRad(60));
	ctx.lineTo(100, 50 + triHeight);
	ctx.lineTo(50, 50);
	ctx.fill();

}

function drawPixel(x, y, color) {
	ctx.lineWidth = 1;
	ctx.fillStyle = color;
	ctx.fillRect(x, y, 1, 1);
}

function calculate(complexPoint, currentDepth, maxDepth) {
	complexPoint = complexPoint?.multiply(complexPoint);
	currentDepth++;
	if (complexPoint.real === Infinity || complexPoint.imaginary === Infinity || complexPoint.real === -Infinity || complexPoint.imaginary === -Infinity) {
		return complexPoint;
	}
	if (currentDepth > maxDepth) {
		return complexPoint;
	}
	return calculate(complexPoint, currentDepth, maxDepth);
}

function renderFrame() {
	let complexPoint;

	for (let yCor = -(height / 2); yCor <= height / 2; yCor++) {
		for (let xCor = -(width / 2); xCor <= width / 2; xCor++) {
			complexPoint = calculate(new Complex(xCor, yCor), 0, 20);

			if (complexPoint.isDiverging()) {
				drawPixel(xCor, yCor, "rgb(255 0 0)");
			} else {
				console.log("converging");
				drawPixel(xCor, yCor, "rgb(0 255 0)");
			}
		}
	}
}

function draw() {
	renderFrame();
	drawCoordinates();
	drawPixel(50, 50, "rgb(0 0 255)");

	requestAnimationFrame(draw);
}

function main() {
	initCanvas();
	draw();

}

main();
