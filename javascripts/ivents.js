document.addEventListener("DOMContentLoaded", () => {
  const collectionText = document.getElementById("collectionText");
  const collectionText2 = document.getElementById("collectionText2");
  const collectionText3 = document.getElementById("collectionText3");

  const ghostedEl = document.querySelector('.img-ghosted');
  const schineEl = document.querySelector('.img-schine');
  const shguchEl = document.querySelector('.img-shguch');

  const ghostedImages = ['Ghosted.png', 'Ghosted2.png', 'Ghosted3.png'];
  const schineImages = ['schine.png', 'schine2.png', 'schine3.png'];
  const shguchImages = ['Shguch.png', 'Shguch2.png', 'Shguch3.png'];

  let currentMode = null;
  let isAnimationActive = false;

  function clearPreviousAnimations() {
    document.querySelectorAll('.trail-image').forEach(el => el.remove());
  }

  function toggleActive(el) {
    [ghostedEl, schineEl, shguchEl].forEach(el => el.classList.remove("active"));
    if (el) el.classList.add("active");
  }

  function showCollectionText(mode) {
    collectionText.style.display = mode === "ghosted" ? "block" : "none";
    collectionText2.style.display = mode === "schine" ? "block" : "none";
    collectionText3.style.display = mode === "shguch" ? "block" : "none";
  }

  function toggleAnimation(mode, el) {
    if (currentMode === mode && isAnimationActive) {
      // Выключение анимации
      currentMode = null;
      isAnimationActive = false;
      clearPreviousAnimations();
      toggleActive(null);
      showCollectionText(null);
    } else {
      // Включение новой анимации
      clearPreviousAnimations();
      currentMode = mode;
      isAnimationActive = true;
      toggleActive(el);
      showCollectionText(currentMode);
    }
  }

  // --- GHOSTED ---
  ghostedEl.addEventListener("click", () => toggleAnimation("ghosted", ghostedEl));
  document.addEventListener("mousemove", (e) => {
    if (currentMode !== "ghosted" || !isAnimationActive) return;
    const img = document.createElement("img");
    img.src = `./img/${randomFrom(ghostedImages)}`;
    img.className = "trail-image";
    img.style.left = `${e.clientX}px`;
    img.style.top = `${e.clientY}px`;
    img.style.width = `${30 + Math.random() * 60}px`;
    img.style.zIndex = "0";
    img.style.position = "fixed";
    img.style.pointerEvents = "none";
    document.body.appendChild(img);
    requestAnimationFrame(() => {
      img.style.opacity = 0.9;
    });
    setTimeout(() => img.remove(), 2000);
  });

  // --- SCHINE ---
  schineEl.addEventListener("click", () => toggleAnimation("schine", schineEl));
  document.addEventListener("mousemove", () => {
    if (currentMode !== "schine" || !isAnimationActive) return;
    const img = document.createElement("img");
    img.src = `./img/${randomFrom(schineImages)}`;
    img.className = "trail-image";
    img.style.position = "fixed";
    img.style.zIndex = "0";
    img.style.pointerEvents = "none";

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.width = `${20 + Math.random() * 50}px`;
    document.body.appendChild(img);

    requestAnimationFrame(() => {
      img.style.opacity = 0.9;
    });

    setTimeout(() => img.remove(), 2000);
  });

  // --- SHGUCH ---
  shguchEl.addEventListener("click", () => toggleAnimation("shguch", shguchEl));
  document.addEventListener("mousemove", (e) => {
    if (currentMode !== "shguch" || !isAnimationActive) return;

    const directions = ["top", "bottom", "left", "right"];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const img = document.createElement("img");

    img.src = `./img/${randomFrom(shguchImages)}`;
    img.className = "trail-image";
    img.style.position = "fixed";
    img.style.opacity = 0.8;
    img.style.zIndex = "0";
    img.style.pointerEvents = "none";

    const size = 50 + Math.random() * 100;
    img.style.width = `${size}px`;

    const targetX = e.clientX + (Math.random() * 200 - 100);
    const targetY = e.clientY + (Math.random() * 200 - 100);

    switch (direction) {
      case "top":
        img.style.left = `${targetX}px`;
        img.style.top = `-120px`;
        break;
      case "bottom":
        img.style.left = `${targetX}px`;
        img.style.top = `${window.innerHeight + 120}px`;
        break;
      case "left":
        img.style.left = `-120px`;
        img.style.top = `${targetY}px`;
        break;
      case "right":
        img.style.left = `${window.innerWidth + 120}px`;
        img.style.top = `${targetY}px`;
        break;
    }

    document.body.appendChild(img);

    requestAnimationFrame(() => {
      img.style.transition = "all 3s ease-out";
      img.style.left = `${targetX}px`;
      img.style.top = `${targetY}px`;
      img.style.opacity = 0;
    });

    setTimeout(() => {
      img.remove();
    }, 3000);
  });

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
});
