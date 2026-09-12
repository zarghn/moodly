document.addEventListener("DOMContentLoaded", () => {
  // ---- شمارنده آمار ----
  const statNumbers = document.querySelectorAll(".stat-number");
  let animated = false;

  function startCounter() {
    statNumbers.forEach((num) => {
      const target = +num.getAttribute("data-target");
      const format = num.getAttribute("data-format");
      const speed = 200;

      let count = 0;
      const inc = target / speed;

      const updateCount = () => {
        count += inc;
        if (count < target) {
          let val = Math.ceil(count);
          if (format === "dot") {
            val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          }
          num.innerText = "+" + val;
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

  window.addEventListener("scroll", () => {
    if (statNumbers.length === 0) return;
    const section = statNumbers[0].closest("section");
    if (!section) return;

    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      startCounter();
    }
  });

  // ---- گالری سازها ----
  const galleryItems = document.querySelectorAll(".gallery-item");
  const paginationDots = document.querySelectorAll(".pagination-dot");

  function setActiveGalleryItem(index) {
    galleryItems.forEach((item) => item.classList.remove("active"));
    paginationDots.forEach((dot) => dot.classList.remove("active"));
    if (galleryItems[index]) galleryItems[index].classList.add("active");
    if (paginationDots[index]) paginationDots[index].classList.add("active");
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => setActiveGalleryItem(index));
  });

  paginationDots.forEach((dot, index) => {
    dot.addEventListener("click", () => setActiveGalleryItem(index));
  });

  // ---- آکاردئون ژانرها ----
  const options = document.querySelectorAll(".option");
  const optionDots = document.querySelectorAll(".options-dot");

  function setActiveOption(index) {
    options.forEach((opt) => opt.classList.remove("active"));
    optionDots.forEach((dot) => dot.classList.remove("active"));
    if (options[index]) options[index].classList.add("active");
    if (optionDots[index]) optionDots[index].classList.add("active");
  }

  options.forEach((option, index) => {
    option.addEventListener("click", () => setActiveOption(index));
  });

  optionDots.forEach((dot, index) => {
    dot.addEventListener("click", () => setActiveOption(index));
  });

  // ---- حباب آبی که دنبال موس میاد ----
  const interBubble = document.querySelector(".site-bg .interactive");
  const heroBubble = document.querySelector(".hero-interactive");
  let curX = 0,
    curY = 0,
    tgX = 0,
    tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    const transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    if (interBubble) interBubble.style.transform = transform;
    if (heroBubble) heroBubble.style.transform = transform;
    requestAnimationFrame(move);
  }

  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
    if (interBubble) interBubble.classList.add("visible");
    if (heroBubble) heroBubble.classList.add("visible");
  });

  move();

  // ---- نویز خاکستری روی کل پس‌زمینه ----
  (function () {
    const canvas = document.getElementById("site-noise");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

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
    window.addEventListener("resize", resize);
    setInterval(drawNoise, 65);
  })();

  // ---- نویز مخصوص عکس هدر ----
  (function () {
    const canvas = document.getElementById("hero-noise");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const wrapper = canvas.parentElement;

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
    window.addEventListener("resize", resize);
    setInterval(drawNoise, 65);
  })();
});
