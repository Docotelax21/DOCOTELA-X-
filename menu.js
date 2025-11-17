function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("open");
}

document.addEventListener("click", function(e) {
    const menu = document.getElementById("mobileMenu");
    const burger = document.querySelector(".hamburger");

    if (!menu.contains(e.target) && e.target !== burger) {
        menu.classList.remove("open");
    }
});
