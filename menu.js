// menu.js - simple, robust
document.addEventListener("DOMContentLoaded", function(){
  const burgerEls = Array.from(document.querySelectorAll('.hamburger'));
  const menu = document.getElementById('mobileMenu');

  function toggleMenu(e){
    if(!menu) return;
    menu.classList.toggle('open');
  }

  burgerEls.forEach(b => b.addEventListener('click', toggleMenu));

  // close when clicking outside
  document.addEventListener('click', function(ev){
    if(!menu) return;
    const target = ev.target;
    if(menu.classList.contains('open')){
      if(!menu.contains(target) && !Array.from(burgerEls).some(b=>b.contains(target))){
        menu.classList.remove('open');
      }
    }
  });

  // close on menu link click (for single page navigation)
  document.addEventListener('click', function(ev){
    if(!menu) return;
    const el = ev.target;
    if(el.tagName === 'A' && el.closest('.mobile-menu')){
      menu.classList.remove('open');
    }
  });
});
