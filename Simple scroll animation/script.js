const skewedOne = document.querySelector('.section__skewed-one');
const skewedTwo = document.querySelector('.section__skewed-two');

window.addEventListener('scroll', () => {
  //(45 и -45 более плавной анимации)
  const value1 = -15 + window.scrollY / 45;
  const value2 = 15 + window.scrollY / -45;
  skewedOne.style.transform = `skewY(${value1}deg)`;
  skewedTwo.style.transform = `skewY(${value2}deg)`;
})

