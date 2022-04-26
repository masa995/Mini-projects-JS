class Particle {
  constructor(w, h, ctx, options, particles) {
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.options = options;
    this.particles = particles;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.velosityX = Math.random() * (this.options.particleMaxVelocity * 2) - this.options.particleMaxVelocity; //от -0.5 до +0.5
    this.velosityY = Math.random() * (this.options.particleMaxVelocity * 2) - this.options.particleMaxVelocity; //от -0.5 до +0.5
    this.life = Math.random() * this.particles.particleLife * 60; //60fps
  }

  position() {
    this.x + this.velosityX > this.w && this.velosityX > 0 || this.x + this.velosityX < 0 && this.velosityX < 0 ? this.velosityX *= -1 : this.velosityX;

    this.y + this.velosityY > this.h && this.velosityY > 0 || this.y + this.velosityY < 0 && this.velosityY < 0 ? this.velosityY *= -1 : this.velosityY;

    this.x += this.velosityX;
    this.y += this.velosityY;
  }

  reDraw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.options.particleRadius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = this.options.particleColor;
    this.ctx.fill();
    this.ctx.shadowColor = 'rgba(166, 206, 239, 1)';
    this.ctx.shadowBlur = 15;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
  }

  reCalculateLife() {
    if (this.life < 1) {
      this.x = Math.random() * this.w;
      this.y = Math.random() * this.h;
      this.velosityX = Math.random() * (this.options.particleMaxVelocity * 2) - this.options.particleMaxVelocity; //от -0.7 до +0.7
      this.velosityY = Math.random() * (this.options.particleMaxVelocity * 2) - this.options.particleMaxVelocity; //от -0.7 до +0.7
      this.life = Math.random() * this.particles.particleLife * 60; //60fps
    }

    this.life--;
  }
}

class AnimationParticles {
  constructor(options) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.w = this.canvas.width = innerWidth;
    this.h = this.canvas.height = innerHeight;
    this.rgbColor = options.particleColor;
    this.particles = [];
    this.properties = {
      bgColor: 'rgba(17, 17, 19, 1)',
      particleColor: `rgba(${this.rgbColor}, 1)`,
      particleRadius: 2,
      particleCount: options.particleCount,
      particleMaxVelocity: options.particleMaxVelocity,
      lineLength: options.lineLength,
      particleLife: 6
    };

    this.init();
    this.loop = this.loop.bind(this);
    this.loop();
  }

  reDrawBackground() {
    this.ctx.fillStyle = this.properties.bgColor;
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  drawLines() {
    let x1, x2, y1, y2, length, opasity;
    for (let i in this.particles) {
      for (let j in this.particles) {
        x1 = this.particles[i].x;
        y1 = this.particles[i].y;

        x2 = this.particles[j].x;
        y2 = this.particles[j].y;

        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        if (length < this.properties.lineLength) {
          opasity = 1 - length / this.properties.lineLength;
          this.ctx.lineWidth = '0.7';
          this.ctx.strokeStyle = `rgba(${this.rgbColor}, ${opasity})`;
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }
    }
  }

  reDrawParticles() {
    for (let i in this.particles) {
      this.particles[i].reCalculateLife();
      this.particles[i].position();
      this.particles[i].reDraw();
    }
  }

  loop() {
    let fps = 300;
    let startTime = 0;
    let currentTime = 0;
    let time = 0;
    let currentSecond = 0

    this.ctx.clearRect(0, 0, this.w, this.h);

    if (this.startTime === 0) {
      startTime = new Date().getTime();
    }

    currentTime = new Date().getTime();
    time = currentTime - startTime;
    currentSecond = Math.floor(time / fps);

    if (currentSecond > 0) {
      startTime = 0;

      this.reDrawBackground();
      this.reDrawParticles();
      this.drawLines();
    }
    requestAnimationFrame(this.loop);
  }

  init() {
    document.querySelector('body').appendChild(this.canvas);

    for (let i = 0; i < this.properties.particleCount; i++) {
      this.particles.push(new Particle(this.w, this.h, this.ctx, this.properties, this.particles));
    }
  }
}