class Dot {
  constructor(ctx, config, mouse, r) {
    this.ctx = ctx;
    this.config = config;
    this.mouse = mouse;
    this.pos = {
      x: this.mouse.x,
      y: this.mouse.y
    }
    this.vel = {
      x: 0,
      y: 0
    }

    this.rad = r || this.random(this.config.dotMinRad, this.config.dotMaxRad);
    this.mass = this.rad * this.config.massFactor;
    this.color = this.config.defColor;

    this.TWO_PI = 2 * Math.PI;
  }

  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw(x, y) {
    this.pos.x = x || this.pos.x + this.vel.x;
    this.pos.y = y || this.pos.y + this.vel.y;

    this.createCircle(this.pos.x, this.pos.y, this.rad, true, this.color);
    this.createCircle(this.pos.x, this.pos.y, this.rad, false, this.color);
  }

  createCircle(x, y, rad, fill, color) {
    this.ctx.fillStyle = this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, rad, 0, this.TWO_PI);
    this.ctx.closePath();
    fill ? this.ctx.fill() : this.ctx.stroke();
  }
}

class AnimationDots {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.w;
    this.h;
    this.mouse = {
      x: this.w / 2,
      y: this.h / 2,
      down: false
    }
    this.dots = [];

    this.config = {
      dotMinRad: 6,
      dotMaxRad: 20,
      massFactor: 0.003,
      defColor: 'rgba(250, 10, 30, 0.9)',
      smooth: 0.85,
      sphereRad: innerHeight > innerWidth ? innerWidth - 100 : innerHeight - 100,
      bigDotRad: 35,
      mouseSize: 100 //расстояние от курсора до частиц
    }

    this.init();
    this.loop = this.loop.bind(this);
    this.loop();
  }

  updateDots() {
    //вычесляем притяжения
    for (let i = 1; i < this.dots.length; i++) {
      let acc = { //ускорение
        x: 0,
        y: 0
      }

      for (let j = 0; j < this.dots.length; j++) {
        if (i === j) continue; // ускорение частицы самой к себе не нужно
        let [a, b] = [this.dots[i], this.dots[j]]
        //a частица ускорение, которой мы высчитываем
        //b соседняя частица

        let delta = {
          x: b.pos.x - a.pos.x,
          y: b.pos.y - a.pos.y
        }
        let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y) || 1; //растояние от a до b
        let force = (dist - this.config.sphereRad) / dist * b.mass; //сила притяжения

        if (j == 0) {
          dist < this.config.mouseSize ? force = (dist - this.config.mouseSize) * b.mass : force = 0;

          let alpha = this.config.mouseSize / dist;
          a.color = `rgba(250, 10, 30, ${alpha})`;
        }

        acc.x += delta.x * force;
        acc.y += delta.y * force;
      }

      this.dots[i].vel.x = this.dots[i].vel.x * this.config.smooth + acc.x * this.dots[i].mass;
      this.dots[i].vel.y = this.dots[i].vel.y * this.config.smooth + acc.y * this.dots[i].mass;
    }

    this.dots.map(e => e === this.dots[0] ? e.draw(this.mouse.x, this.mouse.y) : e.draw());
  }

  init() {
    this.w = this.canvas.width = innerWidth;
    this.h = this.canvas.height = innerHeight;

    this.dots.push(new Dot(this.ctx, this.config, this.mouse, this.config.bigDotRad))
  }

  loop() {
    this.ctx.clearRect(0, 0, this.w, this.h);

    if (this.mouse.down) {
      this.dots.push(new Dot(this.ctx, this.config, this.mouse));
    }
    this.updateDots();


    window.requestAnimationFrame(this.loop);
  }

  isTouchDevice() {
    return typeof window.ontouchstart !== 'undefined';
  }

  setPos(e) {
    if (this.isTouchDevice()) {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    } else {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }
  }

  isDown() {
    this.mouse.down = !this.mouse.down;
  }
}

const animation = new AnimationDots();

if (animation.isTouchDevice()) {
  animation.canvas.addEventListener('touchmove', (e) => {
    animation.setPos(e);
  });
  window.addEventListener('touchstart', (e) => {
    animation.setPos(e);
  });
  window.addEventListener('touchend', () => {
    if (animation.mouse.down) {
      animation.isDown();
    }
  });
  window.addEventListener('click', () => {
    if (!animation.mouse.down) {
      animation.isDown();
    }
  });

} else {
  animation.canvas.addEventListener('mousemove', (e) => {
    animation.setPos(e);
  });
  window.addEventListener('mousedown', () => {
    animation.isDown();
  });
  window.addEventListener('mouseup', () => {
    animation.isDown();
  });
}

function isTouchDevice(e) {
  return typeof window.ontouchstart !== 'undefined';
}