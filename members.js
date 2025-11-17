// members.js - gate logic
(function(){
  const PASSWORD = 'memberson1y'; // change here if needed
  const left = document.getElementById('leftGate');
  const right = document.getElementById('rightGate');
  const divine = document.getElementById('divine');
  const btn = document.getElementById('memberOpen');
  const input = document.getElementById('memberPassword');
  const fog = document.getElementById('fogLayer');
  const card = document.getElementById('gateCard');

  // show fog on load
  window.addEventListener('load', ()=>{
    if(fog) fog.classList.add('active');
    if(card) card.classList.add('fade-in');
  });

  function spawnSparkles(count=8){
    window.spawnSparkles && window.spawnSparkles(count);
  }

  function openSequence(){
    if(left) left.classList.add('open');
    if(right) right.classList.add('open');
    if(divine) divine.classList.add('visible');
    if(fog){ fog.style.transition='opacity .9s'; fog.style.opacity='0.8' }
    spawnSparkles(12);
    setTimeout(()=> { window.location.href='private-collection.html'; }, 1400);
  }

  function failFeedback(){
    if(card) card.animate([{transform:'translateY(0)'},{transform:'translateY(-8px)'},{transform:'translateY(0)'}], {duration:420});
    spawnSparkles(4);
  }

  btn && btn.addEventListener('click', ()=>{
    const v = (input.value||'').trim();
    if(!v){ failFeedback(); return; }
    if(v === PASSWORD) openSequence();
    else failFeedback();
  });

  input && input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') btn.click(); });
})();
