// menu.js — robust glass hamburger for Docotela X
(function(){
  const hb = document.querySelectorAll('.hamburger');
  const menus = document.querySelectorAll('#mobileMenu');

  function toggleMenu() {
    menus.forEach(m=>{
      const open = m.classList.toggle('open');
      m.setAttribute('aria-hidden', (!open).toString());
    });
    hb.forEach(b=>{
      const expanded = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', (!expanded).toString());
    });
  }

  hb.forEach(b => b.addEventListener('click', toggleMenu));

  // click outside to close
  document.addEventListener('click', function(e){
    const isHamburger = Array.from(hb).some(b=>b.contains(e.target));
    const isInsideMenu = Array.from(menus).some(m=>m.contains(e.target));
    if (!isHamburger && !isInsideMenu) {
      menus.forEach(m=>m.classList.remove('open'));
      hb.forEach(b=>b.setAttribute('aria-expanded','false'));
      menus.forEach(m=>m.setAttribute('aria-hidden','true'));
    }
  });

  // close on Esc
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      menus.forEach(m=>m.classList.remove('open'));
      hb.forEach(b=>b.setAttribute('aria-expanded','false'));
    }
  });

})();
