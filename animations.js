// animations.js - parallax, scroll reveal, and members gate helpers

(function(){
  // Parallax for floating Xs (subtle)
  function initParallax() {
    const layers = Array.from(document.querySelectorAll('.fx1, .fx2, .fx3'));
    if(!layers.length) return;
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth/2;
      const cy = window.innerHeight/2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      layers.forEach((el, i) => {
        const depth = (i+1) * 6;
        el.style.transform = `translate3d(${dx*depth}px, ${dy*depth}px, 0)`;
      });
    });
  }

  // Scroll reveal
  function initReveal() {
    const obs = new IntersectionObserver((ents)=>{
      ents.forEach(en=>{
        if(en.isIntersecting) en.target.classList.add('show');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-in-slow').forEach(el => obs.observe(el));
    document.querySelectorAll('.about-section, .content').forEach(el => obs.observe(el));
  }

  // Members-only gate controller (connects with CSS classes)
  function initMembersGate() {
    const gateCard = document.querySelector('.gate-card');
    const openBtn = document.getElementById('openBtn');
    const pwInput = document.getElementById('pw');
    const leftGate = document.getElementById('leftGate');
    const rightGate = document.getElementById('rightGate');
    const divine = document.getElementById('divineLight');
    const fog = document.getElementById('fog') || document.querySelector('.fog-layer');

    if(!openBtn || !pwInput) return;

    const PASSWORD = 'M3Mberson1y'; // THE KEY - as you requested

    function spawnSparkles(count=8) {
      for(let i=0;i<count;i++){
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = (40 + Math.random()*20) + '%';
        s.style.top = (40 + Math.random()*20) + '%';
        document.body.appendChild(s);
        requestAnimationFrame(()=> s.classList.add('show'));
        setTimeout(()=> s.remove(), 1600);
      }
    }

    function openSequence() {
      leftGate.classList.remove('closed'); leftGate.classList.add('open');
      rightGate.classList.remove('closed'); rightGate.classList.add('open');
      if(divine) divine.classList.add('visible');
      if(fog) { fog.style.transition = 'opacity .9s ease'; fog.style.opacity = '0.75'; }
      spawnSparkles(12);
      if(gateCard) gateCard.style.transform = 'translateY(-8px)';
      setTimeout(()=> {
        // safe redirect - private page
        window.location.href = 'private-collection.html';
      }, 1500);
    }

    function failFeedback(){
      if(gateCard) gateCard.animate([{transform:'translateY(0)'},{transform:'translateY(-8px)'},{transform:'translateY(0)'}], {duration:380, easing:'ease-out'});
      pwInput.animate([{boxShadow:'0 0 0px rgba(200,0,0,0)'},{boxShadow:'0 0 18px rgba(200,30,30,0.14)'}], {duration:420});
      spawnSparkles(5);
    }

    openBtn.addEventListener('click', ()=>{
      const val = (pwInput.value || '').trim();
      if(val && val === PASSWORD) openSequence();
      else failFeedback();
    });

    pwInput.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') openBtn.click();
    });
  }

  // Initializer
  function init() {
    initParallax();
    initReveal();
    initMembersGate();
  }

  // auto-init on document ready
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Export for debugging (optional)
  window.docotelaAnimations = { initParallax, initReveal, initMembersGate };
})();
