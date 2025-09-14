
  // ---------------- 导航平滑滚动 ----------------
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {

  // ------------------ 禁止拖拽 ------------------
  document.querySelectorAll('img, video').forEach(el => {
    el.addEventListener('dragstart', e => e.preventDefault());
  });

  // ------------------ 顶部导航平滑滚动 ------------------
  document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        target.scrollIntoView({ behavior: 'smooth' });
        setTimeout(checkVisible, 500); // 延迟检查动画
      }
    });
  });

  // ------------------ Showreel bg-a & cover-img 动画 ------------------
  const showreel = document.getElementById('showreel');
  const bgA = document.getElementById('bg-a');
  const coverContainer = document.getElementById('cover-container');
  const coverImg = document.getElementById('cover-img');
  let bgShown = false, coverShown = false;
  const bgTrigger = window.innerHeight * 0.35;
  const coverTrigger = window.innerHeight * 0.65;

  const showBg = () => { bgA.style.opacity = 1; bgA.style.transform = 'translateX(20px)'; };
  const hideBg = () => { bgA.style.opacity = 0; bgA.style.transform = 'translateX(0)'; };
  const showCover = () => { coverImg.style.opacity = 1; coverImg.style.transform = 'translateY(0)'; };
  const hideCover = () => { coverImg.style.opacity = 0; coverImg.style.transform = 'translateY(0)'; };

  const checkVisible = () => {
    const showreelRect = showreel.getBoundingClientRect();
    if (showreelRect.top <= bgTrigger && !bgShown) { showBg(); bgShown = true; }
    else if (showreelRect.top > bgTrigger && bgShown) { hideBg(); bgShown = false; }

    const coverRect = coverContainer.getBoundingClientRect();
    if (coverRect.top <= coverTrigger && !coverShown) { showCover(); coverShown = true; }
    else if (coverRect.top > coverTrigger && coverShown) { hideCover(); coverShown = false; }
  };

  window.addEventListener('scroll', checkVisible);
  checkVisible();

  // ------------------ Showreel 视频弹窗 ------------------
  const showreelModal = document.getElementById('video-modal');
  const showreelVideo = document.getElementById('showreel-video');
  const showreelClose = document.querySelector('.close-btn');

  coverContainer.addEventListener('click', () => {
    showreelModal.style.display = 'flex';
    showreelVideo.currentTime = 0;
    showreelVideo.play();
  });

  const closeShowreelModal = () => {
    showreelModal.style.display = 'none';
    showreelVideo.pause();
  };

  showreelClose.addEventListener('click', closeShowreelModal);
  showreelModal.addEventListener('click', e => { if(e.target === showreelModal) closeShowreelModal(); });

  // ------------------ 作品网格弹窗 ------------------
  const modal = document.getElementById('modal');
  const modalVideo = document.getElementById('modal-video');
  const modalImg = document.getElementById('modal-img');
  const modalClose = modal.querySelector('.close-btn');

  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      if(type === 'video'){
        modalVideo.src = card.dataset.src;
        modalVideo.style.display = 'block';
        modalImg.style.display = 'none';
        modalVideo.currentTime = 0;
        modalVideo.play();
      } else {
        modalImg.src = card.dataset.src; // <--- 用 data-src
        modalImg.style.display = 'block';
        modalVideo.style.display = 'none';
      }
      modal.style.display = 'flex';
    });
  });

  const closeModal = () => {
    modal.style.display = 'none';
    modalVideo.pause();
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

});
