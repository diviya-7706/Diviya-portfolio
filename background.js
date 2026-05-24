function drawBackground() {
  ctx.clearRect(0, 0, W, H);

  // Draw glowing orbs
  orbs.forEach((orb) => {
    const grd = ctx.createRadialGradient(
      orb.x * W, orb.y * H, 0,
      orb.x * W, orb.y * H, orb.r
    );
    grd.addColorStop(0, orb.color);
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(orb.x * W, orb.y * H, orb.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = 'rgba(124,58,237,0.06)';
  const gridSpacing = 48;
  for (let gx = 0; gx < W; gx += gridSpacing) {
    for (let gy = 0; gy < H; gy += gridSpacing) {
      ctx.beginPath();
      ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  particles.forEach((p) => {
    p.twinkle += 0.015;
    const opacity = p.alpha * (0.5 + 0.5 * Math.sin(p.twinkle));

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(196,181,253,${opacity})`;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 90)})`;
        ctx.lineWidth   = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawBackground);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});
resizeCanvas();
initParticles();
drawBackground();

const navToggle    = document.getElementById('navToggle');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerClose  = document.getElementById('drawerClose');

navToggle.addEventListener('click',  () => mobileDrawer.classList.add('open'));
drawerClose.addEventListener('click', () => mobileDrawer.classList.remove('open'));

document.querySelectorAll('.drawer-link').forEach((link) => {
  link.addEventListener('click', () => mobileDrawer.classList.remove('open'));
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 60);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
  revealObserver.observe(el);
});


document.querySelectorAll('.skill-card, .project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform  = `translateY(-6px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform 0.35s ease';
  });
});
