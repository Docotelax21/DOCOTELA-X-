// menu.js (single global menu script)
// Works with elements having class="hamburger" and id="mobileMenu"

(function(){
  // find hamburger(s) and menu
  const hamburgers = Array.from(document.querySelectorAll('.hamburger'));
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMenu(e){
    if(e) e.stopPropagation();
    if(!mobileMenu) return;
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.setAttribute('aria-hidden', (!isOpen).toString());
  }

  // attach clicks
  hamburgers.forEach(h => h.addEventListener('click', toggleMenu));

  // click outside to close
  document.addEventListener('click', function(ev){
    if(!mobileMenu) return;
    const open = mobileMenu.classList.contains('open');
    if(!open) return;
    if(mobileMenu.contains(ev.target)) return;
    if(hamburgers.some(h=>h.contains(ev.target))) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden','true');
  });

  // close on escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')){
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden','true');
    }
  });

  // ensure links in menu close it when clicked
  document.addEventListener('click', function(ev){
    if(!mobileMenu) return;
    if(ev.target.tagName === 'A' && ev.target.closest('.mobile-menu')){
      setTimeout(()=> { mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden','true'); }, 80);
    }
  });
})();
