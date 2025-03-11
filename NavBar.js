document.addEventListener("DOMContentLoaded", function () {
    let navLinks = document.querySelectorAll("nav ul li a");

    // Function to remove 'active' from all links
    function removeActiveClass() {
        navLinks.forEach(link => link.classList.remove("active"));
    }

    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            removeActiveClass();
            this.classList.add("active");

            // Store active link in localStorage
            localStorage.setItem("activeNav", this.getAttribute("href"));
        });
    });

    // Retrieve active link from localStorage on page load
    let activeNav = localStorage.getItem("activeNav");
    if (activeNav) {
        navLinks.forEach(link => {
            if (link.getAttribute("href") === activeNav) {
                link.classList.add("active");
            }
        });
    }
});
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled"); // Add blur effect
    } else {
        header.classList.remove("scrolled"); // Remove blur when at the top
    }
});
