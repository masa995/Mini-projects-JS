const animation = new AnimationDots();

if (animation.isTouchDevice()) {
  animation.canvas.addEventListener('touchmove', (e) => {
    animation.setPos(e);
  });
  window.addEventListener('touchstart', (e) => {
    animation.setPos(e);
    if (animation.mouse.down) {
      animation.isDown();
    }
  });
  window.addEventListener('click', (e) => {
    animation.setPos(e);
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