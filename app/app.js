document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        '01_avangers.jpg', 
        '02_avengers-endgame-batalla-final.jpg', 
        '03_avengers-endgame.jpg', 
        '04_avengers-era-de-ultron.jpg', 
        '05_bad_tanos.jpg', 
        '06_cap.jpg', 
        '07_espacio-estrellas-universo-nebulosa.jpg', 
        '08_guardians.jpg', 
        '09_ironman.jpg', 
        '10_marvel-studios-logo.jpg', 
        '11_nebula-del-espacio.jpg', 
        '12_ninos-en-el-espacio.jpg', 
        '13_pelicula-guardianes-de-la-galaxia.jpg', 
        '14_tanos.jpg', 
        '15_terminator.jpg', 
        '16_tierra-y-luna-a-la-luz-del-sol.jpg'
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
            return;
        }

        // Randomly select a card
        const randomIndex = Math.floor(Math.random() * cards.length);
        const drawnCard = cards.splice(randomIndex, 1)[0];
        drawnCards.push(drawnCard);

        // Update the current card image
        currentCardImg.src = `assets/images/${drawnCard}`;
        currentCardImg.alt = drawnCard;

        // Update the drawn cards grid
        updateDrawnCardsGrid();
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
        updateDrawnCardsGrid();

        alert('El cartón será reiniciado!!!');
    });

    function updateDrawnCardsGrid() {
        // Clear the grid container
        drawnCardsContainer.innerHTML = '';

        // Add the drawn cards to the grid
        drawnCards.forEach(card => {
            const imgElement = document.createElement('img');
            imgElement.src = `assets/images/${card}`;
            imgElement.alt = card;
            drawnCardsContainer.appendChild(imgElement);
        });
    }
});
