document.addEventListener("DOMContentLoaded", () => {
  const statNumbers = document.querySelectorAll(".stat-number");
  let animated = false;

  function startCounter() {
    statNumbers.forEach((num) => {
      const target = +num.getAttribute("data-target");
      const format = num.getAttribute("data-format");
      const speed = 200; // سرعت انیمیشن

      let count = 0;
      const inc = target / speed;

      const updateCount = () => {
        count += inc;
        if (count < target) {
          let formattedVal = Math.ceil(count);
          if (format === "dot") {
            formattedVal = formattedVal
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          }
          num.innerText = "+" + formattedVal;
          setTimeout(updateCount, 12);
        } else {
          let finalVal = target;
          if (format === "dot") {
            finalVal = target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          }
          num.innerText = "+" + finalVal;
        }
      };

      updateCount();
    });
  }

  // شروع انیمیشن با اسکرول به این بخش
  window.addEventListener("scroll", () => {
    const section = document.querySelector(".stats-section");
    if (!section) return;

    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      startCounter();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".option");
  const dots = document.querySelectorAll(".options-dots .dot");

  function setActiveOption(index) {
    options.forEach((opt) => opt.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    if (options[index]) options[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
  }

  options.forEach((option, index) => {
    option.addEventListener("click", () => setActiveOption(index));
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => setActiveOption(index));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const interBubble = document.querySelector(".interactive");
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    if (interBubble) {
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    requestAnimationFrame(move);
  }

  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });

  move();
});

// ---- حباب موس (آبی برند) فقط موقع موو کردن ----
document.addEventListener("DOMContentLoaded", () => {
  const interBubble = document.querySelector(".site-bg .interactive");
  let curX = 0,
    curY = 0,
    tgX = 0,
    tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(move);
  }

  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
    interBubble.classList.add("visible");
  });

  move();
});

// ---- حباب موس (آبی برند) فقط موقع موو کردن ----
document.addEventListener("DOMContentLoaded", () => {
  const interBubble = document.querySelector(".site-bg .interactive");
  let curX = 0,
    curY = 0,
    tgX = 0,
    tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(move);
  }

  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
    interBubble.classList.add("visible");
  });

  move();
});

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