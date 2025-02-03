console.log("Hello World");

const canvas = document.querySelector(".mandelbrot-canv");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");


//ctx.fillStyle = "rgb(0 0 0)";
//ctx.fillRect(0, 0, width, height);
//ctx.fillStyle = "rgb(255 0 0)";
//ctx.fillRect(50, 50, 100, 150);
//ctx.fillStyle = "rgb(0 255 0)";
//ctx.fillRect(75, 75, 100, 100);
//ctx.fillStyle = "rgb(255 0 255 / 75%)";
//ctx.fillRect(25, 100, 175, 50);
//ctx.strokeStyle = "rgb(255 255 255)";
//ctx.strokeRect(25, 25, 175, 200);
//ctx.lineWidth = 5;

//ctx.beginPath();
//ctx.strokeStyle = "blue";
//ctx.moveTo(20, 20);
//ctx.lineTo(200, 20);
//ctx.stroke();
//
//
//function degToRad(degrees) {
//	return (degrees * Math.PI) / 180;
//}
//
//ctx.fillStyle = "rgb(255 0 0)";
//ctx.beginPath();
//ctx.moveTo(50, 50);
//
//ctx.lineTo(150, 50);
//const triHeight = 50 * Math.tan(degToRad(60));
//ctx.lineTo(100, 50 + triHeight);
//ctx.lineTo(50, 50);
//ctx.fill();
//
//
//ctx.fillStyle = "rgb(0 0 255)";
//ctx.beginPath();
//ctx.arc(150, 106, 50, degToRad(0), degToRad(360), false);
//ctx.fill();
//
//
//ctx.fillStyle = "yellow";
//ctx.beginPath();
//ctx.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
//ctx.lineTo(200, 106);
//ctx.fill();


ctx.translate(width / 2, height / 2);

function degToRad(degrees) {
	return (degrees * Math.PI) / 180;
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let length = 250;
let moveOffset = 20;

for (let i = 0; i < length; i++) {
	ctx.fillStyle = `rgb(${255 - length} 0 ${255 - length} / 90%)`;
	ctx.beginPath();
	ctx.moveTo(moveOffset, moveOffset);
	ctx.lineTo(moveOffset + length, moveOffset);
	const triHeight = (length / 2) * Math.tan(degToRad(60));
	ctx.lineTo(moveOffset + length / 2, moveOffset + triHeight);
	ctx.lineTo(moveOffset, moveOffset);
	ctx.fill();

	length--;
	moveOffset += 0.7;
	ctx.rotate(degToRad(5));
}
