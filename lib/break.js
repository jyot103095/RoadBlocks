import Particle from './particle';

class Break {
	constructor(posX, posY) {
		this.posX = posX;
		this.posY = posY;
		this.particles = this.generateParticles();
	}

	generateParticles() {
		let particles = [];
		particles.push(
			new Particle(this.posX, this.posY, 5, 5),
			new Particle(this.posX, this.posY, -5, 5),
			new Particle(this.posX, this.posY, -5, -5),
			new Particle(this.posX, this.posY, 5, -5)
		);

		return particles;
	}

	move() {
		this.particles.forEach((particle, idx) => {
			particle.move();
			if (particle.posX > 460 || particle.posX < -5) {
				this.particles.splice(idx, 1);
			}
		});
	}

	draw(ctx) {
		this.move();
		this.particles.forEach(particle => particle.draw(ctx));
	}
}

export default Break;