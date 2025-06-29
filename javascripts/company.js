document.addEventListener("DOMContentLoaded", () => {
  const textContainer = document.getElementById('text');
  const photos = document.querySelectorAll('.photo');
  
  let scrollPos = 0;

  function update() {
    textContainer.scrollTop = scrollPos;

    // Parallax для фото
    const photoDepths = [1.3, 0.35, 0.80, 1, 0.30, 0.56,0.33,0.43,0.83 ]
    photos.forEach((photo, i) => {
      const depth = photoDepths[i] || 0.7; // если фото больше, чем глубин — применится значение по умолчанию
      const offsetY = scrollPos * depth;
    
      photo.style.transform = `translateY(${-offsetY}px)`;
    });
  }

  // Расширяем диапазон скролла beyond текста
  const extendedScrollHeight = 2000; // дополнительная "длина" скролла после текста

  window.addEventListener('wheel', (e) => {
    const maxScroll = textContainer.scrollHeight - textContainer.clientHeight + extendedScrollHeight;
    scrollPos += e.deltaY;
    scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));
    update();
  });

  // начальный вызов
  update();
});
