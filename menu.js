// menu.js - small, reliable mobile menu toggle
(function(){
  window.toggleMenu = function(){
    const menu = document.getElementById('mobileMenu');
    if(!menu) return;
    menu.classList.toggle('open');
    // ensure it is scrollable on mobile
    if(menu.classList.contains('open')){
      menu.style.display = 'block';
    } else {
      // keep natural display for compactness
      setTimeout(()=> menu.style.display = '', 450);
    }
  };

  document.addEventListener('click', function(e){
    const menu = document.getElementById('mobileMenu');
    const burger = document.querySelector('.hamburger');
    if(!menu || !burger) return;
    if(!menu.contains(e.target) && e.target !== burger){
      menu.classList.remove('open');
    }
  });

  // allow ESC to close
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      const menu = document.getElementById('mobileMenu');
      if(menu) menu.classList.remove('open');
    }
  });
})();
