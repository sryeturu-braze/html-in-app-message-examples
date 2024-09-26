const gameBoard = document.querySelector('.memory-game');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let cardsFlipped = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const cards = Array.from(document.querySelectorAll('.memory-card'));
    const shuffledCards = shuffle(cards);

    shuffledCards.forEach(card => {
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardsFlipped += 2;

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    if (cardsFlipped === document.querySelectorAll('.memory-card').length) {
        const overlay = document.querySelector('.fireworks-overlay');
        overlay.classList.remove('hide');

        const fireworks = new Fireworks(overlay);
        fireworks.start();

        const fireworksDuration = 2000;
        const fadeOutDuration = 2500;

        setTimeout(() => {
            overlay.classList.add('fade-out');
            document.querySelector('.memory-game').classList.add("hide");
            document.querySelector('.promo-code').classList.remove("hide");

            setTimeout(() => {
                fireworks.stop();
                overlay.classList.add('hide');
            }, fadeOutDuration);
        }, fireworksDuration);

        return;
    }

    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

createBoard();