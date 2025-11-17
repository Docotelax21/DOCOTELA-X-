// menu.js - single shared menu script
(function(){
  function toggleMenu(){
    const menu = document.getElementById('mobileMenu');
    if(!menu) return;
    menu.classList.toggle('open');
  }
  // Expose to global for inline handlers (safe)
  window.toggleMenu = toggleMenu;

  document.addEventListener('click', function(e){
    const menu = document.getElementById('mobileMenu');
    const burger = document.querySelector('.hamburger');
    if(!menu || !burger) return;
    // close menu if clicking outside
    if (!menu.contains(e.target) && e.target !== burger && !burger.contains(e.target)) {
      menu.classList.remove('open');
    }
  });

  // close on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      const menu = document.getElementById('mobileMenu');
      if(menu) menu.classList.remove('open');
    }
  });
})();
