const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("bioModal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.querySelector(".modal .close");

    openBtn.addEventListener("click", function(e){
        e.preventDefault();
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function(){
        modal.style.display = "none";
    });

    window.addEventListener("click", function(e){
        if(e.target == modal){
            modal.style.display = "none";
        }
    });
});

window.addEventListener("load", function() {
    setTimeout(function() {
        document.body.classList.add("loaded");
    }, 400);
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        window.location.href = this.href;
    });
});

// جلوگیری از لمس طولانی (موبایل)
document.addEventListener('touchstart', function preventLongPress(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, {passive: false});
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && ['c','x','s','u'].includes(e.key.toLowerCase())) || e.key === 'F12') {
        e.preventDefault();
    }
}, false);
