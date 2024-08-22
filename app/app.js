document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        'ironman.jpg', 'terminator.jpg', 'tanos.jpg',
        'avangers.jpg', 'guardians.jpg', 'cap.jpg',
        'bad_tanos.jpg', 'avengers-era-de-ultron.jpg',
        'avengers-endgame-batalla-final.jpg', 'marvel-studios-logo.jpg',
        'avengers-endgame.jpg', 'marvel-studios-logo.jpg',
        'nebula-del-espacio.jpg', 'tierra-y-luna-a-la-luz-del-sol.jpg',
        'pelicula-guardianes-de-la-galaxia.jpg', 'espacio-estrellas-universo-nebulosa.jpg'
        // Add more card filenames here if needed
    ];

    let originalDeck = [...cards]; // Copy of the original deck to reset later
    let drawnCards = [];
    const currentCardImg = document.getElementById('current-card');
    const drawCardBtn = document.getElementById('draw-card');
    const resetGameBtn = document.getElementById('reset-game');
    const drawnCardsContainer = document.getElementById('drawn-cards');

    drawCardBtn.addEventListener('click', () => {
        if (cards.length === 0) {
            alert('El Cartón está lleno!!!');
            generatePDF(); // Generate PDF when all cards are drawn
            return;
        }

        // Randomly select a card
        const randomIndex = Math.floor(Math.random() * cards.length);
        const drawnCard = cards.splice(randomIndex, 1)[0];
        drawnCards.push(drawnCard);

        // Update the current card image
        currentCardImg.src = `assets/images/${drawnCard}`;
        currentCardImg.alt = drawnCard;

        // Add the card to the drawn cards container
        const imgElement = document.createElement('img');
        imgElement.src = `assets/images/${drawnCard}`;
        imgElement.alt = drawnCard;
        drawnCardsContainer.appendChild(imgElement);

        // Check if 16 cards have been drawn, then generate PDF
        if (drawnCards.length === 16) {
            alert('El Cartón está lleno!!!');
            generatePDF(); // Generate PDF when all cards are drawn
        }
    });

    resetGameBtn.addEventListener('click', () => {
        // Reset the deck and drawn cards
        cards.length = 0;
        cards.push(...originalDeck);
        drawnCards = [];

        // Clear the current card display
        currentCardImg.src = '';
        currentCardImg.alt = '';

        // Clear the drawn cards display
        while (drawnCardsContainer.firstChild) {
            drawnCardsContainer.removeChild(drawnCardsContainer.firstChild);
        }

        alert('El cartón será reiniciado!!!');
    });

    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text('Cartón de Lotería', 105, 20, null, null, 'center');

        // Positioning variables
        const startX = 20;
        const startY = 30;
        const cardWidth = 40;
        const cardHeight = 60;
        let x = startX;
        let y = startY;

        // Loop through the drawn cards and add them to the PDF
        drawnCards.forEach((card, index) => {
            doc.addImage(`assets/images/${card}`, 'JPEG', x, y, cardWidth, cardHeight);

            // Move to the next column
            x += cardWidth + 10;

            // Move to the next row after 4 columns
            if ((index + 1) % 4 === 0) {
                x = startX;
                y += cardHeight + 10;
            }
        });

        // Save the PDF with a specific name
        doc.save('carton_loteria.pdf');
    }
});
