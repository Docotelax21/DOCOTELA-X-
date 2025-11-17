// menu.js — minimal, robust hamburger / mobile menu
(function(){
  const burger = document.querySelectorAll('.hamburger');
  const mobileMenus = document.querySelectorAll('#mobileMenu');

  function toggleMenuSingle(menu){
    menu.classList.toggle('open');
    // keep ARIA sane
    const open = menu.classList.contains('open');
    menu.setAttribute('aria-hidden', (!open).toString());
  }

  // event delegation - works if multiple hamburgers exist
  document.addEventListener('click', (e) => {
    // if click on hamburger
    if (e.target.closest('.hamburger')) {
      const menu = document.querySelector('#mobileMenu');
      toggleMenuSingle(menu);
      e.stopPropagation();
      return;
    }

    // click outside menu should close it
    const menu = document.querySelector('#mobileMenu');
    if (menu && !menu.contains(e.target)) {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden','true');
    }
  });

  // close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const menu = document.querySelector('#mobileMenu');
      if (menu) {
        menu.classList.remove('open');
        menu.setAttribute('aria-hidden','true');
      }
    }
  });
})();
