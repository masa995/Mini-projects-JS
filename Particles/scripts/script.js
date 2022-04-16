if (window.matchMedia('(max-width: 500px)').matches) {
  new AnimationParticles({
    particleColor: '243, 229, 81',
    particleCount: 70,
    particleMaxVelocity: 0.7,
    lineLength: 100
  });
} else if (window.matchMedia('(max-width: 1000px)').matches) {
  new AnimationParticles({
    particleColor: '146, 81, 243',
    particleCount: 90,
    particleMaxVelocity: 0.8,
    lineLength: 130
  });
} else {
  new AnimationParticles({
    particleColor: '73, 170, 197',
    particleCount: 100,
    particleMaxVelocity: 1,
    lineLength: 170
  });
}