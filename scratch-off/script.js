console.log("blob");

const frontImageSrc = 'front.png'; // Path to front image
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;

function setupCanvas() {
    // Set the canvas to match the size of the container (400x400px)
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Load the front image onto the canvas
    const frontImage = new Image();
    frontImage.src = frontImageSrc;
    frontImage.onload = () => {
        // Scale the front image to fit the canvas
        ctx.drawImage(frontImage, 0, 0, canvas.width, canvas.height);
    };
}

function startDrawing(event) {
    isDrawing = true;
    draw(event);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath(); // Reset the path after drawing
}

function draw(event) {
    if (!isDrawing) return;

    // Get the mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left + 15;
    const y = event.clientY - rect.top + 25;

    // Clear a circular area where the cursor is located
    ctx.globalCompositeOperation = 'destination-out'; // This mode allows us to erase
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2, true); // 20 is the radius of the circle
    ctx.fill(); // Fill the circular area to clear it
}

// Event listeners for mouse interactions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Event listeners for touch interactions (for mobile support)
canvas.addEventListener('touchstart', (e) => {
    startDrawing(e.touches[0]);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', (e) => {
    draw(e.touches[0]);
});

// Initialize the canvas with the front image
setupCanvas();