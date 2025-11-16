function openGates() {
    const pass = document.getElementById("memberPass").value;
    const error = document.getElementById("errorText");

    if (pass !== "memberson1y") {
        error.textContent = "Incorrect password";
        return;
    }

    error.textContent = "";

    // Animate gates
    document.querySelector(".gate-left").classList.add("open-left");
    document.querySelector(".gate-right").classList.add("open-right");

    setTimeout(() => {
        document.querySelector(".gate-wrapper").classList.add("fade-out");
    }, 1200);

    setTimeout(() => {
        document.getElementById("membersContent").classList.add("show");
    }, 2000);
}
