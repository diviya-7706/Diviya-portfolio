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