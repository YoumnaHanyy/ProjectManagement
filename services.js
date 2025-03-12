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
