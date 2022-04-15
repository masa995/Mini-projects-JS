(function () {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width = innerWidth;
  const h = canvas.height = innerHeight;
  let particles = [];
  let properties = {
    bgColor: 'rgba(17, 17, 19, 1)',
    particleColor: 'rgba(255, 40, 40, 1)',
    particleRadius: 2,
    particleCount: 80,
    particleMaxVelocity: 0.5,
    lineLength: 100,
    particleLife: 6
  };

  document.querySelector('body').appendChild(canvas);

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.velosityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity; //от -0.5 до +0.5
      this.velosityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity; //от -0.5 до +0.5
      this.life = Math.random() * particles.particleLife * 60; //60fps
    }

    position() {
      this.x + this.velosityX > w && this.velosityX > 0 || this.x + this.velosityX < 0 && this.velosityX < 0 ? this.velosityX *= -1 : this.velosityX;

      this.x + this.velosityY > h && this.velosityY > 0 || this.x + this.velosityY < 0 && this.velosityY < 0 ? this.velosityY *= -1 : this.velosityY;

      this.x += this.velosityX;
      this.y += this.velosityY;
    }

    reDraw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }

    reCalculateLife() {
      if (this.life < 1) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velosityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity; //от -0.5 до +0.5
        this.velosityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity; //от -0.5 до +0.5
        this.life = Math.random() * particles.particleLife * 60; //60fps
      }

      this.life--;
    }
  }

  function reDrawBackground() {
    ctx.fillStyle = properties.bgColor;
    ctx.fillRect(0, 0, w, h);
  }

  function drawLines() {
    let x1, x2, y, y2, length, opasity;
    for (let i in particles) {
      for (let j in particles) {
        x1 = particles[i].x;
        y1 = particles[i].y;

        x2 = particles[j].x;
        y2 = particles[j].y;

        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        if (length < properties.lineLength) {
          opasity = 1 - length / properties.lineLength;
          ctx.lineWidth = '0.5';
          ctx.strokeStyle = `rgba(255, 40, 40, ${opasity})`;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  function reDrawParticles() {
    for (let i in particles) {
      particles[i].reCalculateLife();
      particles[i].position();
      particles[i].reDraw();
    }
  }

  function loop() {
    reDrawBackground();
    reDrawParticles();
    drawLines();
    requestAnimationFrame(loop);
  }

  function init() {
    for (let i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle);
    }

    loop();
  }

  init();

}())