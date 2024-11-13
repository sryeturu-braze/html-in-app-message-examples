let canvas;
let ctx;

let isDrawing = false;

function setupCanvas() {
    canvas = document.getElementById('scratchCanvas');
    canvas.getContext('2d');
    ctx = canvas.getContext('2d');

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

    // Set the canvas to match the size of the container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // draw the front image onto the canvas and remove the placeholder
    let frontImage = document.getElementById('frontImage');
    frontImage.style.display = 'block';

    let backImage = document.getElementById('revealImage');
    backImage.style.display = 'block';

    ctx.drawImage(frontImage, 0, 0, canvas.width, canvas.height);
    frontImage.remove();
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
    ctx.arc(x, y, 40, 0, Math.PI * 2, true); // 40px is the radius of the circle
    ctx.fill();
}

const frontImage = document.getElementById('frontImage');
const backImage = document.getElementById('revealImage');

Promise.all([
    frontImage.decode(),
    backImage.decode()
]).then(() => {
    setupCanvas();
}).catch((error) => {
    console.error("Image decoding failed", error);
});
