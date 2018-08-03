import Particle from './particle';

class Break {
	constructor(posX, posY) {
		this.posX = posX;
		this.posY = posY;
		this.particles = this.generateParticles();
	}

	generateParticles() {
		let particles = [];
		
		for (let i = 0; i < 10; i++) {
			let randX = (Math.random() * 10) - (Math.random() * 10);
			let randY = (Math.random() * 10) - (Math.random() * 10);
			particles.push(new Particle(this.posX, this.posY, randX, randY));
		}

		return particles;
	}

	move() {
		this.particles.forEach((particle, idx) => {
			particle.move();
			if (particle.alpha <= 0) {
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