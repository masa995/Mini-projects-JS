if (window.matchMedia('(max-width: 500px)').matches) {
  new AnimationParticles({
    particleColor: '243, 229, 81',
    particleCount: 50,
    particleMaxVelocity: 3,
    lineLength: 100
  });
} else if (window.matchMedia('(max-width: 1000px)').matches) {
  new AnimationParticles({
    particleColor: '146, 81, 243',
    particleCount: 75,
    particleMaxVelocity: 3,
    lineLength: 130
  });
} else {
  new AnimationParticles({
    particleColor: '73, 170, 197',
    particleCount: 100,
    particleMaxVelocity: 2,
    lineLength: 170
  });
}