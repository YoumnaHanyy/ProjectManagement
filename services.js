document.addEventListener("DOMContentLoaded", () => {
    const pawCount = 20; // Number of paws
    const servicesHeader = document.querySelector(".services-header");

    if (!servicesHeader) {
        console.error("❌ services-header section not found!");
        return;
    }

    const pawSize = 50; // Match your CSS
    const headerWidth = servicesHeader.clientWidth;
    const headerHeight = servicesHeader.clientHeight;

    const columns = Math.ceil(Math.sqrt(pawCount));
    const rows = Math.ceil(pawCount / columns);

    const cellWidth = headerWidth / columns;
    const cellHeight = headerHeight / rows;

    const seed = 12345; // Fixed seed for repeatable randomness
    let randomState = seed;

    function seededRandom() {
        randomState = (randomState * 9301 + 49297) % 233280;
        return randomState / 233280;
    }

    let usedCells = new Set();

    for (let i = 0; i < pawCount; i++) {
        let col, row, cellKey;

        do {
            col = Math.floor(seededRandom() * columns);
            row = Math.floor(seededRandom() * rows);
            cellKey = `${col}-${row}`;
        } while (usedCells.has(cellKey) && usedCells.size < columns * rows);

        usedCells.add(cellKey);

        const paw = document.createElement("div");
        paw.classList.add("paw");

        // Jitter within the cell
        const jitterX = seededRandom() * (cellWidth - pawSize);
        const jitterY = seededRandom() * (cellHeight - pawSize);
        const randomRotation = seededRandom() * 360;

        paw.style.left = `${col * cellWidth + jitterX}px`;
        paw.style.top = `${row * cellHeight + jitterY}px`;
        paw.style.transform = `rotate(${randomRotation}deg)`;

        servicesHeader.appendChild(paw);
    }

    console.log("✅ Paws scattered consistently!");
});
// Add this to your existing services.js file
document.addEventListener("DOMContentLoaded", () => {
    // Animate paw images on scroll
    const pawImages = document.querySelectorAll('.paw-image');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function animatePawsOnScroll() {
        pawImages.forEach(paw => {
            if (isElementInViewport(paw) && !paw.classList.contains('animated')) {
                paw.classList.add('animated');
                paw.style.animation = 'bounce 1.5s ease';
                
                // Reset animation after it completes
                setTimeout(() => {
                    paw.style.animation = '';
                }, 1500);
            }
        });
    }
    
    // Add hover effect to paw images
    pawImages.forEach(paw => {
        paw.addEventListener('mouseenter', () => {
            paw.style.animation = 'bounce 0.8s infinite ease-in-out';
        });
        
        paw.addEventListener('mouseleave', () => {
            paw.style.animation = '';
        });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animatePawsOnScroll);
    
    // Initial check on page load
    animatePawsOnScroll();
});