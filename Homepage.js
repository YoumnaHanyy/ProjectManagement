document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
});

/*breeds cards */
document.addEventListener("DOMContentLoaded", function () {
    // Navigation active link handling
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
    
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.breed-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carousel || !cards.length || !prevBtn || !nextBtn) return;
    
    let cardWidth = cards[0].offsetWidth + 20; // card width + gap
    let cardIndex = 0;
    let totalCards = cards.length;
    let cardsPerView = Math.floor(carousel.offsetWidth / cardWidth);
    
    // Clone cards for infinite scrolling effect
    function setupInfiniteCarousel() {
        // Only set up if not already done
        if (document.querySelector('.carousel .clone-card')) return;
        
        // Clone first set of cards and append to the end
        for (let i = 0; i < totalCards; i++) {
            const clone = cards[i].cloneNode(true);
            clone.classList.add('clone-card');
            carousel.appendChild(clone);
        }
    }
    
    setupInfiniteCarousel();
    
    // Update carousel position with smooth transition
    function updateCarousel(smooth = true) {
        if (smooth) {
            carousel.style.transition = 'transform 0.5s ease-in-out';
        } else {
            carousel.style.transition = 'none';
        }
        carousel.style.transform = `translateX(${-cardIndex * cardWidth}px)`;
    }
    
    // Handle next button click - with circular navigation
    nextBtn.addEventListener('click', () => {
        cardIndex++;
        updateCarousel();
        
        // If we've reached the end of the original cards
        if (cardIndex >= totalCards) {
            // Wait for the transition to complete, then reset
            setTimeout(() => {
                cardIndex = cardIndex % totalCards;
                updateCarousel(false);
            }, 500);
        }
    });
    
    // Handle previous button click - with circular navigation
    prevBtn.addEventListener('click', () => {
        cardIndex--;
        updateCarousel();
        
        // If we've gone before the first card
        if (cardIndex < 0) {
            // Wait for transition to complete, then reset to the equivalent position at the end
            setTimeout(() => {
                cardIndex = totalCards - Math.abs(cardIndex % totalCards);
                if (cardIndex === totalCards) cardIndex = 0;
                updateCarousel(false);
            }, 500);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + 20;
        cardsPerView = Math.floor(carousel.offsetWidth / cardWidth);
        
        // Ensure position stays valid after resize
        if (cardIndex >= totalCards) {
            cardIndex = cardIndex % totalCards;
        }
        updateCarousel();
    });
    
    // Initialize carousel
    updateCarousel(false);
    
});