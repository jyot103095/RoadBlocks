class Particle {
	constructor(posX, posY, velX, velY) {
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
	}

	move() {
		this.posX += this.velX;
		this.posY += this.velY;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.strokeStyle = "#FF0000";
		ctx.arc(
      this.posX, this.posY, 2, 0, 2 * Math.PI, true
    );
		ctx.stroke();
	}
}

export default Particle;