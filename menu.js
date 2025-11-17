/* menu.js — single site menu control (hamburger + outside click + keyboard) */
(function(){
  const burgerEls = document.querySelectorAll('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if(!mobileMenu) return;

  function toggleMenu(ev){
    if(ev) ev.stopPropagation();
    const open = mobileMenu.classList.toggle('open');
    mobileMenu.setAttribute('aria-hidden', !open);
  }

  burgerEls.forEach(b=>b.addEventListener('click', (e)=>{ e.stopPropagation(); toggleMenu(e); }));

  // close if clicking outside
  document.addEventListener('click', function(e){
    if(!mobileMenu.contains(e.target) && ![...burgerEls].some(b=>b.contains(e.target))){
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden','true');
    }
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){ mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden','true'); }
  });

  // ensure links close menu when clicked
  mobileMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{ mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden','true'); });
  });
})();
