/* members.js — gate logic for members-only */
(function(){
  const PASSWORD = 'freedom'; // change here to desired key
  const leftGate = document.getElementById('leftGate');
  const rightGate = document.getElementById('rightGate');
  const divine = document.getElementById('divineLight');
  const openBtn = document.getElementById('openBtn');
  const pwInput = document.getElementById('pw');
  const fog = document.getElementById('fog');
  const card = document.getElementById('card');

  function spawnSparkles(count=6){
    for(let i=0;i<count;i++){
      const s = document.createElement('div');
      s.className='sparkle';
      // random position inside gate area
      s.style.left = (40 + Math.random()*40) + '%';
      s.style.top = (30 + Math.random()*40) + '%';
      document.body.appendChild(s);
      requestAnimationFrame(()=> s.classList.add('show'));
      setTimeout(()=> s.remove(), 1800);
    }
  }

  function openGates(){
    leftGate.classList.remove('closed'); leftGate.classList.add('open');
    rightGate.classList.remove('closed'); rightGate.classList.add('open');
    divine.classList.add('visible');
    fog.style.transition='opacity 1s ease'; fog.style.opacity='0.75';
    spawnSparkles(10);
    card.style.transform='translateY(-8px)';
    setTimeout(()=> {
      // redirect to private collection
      window.location.href = "private-collection.html";
    }, 1300);
  }

  function failFeedback(){
    card.animate([{transform:'translateY(0)'},{transform:'translateY(-8px)'},{transform:'translateY(0)'}], {duration:380, easing:'ease-out'});
    pwInput.animate([{boxShadow:'0 0 0px rgba(200,0,0,0)'},{boxShadow:'0 0 18px rgba(200,30,30,0.14)'}], {duration:420});
    spawnSparkles(4);
  }

  if(openBtn){
    openBtn.addEventListener('click', ()=>{
      const val = (pwInput.value||'').trim();
      if(val && val === PASSWORD){ openGates(); } else { failFeedback(); }
    });
    pwInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') openBtn.click(); });
  }

  // initial reveal animations
  window.addEventListener('load', ()=>{
    setTimeout(()=> { if(card) card.classList.add('show'); fog.style.opacity = '1'; }, 260);
  });
})();
