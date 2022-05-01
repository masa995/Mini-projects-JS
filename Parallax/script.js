(() => {

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  let cw;
  let ch;
  let cx; //центр x
  let cy; //центр y
  let ph; //часть высоты
  let pw; //часть ширины
  let mx = 0; //координаты мыши x
  let my = 0; // координаты мыши y

  const config = {
    orbsCount: 400,
    minVelocity: 0.5,
    ringsCount: 7
  }

  canvas.addEventListener('mousemove', (e) => {
    mx = e.clientX - canvas.getBoundingClientRect().left;
    my = e.clientY - canvas.getBoundingClientRect().top;
  });

  function resize() {
    cw = canvas.width = innerWidth;
    ch = canvas.height = innerHeight;
    cx = cw * 0.5;
    cy = ch * 0.5;
    ph = cy * 0.4;
    pw = cx * 0.4;
  }

  resize();

  window.addEventListener('resize', resize);

  class Orb {
    constructor() {
      this.size = Math.random() * 7 + 1;
      this.angle = Math.random() * 360; //градусы
      this.radius = (Math.floor(Math.random() * config.ringsCount)) * ph / config.ringsCount;
      this.impact = this.radius / ph; //св-во которое будет изменять размер взависимости от приближение объекта (изменяется от 0 до 1 взависимости от того как близко частица к центру)
      this.velocity = config.minVelocity + Math.random() * config.minVelocity + this.impact;
    }

    refresh() {
      let radian = this.angle * Math.PI / 180; //преобразование в радианы
      let cos = Math.cos(radian);
      let sin = Math.sin(radian);

      let offsetX = cos * pw * this.impact;
      let offsetY = sin * pw * this.impact;

      let paralaxX = mx / cw * 2 - 1;
      let paralaxY = my / ch;

      let x = cx + cos * (ph + this.radius) + offsetX; //+ offsetX растянуть
      let y = cy + sin * (ph + this.radius) - offsetY * paralaxY - offsetX * paralaxX; //- offsetY сплюснуть

      let distToC = Math.hypot(x - cx, y - cy); //дистанция до центра canvas
      let distToM = Math.hypot(x - mx, y - my); //дистанция до курсора

      let optic = sin * this.size * this.impact * 0.7;
      let mEffect = distToM <= 50 ? (1 - distToM / 50) * 25 : 0; //изменение пазмера частицы взависимости от близости курсора

      let size = this.size + optic + mEffect;


      let h = this.angle; //тон - пинимает значение (0 - 360 )
      let s = 100;        //насыщеность
      let l = (1 - Math.sin(this.impact * Math.PI)) * 90 + 30;        //яркость
      let color = `hsl(${h}, ${s}%, ${l}%)`



      if (distToC > ph - 1 || sin > 0) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
      }


      this.angle = (this.angle + this.velocity) % 360;
    }
  }

  let orbsList = [];
  function createStardust() {
    for (let i = 0; i < config.orbsCount; i++) {
      orbsList.push(new Orb());
    }
  }

  createStardust();

  function loop() {
    requestAnimationFrame(loop);
    ctx.globalCompositeOperation = 'normal'; //режим наложения
    ctx.clearRect(0, 0, cw, ch);

    ctx.globalCompositeOperation = 'lighter'; //режим наложение, который при наложение цветов делает цвета светлее
    orbsList.map(el => el.refresh())
  }
  loop()

})();