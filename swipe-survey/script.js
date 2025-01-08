const REQUIRED_SWIPE_DISTANCE_IN_PX = 150;
const likedItems = [];
const dislikedItems = [];

const cardsData = [
	{
		img: 'https://picsum.photos/id/12/300',
		title: 'Item #1 Title',
		name: 'item_1',
	},
	{
		img: 'https://picsum.photos/id/15/300',
		title: 'Item #2 Title',
		name: 'item_2',
	},
	{
		img: 'https://picsum.photos/id/29/300',
		title: 'Item #3 Title',
		name: 'item_3',
	},
	{
		img: 'https://picsum.photos/id/27/300',
		title: 'Item #4 Title',
		name: 'item_4',
	},
];

const cardStack = document.getElementById('card-stack');

function createCards(data) {
	data.reverse().forEach((item) => {
		const card = document.createElement('div');
		card.classList.add('card');
		card.setAttribute('data-name', item.name);
		card.innerHTML = `
			<img src="${item.img}" alt="${item.title}">
			<h3>${item.title}</h3>
		`;
		cardStack.appendChild(card);

		let offsetX = 0;
		let offsetY = 0;
		let isDragging = false;

		card.addEventListener('touchstart', (e) => {
			e.preventDefault();
			isDragging = true;
			offsetX = e.touches[0].clientX - card.offsetLeft;
			offsetY = e.touches[0].clientY - card.offsetTop;
			card.style.transition = 'none';
			document.addEventListener('touchmove', moveCard);
			document.addEventListener('touchend', releaseCard);
		});

		card.addEventListener('pointerdown', (e) => {
			isDragging = true;
			offsetX = e.clientX - card.offsetLeft;
			offsetY = e.clientY - card.offsetTop;
			card.style.transition = 'none';
			document.addEventListener('pointermove', moveCard);
			document.addEventListener('pointerup', releaseCard);
		});

		function moveCard(e) {
			if (!isDragging) return; // Only move if dragging is true

			const image = card.querySelector('img');
			const title = card.querySelector('h3');
			image.style.pointerEvents = 'none';
			title.style.pointerEvents = 'none';

			let moveX, moveY;
			if (e.touches) {
				moveX = e.touches[0].clientX - offsetX;
				moveY = e.touches[0].clientY - offsetY;
			} else {
				moveX = e.clientX - offsetX;
				moveY = e.clientY - offsetY;
			}
			
			card.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX / 10}deg)`;
		}

		function releaseCard(e) {
			isDragging = false; // Reset dragging to false

			let moveX;
			if (e.changedTouches) {
				moveX = e.changedTouches[0].clientX - offsetX;
			} else {
				moveX = e.clientX - offsetX;
			}

			const cardName = card.getAttribute('data-name');
			if (moveX > REQUIRED_SWIPE_DISTANCE_IN_PX) {
				card.classList.add('like');
				likedItems.push(cardName);
			} else if (moveX < -REQUIRED_SWIPE_DISTANCE_IN_PX) {
				card.classList.add('dislike');
				dislikedItems.push(cardName);
			}

			if (Math.abs(moveX) > REQUIRED_SWIPE_DISTANCE_IN_PX) {
				// remove the card if it has been swiped the required distance
				setTimeout(() => {
					card.remove();
					if (cardStack.children.length === 0) {
						logUserFeedbackAndCloseBraze();
					}
				}, 300);
			} else {
				// place the card back in starting position
				card.style.transform = 'translate(0, 0)';
				card.style.transition = 'transform 0.3s ease-out';
			}

			// Remove event listeners after release
			document.removeEventListener('touchmove', moveCard);
			document.removeEventListener('touchend', releaseCard);
			document.removeEventListener('pointermove', moveCard);
			document.removeEventListener('pointerup', releaseCard);
		}
	});
}

function logUserFeedbackAndCloseBraze() {
	brazeBridge.getUser().setCustomUserAttribute("liked_items", likedItems);	
	brazeBridge.getUser().setCustomUserAttribute("disliked_items", dislikedItems);	
	brazeBridge.closeMessage();
}

function handleCardRemoval(card, action) {
	const cardName = card.getAttribute('data-name');
	if (action === 'like') {
		card.classList.add('like');
		likedItems.push(cardName);
	} else if (action === 'dislike') {
		card.classList.add('dislike');
		dislikedItems.push(cardName);
	} else {
		card.classList.add('skip');
	}
	
	setTimeout(() => {
		card.remove();
		if (cardStack.children.length === 0) {
			logUserFeedbackAndCloseBraze();
		}
	}, 450);
}

const likeButton = document.getElementById('like-button');
const dislikeButton = document.getElementById('dislike-button');
const skipButton = document.getElementById('skip-button');

likeButton.addEventListener('click', () => {
	const topCard = cardStack.lastElementChild;
	if (topCard) {
		handleCardRemoval(topCard, 'like');
	}
});

dislikeButton.addEventListener('click', () => {
	const topCard = cardStack.lastElementChild;
	if (topCard) {
		handleCardRemoval(topCard, 'dislike');
	}
});

skipButton.addEventListener('click', () => {
	const topCard = cardStack.lastElementChild;
	if (topCard) {
		handleCardRemoval(topCard, 'skip');
	}
});

createCards(cardsData);