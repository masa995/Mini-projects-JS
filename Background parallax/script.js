'use strict'

//Ждем загрузку контента
window.onload = function () {
  const parallax = document.querySelector('.parallax');

  if (parallax) {
    const content = document.querySelector('.parallax__container');
    const clouds = document.querySelector('.images-parallax__clouds');
    const mountains = document.querySelector('.images-parallax__mountains');
    const human = document.querySelector('.images-parallax__human');

    //Коэффеценты
    const forClouds = 40;
    const forMountains = 30;
    const forHuman = 20;

    //Скорость анимации
    const speed = 0.15;

    //Доп переменные
    let positionX = 0;
    let positionY = 0;
    let coordXprocent = 0;
    let coordYprocent = 0;

    function setMouseParallaxStyle(params) {
      const distX = coordXprocent - positionX;
      const distY = coordYprocent - positionY;

      positionX = positionX + (distX * speed);
      positionX = positionY + (distY * speed);

      //Передаем стили
      //cssText - для задания нескольких стилей. Это свойство редко используется, потому что такое присваивание удаляет все существующие стили: оно не добавляет, а заменяет их.
      clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%)`;
      mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%)`;
      human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%)`;

      requestAnimationFrame(setMouseParallaxStyle);
    }

    setMouseParallaxStyle();

    parallax.addEventListener('mousemove', (e) => {
      //Получаем ширины и высоты блока
      const parallaxWidth = parallax.offsetWidth;
      const parallaxHeight = parallax.offsetHeight;

      //Ноль по середине
      const coordX = e.pageX - parallaxWidth / 2;
      const coordY = e.pageX - parallaxHeight / 2;

      //Получаем проценты
      coordXprocent = coordX / parallaxWidth * 100;
      coordYprocent = coordY / parallaxHeight * 100;
    });

    //Parallax при скролле

    let thresholdSets = [];
    for (let i = 0; i <= 1.0; i += 0.005) {
      thresholdSets.push(i);
    }

    const callback = function (entries, observer) {
      const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
      setParallaxItemsStyle(scrollTopProcent);
    }

    // Intersection Observer API позволяет указать функцию, которая будет вызвана всякий раз для элемента (target) при пересечении его с областью видимости документа (по умолчанию) или заданным элементом (root).
    const observer = new IntersectionObserver(callback, {
      threshold: thresholdSets
    });

    observer.observe(document.querySelector('.content'));

    function setParallaxItemsStyle(scrollTopProcent) {
      content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%)`;
      mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%)`;
      human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%)`;
    }
  }
}