const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to fill the mobile screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the puzzle image
const img = new Image();
img.src = 'assets/puzzle.jpg'; // Make sure this matches your file path

// Puzzle Settings
const rows = 3;
const cols = 3;
let pieces = [];
let pieceWidth, pieceHeight;

// Wait for the image to load before doing math
img.onload = () => {
    // Calculate how big each piece should be based on the image size
    pieceWidth = img.width / cols;
    pieceHeight = img.height / rows;

    createGrid();
    drawPuzzle();
};

function createGrid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Create a piece object that remembers its original spot AND its current spot
            pieces.push({
                sx: c * pieceWidth,  // Source X (Where to cut from the image)
                sy: r * pieceHeight, // Source Y (Where to cut from the image)
                
                // Destination coordinates on the canvas
                // We add a +5 gap here just so you can visually see the separate slices
                x: c * (pieceWidth + 5) + 50, 
                y: r * (pieceHeight + 5) + 50  
            });
        }
    }
}

function drawPuzzle() {
    // Clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw each piece
    pieces.forEach(piece => {
        ctx.drawImage(
            img, 
            piece.sx, piece.sy, pieceWidth, pieceHeight, // 1. Crop this area from the image
            piece.x, piece.y, pieceWidth, pieceHeight    // 2. Draw it here on the canvas
        );
    });
}
