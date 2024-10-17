let canvas;
let ctx;

let frontImage = document.getElementById('frontImage');
let backImage = document.getElementById('backImage');

let isDrawing = false;

function setupCanvas() {
    canvas = document.getElementById('scratchCanvas');
    canvas.getContext('2d');
    ctx = canvas.getContext('2d');

    console.log("setting up canvas");

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

    // Load the front image onto the canvas
    let frontImage = document.getElementById('frontImage');
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
    ctx.arc(x, y, 27, 0, Math.PI * 2, true); // 27 is the radius of the circle
    ctx.fill();
}

// wait for images to load before starting scratch off IAM
Promise.all([
    new Promise((resolve, reject) => {
        if (frontImage.complete) {
            resolve(); // Image is already loaded
        } else {
            frontImage.onload = resolve;
        }
    }),
    new Promise((resolve, reject) => {
        if (backImage.complete) {
            resolve(); // Image is already loaded
        } else {
            backImage.onload = resolve;
        }
    })
]).then(() => {
    setupCanvas();
});