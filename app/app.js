document.addEventListener('DOMContentLoaded', () => {
    const CARD_WIDTH = 200; // Width of each card
    const CARD_HEIGHT = 300; // Height of each card
    const DISPLAY_CARD_WIDTH = 150; // Display width for drawn cards
    const COLUMNS = 4; // Number of columns in the grid

    let cards = [ // Change from const to let
        '01.jpg', 
        '02.jpg', 
        '03.jpg', 
        '04.jpg', 
        '05.jpg', 
        '06.jpg', 
        '07.jpg', 
        '08.jpg', 
        '09.jpg', 
        '10.jpg', 
        '11.jpg', 
        '12.jpg', 
        '13.jpg', 
        '14.jpg', 
        '15.jpg', 
        '16.jpg',
        '17.jpg',
        '18.jpg'
    ];

    let originalDeck = [...cards]; // Copy of the original deck to reset later
    let drawnCards = [];
    const currentCardImg = document.getElementById('current-card');
    const drawCardBtn = document.getElementById('draw-card');
    const resetGameBtn = document.getElementById('reset-game');
    const drawnCardsContainer = document.getElementById('drawn-cards');
    const drawAllCardsBtn = document.getElementById('draw-all-cards');

    drawCardBtn.addEventListener('click', drawSingleCard);
    resetGameBtn.addEventListener('click', resetGame);
    drawAllCardsBtn.addEventListener('click', drawAllCards);

    function drawSingleCard() {
        if (cards.length === 0) {
            alert('No hay más cartas para dibujar!');
            return;
        }

        const randomIndex = Math.floor(Math.random() * cards.length);
        const drawnCard = cards.splice(randomIndex, 1)[0];
        drawnCards.push(drawnCard);

        // Update the current card image
        currentCardImg.src = `assets/images/${drawnCard}`;
        currentCardImg.alt = drawnCard;

        // Update the drawn cards grid
        updateDrawnCardsGrid();
    }

    function resetGame() {
        // Reset the drawn cards and restore the original deck
        drawnCards = [];
        cards = [...originalDeck]; // Restore the original deck
        currentCardImg.src = ''; // Clear the current card image
        currentCardImg.alt = ''; // Clear the alt text
        drawnCardsContainer.innerHTML = ''; // Clear the drawn cards grid
    }

    function drawAllCards() {
        if (cards.length === 0) {
            alert('El Cartón está lleno!!!');
            return;
        }

        drawnCards = [];
        while (cards.length > 0) {
            const randomIndex = Math.floor(Math.random() * cards.length);
            const drawnCard = cards.splice(randomIndex, 1)[0];
            drawnCards.push(drawnCard);
        }

        // Update the drawn cards grid on the main page
        updateDrawnCardsGrid();
        createCanvasForCards();
    }

    function createCanvasForCards() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const rows = Math.ceil(drawnCards.length / COLUMNS);
        canvas.width = COLUMNS * CARD_WIDTH;
        canvas.height = rows * CARD_HEIGHT;

        let imagesLoaded = 0;
        drawnCards.forEach((card, index) => {
            const img = new Image();
            img.src = `assets/images/${card}`;
            img.onload = () => {
                const x = (index % COLUMNS) * CARD_WIDTH;
                const y = Math.floor(index / COLUMNS) * CARD_HEIGHT;
                ctx.drawImage(img, x, y, CARD_WIDTH, CARD_HEIGHT);
                imagesLoaded++;

                if (imagesLoaded === drawnCards.length) {
                    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
                    window.open(dataURL, '_blank');
                }
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${img.src}`);
                // Optionally, handle the error (e.g., show a placeholder)
            };
        });
    }

    function updateDrawnCardsGrid() {
        drawnCardsContainer.innerHTML = '';
        drawnCards.forEach(card => {
            const imgElement = document.createElement('img');
            imgElement.src = `assets/images/${card}`;
            imgElement.alt = card;
            imgElement.style.width = `${DISPLAY_CARD_WIDTH}px`; // Use constant for display width
            imgElement.style.height = 'auto'; // Maintain aspect ratio
            imgElement.style.border = '2px solid #ccc'; // Optional: Add a border for better visibility
            imgElement.style.borderRadius = '8px'; // Optional: Add rounded corners
            drawnCardsContainer.appendChild(imgElement);
        });

        drawnCardsContainer.style.display = 'grid';
        drawnCardsContainer.style.gridTemplateColumns = `repeat(${COLUMNS}, 1fr)`; // 4 columns
        drawnCardsContainer.style.gap = '10px'; // Space between cards
    }
});
