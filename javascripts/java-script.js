document.addEventListener("DOMContentLoaded", () => {
    const images = [
      { selector: '.imgc1', speed: 0.05, sensitivity: 0.15 },
      { selector: '.imgc2', speed: 0.15, sensitivity: 0.025 },
      { selector: '.imgc3', speed: 0.09, sensitivity: 0.045 },
      { selector: '.imgc4', speed: 0.12, sensitivity: 0.12 },
      { selector: '.imgc5', speed: 0.17, sensitivity: 0.23 },
      { selector: '.imgc6', speed: 0.09, sensitivity: 0.055 },
      { selector: '.imgc7', speed: 0.06, sensitivity: 0.36 },
      { selector: '.imgc8', speed: 0.13, sensitivity: 0.025 }
    ];
  
    let mouseX = 0;
    let mouseY = 0;
  
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
    });
  
    images.forEach((img) => {
      const el = document.querySelector(img.selector);
      if (!el) return;
  
      // 🎲 Случайное начальное положение ±100px
      const baseX = (Math.random() - 0.5) * 200;
      const baseY = (Math.random() - 0.5) * 200;
  
      let offsetX = baseX;
      let offsetY = baseY;
  
      function animate() {
        const targetX = baseX + mouseX * img.sensitivity;
        const targetY = baseY + mouseY * img.sensitivity;
  
        offsetX += (targetX - offsetX) * img.speed;
        offsetY += (targetY - offsetY) * img.speed;
  
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  
        requestAnimationFrame(animate);
      }
  
      animate();
    });
    const body = document.body;

  let t = 0;

  function animateBodyShadow() {
    t += 0.03;

    // Пульсация blur (размытие) и spread (расширение)
    const blur = 40 + Math.sin(t) * 25;        
    const spread = 10 + Math.cos(t * 1.5) * 1; 

    let frame_shadow = document.querySelector(".frame_shadow");
    // Постоянный центр, без смещения (X=0, Y=0)
    frame_shadow.style.boxShadow = `0px 0px ${blur}px ${spread}px #627CFF inset`;

    requestAnimationFrame(animateBodyShadow);
  }

  animateBodyShadow();

});