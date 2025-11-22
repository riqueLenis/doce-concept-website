(function(){
  const track = document.querySelector('.index-grid-img-1');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  if(!track || !prevBtn || !nextBtn) return;

  const ITEM_WIDTH = () => {
    // each item width + gap approximation
    const item = track.querySelector('.carousel-item');
    if(!item) return 280; // fallback
    const style = window.getComputedStyle(item);
    const w = item.getBoundingClientRect().width;
    const gap = parseInt(window.getComputedStyle(track).gap)||20;
    return w + gap;
  };

  prevBtn.addEventListener('click', ()=> {
    track.scrollBy({left: -ITEM_WIDTH(), behavior: 'smooth'});
  });
  nextBtn.addEventListener('click', ()=> {
    track.scrollBy({left: ITEM_WIDTH(), behavior: 'smooth'});
  });

  // Keyboard accessibility
  [prevBtn, nextBtn].forEach(btn=>{
    btn.setAttribute('tabindex','0');
    btn.addEventListener('keyup', e=>{
      if(e.key === 'Enter' || e.key === ' ') { btn.click(); }
    });
  });
})();
