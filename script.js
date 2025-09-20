
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
const showreelClose = document.querySelector('.close-btn');
const showreelContent = showreelModal.querySelector('.modal-content');

coverContainer.addEventListener('click', () => {
  showreelModal.style.display = 'flex';

  const bvid = 'BV19KpezdExJ'; // 你要播放的 B 站视频
  const page = 1; // 指定页码
  let iframe = document.getElementById('showreel-bilibili-iframe');

  if(!iframe){
    iframe = document.createElement('iframe');
    iframe.id = 'showreel-bilibili-iframe';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    showreelContent.appendChild(iframe);
  }

  iframe.src = `https://player.bilibili.com/player.html?bvid=${bvid}&page=${page}&autoplay=true`;
});

const closeShowreelModal = () => {
  showreelModal.style.display = 'none';
  const iframe = document.getElementById('showreel-bilibili-iframe');
  if(iframe) iframe.src = ''; // 停止播放
};

showreelClose.addEventListener('click', closeShowreelModal);
showreelModal.addEventListener('click', e => { if(e.target === showreelModal) closeShowreelModal(); });

  // ------------------ 作品网格弹窗 ------------------
document.addEventListener('DOMContentLoaded', () => {

  // ------------------ 作品网格弹窗 ------------------
  const modal = document.getElementById('modal');
  const modalImg = modal.querySelector('#modal-img');
  const modalClose = modal.querySelector('.close-btn');
  const modalContent = modal.querySelector('.modal-content');

  // 创建或获取 iframe 用于 B 站播放
  let modalIframe = document.getElementById('modal-bilibili-iframe');
  if(!modalIframe){
    modalIframe = document.createElement('iframe');
    modalIframe.id = 'modal-bilibili-iframe';
    modalIframe.width = '100%';
    modalIframe.height = '100%';
    modalIframe.frameBorder = '0';
    modalIframe.allow = 'autoplay; fullscreen';
    modalIframe.allowFullscreen = true;
    modalIframe.style.display = 'none';
    modalContent.appendChild(modalIframe);
  }

  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;

      if(type === 'video'){
        // 图片隐藏
        modalImg.style.display = 'none';
        // 播放 B 站 iframe
        const bvid = card.dataset.bvid;
        const page = card.dataset.page || 1;
        modalIframe.src = `https://player.bilibili.com/player.html?bvid=${bvid}&page=${page}&autoplay=true`;
        modalIframe.style.display = 'block';
      } else if(type === 'image'){
        // iframe 隐藏
        modalIframe.src = '';
        modalIframe.style.display = 'none';
        // 显示图片
        modalImg.src = card.dataset.src;
        modalImg.style.display = 'block';
      }

      modal.style.display = 'flex';
    });
  });

  // 点击关闭按钮或遮罩关闭弹窗
  const closeModal = () => {
    modalIframe.src = '';
    modal.style.display = 'none';
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
});
});
