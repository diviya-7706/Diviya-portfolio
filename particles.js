function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x:      Math.random() * W,
      y:      Math.random() * H,
      r:      Math.random() * 1.6 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      alpha:  Math.random() * 0.5 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
    });
  }
}

const orbs = [
  { x: 0.15, y: 0.2,  r: 320, color: 'rgba(124,58,237,0.07)'  },
  { x: 0.85, y: 0.55, r: 280, color: 'rgba(196,181,253,0.05)' },
  { x: 0.5,  y: 0.85, r: 250, color: 'rgba(124,58,237,0.05)'  },
];
