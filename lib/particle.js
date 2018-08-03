class Particle {
	constructor(posX, posY, velX, velY) {
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.alpha = 1;
	}

	move() {
		this.posX += this.velX;
		this.posY += this.velY;
		this.alpha -= 0.05;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.strokeStyle = `rgba(255, 0, 0, ${this.alpha}`;
		ctx.arc(
      this.posX, this.posY, 5, 0, 2 * Math.PI, true
    );
		ctx.stroke();
	}
}

export default Particle;