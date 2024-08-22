document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        'ironman.jpg', 'terminator.jpg', 'tanos.jpg',
        'avangers.jpg', 'guardians.jpg', 'cap.jpg'
        // Add more card filenames here
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

        // Add the card to the drawn cards container
        const imgElement = document.createElement('img');
        imgElement.src = `assets/images/${drawnCard}`;
        imgElement.alt = drawnCard;
        drawnCardsContainer.appendChild(imgElement);
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
});
