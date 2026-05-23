
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
  ringX += (mouseX - ringX) * 0.13;
  ringY += (mouseY - ringY) * 0.13;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();


document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .cert-card').forEach((el) => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H;

let particles = [];
const PARTICLE_COUNT = 120;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

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


const TERMINAL_COMMANDS = {

  root: [
    '<accent>Available commands:</accent>',
    '  <info>about</info>    → Who I am',
    '  <info>skills</info>   → My technical skills',
    '  <info>projects</info> → Things I have built',
    '  <info>certs</info>    → My certifications',
    '  <info>contact</info>  → How to reach me',
    '  <info>education</info>→ My academic background',
    '  <info>goal</info>     → My career goal',
    '  <info>fun</info>      → A fun fact about me',
    '  <info>clear</info>    → Clear the terminal',
    '  <info>root</info>     → Show this list',
  ],

  about: [
    '<accent>About Diviya Dharshini S</accent>',
    '<muted>───────────────────────────────</muted>',
    '👩‍💻 B.Tech Information Technology student',
    '🏛  Vel Tech High Tech Engineering College',
    '📅  2023 – 2027  |  CGPA: <success>8.3 / 10</success>',
    '📍  Chennai, Tamil Nadu, India',
    '',
    'Passionate about Data Analytics,',
    'Web Development & building cool things.',
  ],

  skills: [
    '<accent>Technical Skills</accent>',
    '<muted>───────────────────────────────</muted>',
    '💻 <info>Programming</info>  → Python, Java, SQL',
    '🌐 <info>Web</info>         → HTML, CSS',
    '🛠  <info>Tools</info>       → VS Code, Excel, Git',
    '📊 <info>Focus Areas</info> → Data Analytics,',
    '                   Web Development, ML Basics',
  ],

  projects: [
    '<accent>Projects</accent>',
    '<muted>───────────────────────────────</muted>',
    '🧠 <info>Bayesian Optimization</info>',
    '   Optimized ML model hyperparameters',
    '   using Bayesian techniques.',
    '   Stack: <success>Python, Machine Learning</success>',
  ],

  certs: [
    '<accent>Certifications</accent>',
    '<muted>───────────────────────────────</muted>',
    '🛡  <info>Cybersecurity Analyst Virtual Simulation</info>',
    '   Issued by: <success>Forage</success>',
    '   Threat detection, incident response,',
    '   and security reporting tasks.',
  ],

  contact: [
    '<accent>Contact Me</accent>',
    '<muted>───────────────────────────────</muted>',
    '✉  <info>Email</info>    → diviyadharshinisasikumar@gmail.com',
    '🔗 <info>LinkedIn</info> → linkedin.com/in/diviyadharshini7706',
    '',
    '<muted>Or scroll down to the contact form!</muted>',
  ],

  education: [
    '<accent>Education</accent>',
    '<muted>───────────────────────────────</muted>',
    '🎓 B.Tech – Information Technology',
    '   Vel Tech High Tech Engineering College',
    '   <success>CGPA: 8.3 / 10</success>  |  2023 – 2027',
    '',
    '💼 Web Development Intern',
    '   Inetz Technologies  |  June 2025',
  ],

  goal: [
    '<accent>Career Goal</accent>',
    '<muted>───────────────────────────────</muted>',
    '🎯 Seeking an entry-level opportunity',
    '   in Data Analytics or Web Development',
    '   to apply my skills and grow in a',
    '   dynamic, collaborative environment.',
  ],

  fun: [
    '<accent>Fun Fact 🎉</accent>',
    '<muted>───────────────────────────────</muted>',
    '⚡ I built my own portfolio website',
    '   from scratch using HTML, CSS & JS!',
    '',
    '🔐 I completed a real-world Web Development',
    '   simulation before finishing 2nd year!',
    '',
    'Always Passionate about learning and building cool things!',
  ],

  clear: [], 
};

const terminalBody  = document.getElementById('terminalBody');
const terminalInput = document.getElementById('terminalInput');
const commandHistory = [];
let historyIndex = -1;

function parseColors(text) {
  return text
    .replace(/<accent>(.*?)<\/accent>/g,   '<span class="t-highlight">$1</span>')
    .replace(/<success>(.*?)<\/success>/g, '<span class="t-success">$1</span>')
    .replace(/<info>(.*?)<\/info>/g,       '<span class="t-info">$1</span>')
    .replace(/<muted>(.*?)<\/muted>/g,     '<span style="color:var(--muted)">$1</span>');
}


function addLine(html, delay = 0) {
  setTimeout(() => {
    const div = document.createElement('div');
    div.className = 't-line';
    div.innerHTML = html;
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }, delay);
}

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  
  commandHistory.unshift(cmd);
  historyIndex = -1;

  addLine(`<span class="t-dollar">$</span> <span class="t-cmd">${raw}</span>`);

  if (cmd === 'clear') {
    setTimeout(() => { terminalBody.innerHTML = ''; }, 80);
    return;
  }

  const output = TERMINAL_COMMANDS[cmd];

  if (output === undefined) {
   
    addLine(`<span class="t-error">Command not found: '${cmd}'</span>`, 80);
    addLine(`<span class="t-muted">Type <span class="t-highlight">'help'</span> for available commands.</span>`, 140);
  } else {
   
    output.forEach((line, i) => {
      const html = line === ''
        ? '&nbsp;'
        : parseColors(line);
      addLine(html, 60 + i * 45);
    });
  }

  addLine('&nbsp;', 60 + (output ? output.length * 45 : 0) + 30);
}

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = terminalInput.value;
    terminalInput.value = '';
    runCommand(val);
  }

  if (e.key === 'ArrowUp') {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    }
    e.preventDefault();
  }

  if (e.key === 'ArrowDown') {
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = -1;
      terminalInput.value = '';
    }
    e.preventDefault();
  }
});

terminalBody.addEventListener('click', () => terminalInput.focus());

const terminalSection = document.getElementById('terminal');
if (terminalSection) {
  const termFocusObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) terminalInput.focus();
  }, { threshold: 0.5 });
  termFocusObserver.observe(terminalSection);
}

const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('form-status');
const btnText     = document.getElementById('btnText');
const btnIcon     = document.getElementById('btnIcon');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  btnText.textContent = 'Sending...';
  btnIcon.textContent = '⏳';
  formStatus.innerHTML = '';

  try {
    const res = await fetch(contactForm.action, {
      method:  'POST',
      body:    new FormData(contactForm),
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      formStatus.innerHTML = '<span class="status-success">✓ Message sent! I\'ll get back to you soon.</span>';
      contactForm.reset();
      btnText.textContent = 'Message Sent!';
      btnIcon.textContent = '✓';
      setTimeout(() => { btnText.textContent = 'Send Message'; btnIcon.textContent = '✦'; }, 4000);
    } else {
      const json = await res.json();
      formStatus.innerHTML = `<span class="status-error">⚠ ${json.error || 'Something went wrong. Try emailing directly.'}</span>`;
      btnText.textContent = 'Send Message';
      btnIcon.textContent = '✦';
    }
  } catch (err) {
    formStatus.innerHTML = '<span class="status-error">⚠ Network error. Please try again.</span>';
    btnText.textContent = 'Send Message';
    btnIcon.textContent = '✦';
  }
});
