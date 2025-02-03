class Complex {
	constructor(real, imaginary) {
		this.real = real;
		this.imaginary = imaginary;
	}

	add(other) {
		return new Complex(this.real + other.real, this.imaginary + other.imaginary);
	}

	subtract(other) {
		return new Complex(this.real - other.real, this.imaginary - other.imaginary);
	}

	multiply(other) {
		return new Complex(
			this.real * other.real - this.imaginary * other.imaginary,
			this.real * other.imaginary + this.imaginary * other.real
		);
	}

	divide(other) {
		const denominator = other.real * other.real + other.imaginary * other.imaginary;
		return new Complex(
			(this.real * other.real + this.imaginary * other.imaginary) / denominator,
			(this.imaginary * other.real - this.real * other.imaginary) / denominator
		);
	}

	get magnitude() {
		return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
	}

	get argument() {
		return Math.atan2(this.imaginary, this.real);
	}

	conjugate() {
		return new Complex(this.real, -this.imaginary);
	}
}
