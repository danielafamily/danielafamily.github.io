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
