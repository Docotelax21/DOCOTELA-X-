// animations.js - page transition helpers and small UI effects
(function(){
  // fade overlay control (used by home page)
  window.hideIntro = function(id = 'fadeWrap', delay=4200){
    const el = document.getElementById(id);
    if(!el) return;
    setTimeout(()=> el.classList.add('hidden'), delay);
    setTimeout(()=> { if(el.parentNode) el.parentNode.removeChild(el); }, delay + 900);
  };

  // simple scroll reveal for elements with .fade-in
  function revealOnScroll(){
    const items = document.querySelectorAll('.fade-in');
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting) en.target.classList.add('show');
      });
    }, {threshold:0.08});
    items.forEach(i=> obs.observe(i));
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    revealOnScroll();
  });

  // small helper used on Members page to spawn sparkles
  window.spawnSparkles = function(count=8){
    for(let i=0;i<count;i++){
      const s = document.createElement('div');
      s.className = 'sparkle';
      const rx = (Math.random()*70 + 15) + '%';
      const ry = (Math.random()*60 + 10) + '%';
      s.style.left = rx; s.style.top = ry;
      document.body.appendChild(s);
      requestAnimationFrame(()=> s.classList.add('show'));
      setTimeout(()=> s.remove(), 1800);
    }
  };
})();
