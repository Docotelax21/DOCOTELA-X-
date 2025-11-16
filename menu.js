// menu.js - lightweight toggle for hamburger + close on link click
(function(){
  function $(sel){return document.querySelectorAll(sel)}
  const hbEls = document.querySelectorAll('.hamburger');
  const menus = document.querySelectorAll('#mobileMenu');

  function toggle() {
    menus.forEach(m=>m.classList.toggle('open'));
  }

  hbEls.forEach(hb=>hb.addEventListener('click', toggle));

  // close menu when link clicked
  document.addEventListener('click', function(e){
    const clicked = e.target;
    if (clicked.tagName === 'A' && clicked.closest('#mobileMenu')) {
      menus.forEach(m=>m.classList.remove('open'));
    }
  });
})();
