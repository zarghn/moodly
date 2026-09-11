// ---- حباب موس (آبی برند) فقط موقع موو کردن ----
document.addEventListener('DOMContentLoaded', () => {
  const interBubble = document.querySelector('.site-bg .interactive');
  const heroBubble = document.querySelector('.hero-interactive');
  let curX = 0, curY = 0, tgX = 0, tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    const transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    interBubble.style.transform = transform;
    if (heroBubble) heroBubble.style.transform = transform;
    requestAnimationFrame(move);
  }

  window.addEventListener('mousemove', (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
    interBubble.classList.add('visible');
    if (heroBubble) heroBubble.classList.add('visible');
  });

  move();
});

// ---- افکت نویز خاکستری ریز (grain) روی کل پس‌زمینه ----
(function () {
  const canvas = document.getElementById('site-noise');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawNoise() {
    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.createImageData(w, h);
    const buffer = imageData.data;

    for (let i = 0; i < buffer.length; i += 4) {
      const shade = Math.floor(Math.random() * 255);
      buffer[i] = shade;
      buffer[i + 1] = shade;
      buffer[i + 2] = shade;
      buffer[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  resize();
  window.addEventListener('resize', resize);

  // ~15 بار در ثانیه، نه هر فریم، تا سنگین نشه
  setInterval(drawNoise, 65);
})();

// ---- افکت نویز مخصوص هدر (روی عکس هیرو) ----
(function () {
  const canvas = document.getElementById('hero-noise');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const wrapper = canvas.parentElement; // .hero-section

  function resize() {
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
  }

  function drawNoise() {
    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.createImageData(w, h);
    const buffer = imageData.data;

    for (let i = 0; i < buffer.length; i += 4) {
      const shade = Math.floor(Math.random() * 255);
      buffer[i] = shade;
      buffer[i + 1] = shade;
      buffer[i + 2] = shade;
      buffer[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(drawNoise, 65);
})();