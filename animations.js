// animations.js
// Handles: cinematic fade overlay, floating X parallax, smooth page transitions,
// members gate sequence (fog, sparks, divine light), small sparkle generator.
// Designed to work with styles.css and the HTML templates below.

(function(){
  /* ---------- CONFIG ---------- */
  const GATE_PASSWORD = 'memberson1y'; // correct password
  const FADE_MS = 4200; // overlay duration
  const HERO_REVEAL_DELAY = 480; // ms after fade removed to show hero content

  /* ---------- Cinematic fade overlay (home) ---------- */
  function initCinematicFade(){
    const fadeWrap = document.getElementById('fadeWrap');
    const heroContent = document.getElementById('heroContent');
    if(!fadeWrap) return;
    // keep a little buffer so fonts/images load
    setTimeout(()=> { fadeWrap.classList.add('fade-out'); }, FADE_MS);
    setTimeout(()=> {
      fadeWrap.style.display = 'none';
      if(heroContent) heroContent.classList.add('show');
    }, FADE_MS + HERO_REVEAL_DELAY);
  }

  /* ---------- Parallax floating Xs ---------- */
  function initParallax(){
    const layers = document.querySelectorAll('.floating-x');
    if(!layers.length) return;
    // simple parallax on mousemove / gyro
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      layers.forEach((el, idx) => {
        const depth = (idx+1) * 6; // different movement for each layer
        el.style.transform = `translate3d(${dx * depth}px, ${dy * depth}px, 0)`;
      });
    });

    // small device motion fallback
    if(window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (ev) => {
        const gx = ev.gamma || 0;
        const gy = ev.beta || 0;
        layers.forEach((el, idx) => {
          const depth = (idx+1) * 2;
          el.style.transform = `translate3d(${gx * depth}px, ${gy * depth}px, 0)`;
        });
      }, true);
    }
  }

  /* ---------- Smooth link transitions (fade out) ---------- */
  function initLinkTransitions(){
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if(!a) return;
      const href = a.getAttribute('href');
      // ignore external or hash anchors
      if(!href || href.startsWith('http') || href.startsWith('#') || a.target === '_blank') return;
      // internal link: animate fade then navigate
      e.preventDefault();
      document.documentElement.classList.add('page-fade-out'); // styles.css should handle this
      setTimeout(()=> { window.location.href = href; }, 450);
    });
  }

  /* ---------- Members gate: fog, gate open, divine light, sparkles ---------- */
  function initMembersGate(){
    const gateArea = document.querySelector('.gate-stage');
    if(!gateArea) return;
    const leftGate = document.getElementById('leftGate');
    const rightGate = document.getElementById('rightGate');
    const divine = document.getElementById('divineLight');
    const openBtn = document.getElementById('openBtn');
    const pwInput = document.getElementById('pw');
    const fog = document.getElementById('fog');
    const card = document.getElementById('gateCard');

    function spawnSparkles(count=8){
      for(let i=0;i<count;i++){
        const s = document.createElement('div');
        s.className = 'sparkle';
        // random position within gate visual
        s.style.left = (40 + Math.random()*20) + '%';
        s.style.top = (40 + Math.random()*20) + '%';
        document.body.appendChild(s);
        // trigger animation
        requestAnimationFrame(()=> s.classList.add('show'));
        setTimeout(()=> s.remove(), 1600);
      }
    }

    function openSequence(){
      if(leftGate) { leftGate.classList.remove('closed'); leftGate.classList.add('open'); }
      if(rightGate) { rightGate.classList.remove('closed'); rightGate.classList.add('open'); }
      if(divine) divine.classList.add('visible');
      if(fog) { fog.style.transition = 'opacity 1s ease'; fog.style.opacity = '0.78'; }
      spawnSparkles(14);
      // subtle push on card
      if(card) card.style.transform = 'translateY(-8px)';

      // after the cinematic, redirect to private-collection
      setTimeout(()=> {
        window.location.href = 'private-collection.html';
      }, 1500);
    }

    function failFeedback(){
      if(card){
        card.animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(-8px)' },
          { transform: 'translateY(0)' }
        ], { duration: 420, easing: 'ease-out' });
      }
      spawnSparkles(4);
      // flash the input field red
      if(pwInput){
        pwInput.animate([
          { boxShadow: '0 0 0 rgba(200,0,0,0)' },
          { boxShadow: '0 0 18px rgba(200,30,30,0.12)' }
        ], { duration: 380, easing: 'ease-out' });
      }
    }

    openBtn && openBtn.addEventListener('click', (e)=>{
      const val = (pwInput && pwInput.value) ? pwInput.value.trim() : '';
      if(val && val === GATE_PASSWORD) {
        openSequence();
      } else {
        failFeedback();
      }
    });

    // Enter key support
    pwInput && pwInput.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter') openBtn.click();
    });

    // show card animation on load
    window.addEventListener('load', ()=>{
      if(card) card.classList.add('show');
      if(fog) fog.style.opacity = '1';
    });
  }

  /* ---------- Init all ---------- */
  function initAll(){
    initCinematicFade();
    initParallax();
    initLinkTransitions();
    initMembersGate();
  }

  // expose for debugging if needed
  window.DocotelaXAnimations = {
    initAll
  };

  // kick off after DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
