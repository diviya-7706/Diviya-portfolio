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