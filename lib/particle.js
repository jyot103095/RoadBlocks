class Particle {
	constructor(posX, posY, velX, velY, color) {
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.alpha = 1;
		this.color = color;
	}

	move() {
		this.posX += this.velX;
		this.posY += this.velY;
		this.alpha -= 0.05;
	}

	getColor() {
		let colorWAlpha = this.color.slice(0, 3) + "a" + this.color.slice(3, 4);
		let values = this.color.slice(4, 13).split(",");
		values.push(`${this.alpha}`);

		return colorWAlpha + values.join(", ") + this.color[13];
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.strokeStyle = this.getColor();
		ctx.arc(
      this.posX, this.posY, 5, 0, 2 * Math.PI, true
    );
		ctx.stroke();
	}
}

export default Particle;