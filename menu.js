// menu.js - universal hamburger menu script (simple and robust)
(function(){
  function toggleMenu(){
    const menu = document.getElementById('mobileMenu');
    if(!menu) return;
    menu.classList.toggle('open');
  }

  // expose globally for inline onclick compatibility (some pages call toggleMenu())
  window.toggleMenu = toggleMenu;

  // close the menu when clicking outside
  document.addEventListener('click', function(e){
    const menu = document.getElementById('mobileMenu');
    const burger = document.querySelector('.hamburger');
    if(!menu || !burger) return;
    if(menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)){
      menu.classList.remove('open');
    }
  });

  // close on escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      const menu = document.getElementById('mobileMenu');
      if(menu) menu.classList.remove('open');
    }
  });
})();
