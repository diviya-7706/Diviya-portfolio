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