document.addEventListener("DOMContentLoaded", () => {

  
  const mask = document.getElementById('mask');
  const world = document.getElementById('world');
  const photos = document.querySelectorAll('.photo-container');
  const glowCircles = document.querySelectorAll('.glow-circle');
  
  let mouseX = 0, mouseY = 0;
  let worldX = 0, worldY = 0;
  let velocityX = 0, velocityY = 0;
  let targetX = 0, targetY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  
    // 💡 Двигаем фоновое свечение чуть-чуть в сторону курсора
    glowCircles.forEach(circle => {
      const rect = circle.parentElement.getBoundingClientRect();
      const dx = (mouseX - (rect.left + rect.width / 2)) * 0.02;
      const dy = (mouseY - (rect.top + rect.height / 2)) * 0.02;
      circle.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  });
  
  // 👁️ Плавное проявление фото
  window.addEventListener('load', () => {
    photos.forEach(photo => {
      setTimeout(() => {
        photo.classList.add('loaded');
      }, Math.random() * 600);
    });
  });
  
  function animate() {
    const edgeThreshold = 150;
    const acceleration = 0.9;  
    const friction = 0.1;  
     
    if (window.Width < 450) {
      edgeThreshold = 20;      // курсор ближе к краю — слабее влияет
      acceleration = 0.35;     // ускорение плавнее
      friction = 0.95;        // инерция дольше
    }
  
    let moveX = 0, moveY = 0;
  
    if (mouseX < edgeThreshold) moveX = 1;
    else if (mouseX > window.innerWidth - edgeThreshold) moveX = -1;
  
    if (mouseY < edgeThreshold) moveY = 1;
    else if (mouseY > window.innerHeight - edgeThreshold) moveY = -1;
  
    velocityX += moveX * acceleration;
    velocityY += moveY * acceleration;
  
    velocityX *= (1 - friction);
    velocityY *= (1 - friction);
  
    targetX += velocityX;
    targetY += velocityY;
  
    targetX = Math.min(window.innerWidth / 2, Math.max(-2 * window.innerWidth, targetX));
targetY = Math.min(window.innerHeight / 2, Math.max(-2 * window.innerHeight, targetY));

  
    worldX += (targetX - worldX) * 0.05;  
    worldY += (targetY - worldY) * 0.05;

  
    world.style.transform = `translate(${worldX}px, ${worldY}px)`;
  
    requestAnimationFrame(animate);
  }
  
  animate();
  
});