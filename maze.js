const levels = [
    [
        "##########",
        "#        #",
        "######## #",
        "#        #",
        "# ########",
        "#        #",
        "######## #",
        "#        #",
        "# ########",
        "#        #",
        "##########"
    ],
    [
        "##########",
        "#        #", 
        "# ########",
        "# #      #",
        "# # #### #",
        "# # #    #",
        "# # # ####",
        "# # #    #",
        "# # #### #",
        "#   #    #",
        "##########",

    ],
    [
        "##########",
        "#       ##",
        "# ########",
        "# #      #",
        "# # #### #",
        "# #    # #",
        "# #### # #",
        "#      # #",
        "######## #",
        "#        #",
        "##########"
    ],
    [
        "##########",
        "#        #",
        "# ###### #",
        "# #      #",
        "# # ######",
        "# #      #",
        "#### #####",
        "#        #",
        "# ########",
        "#        #",
        "##########"
    ],
    [
        "##########",
        "#        #",
        "# ###### #",
        "# #      #",
        "# # ######",
        "# #      #",
        "##### ####",
        "#        #",
        "# #########",
        "#        #",
        "##########"
    ]
    
    
    
];

const canvas = document.getElementById("mazeCanvas");
const context = canvas.getContext("2d");
const cellSize = 40;
let currentLevel = 0;

const player = {
    x: 1,
    y: 1,
    image: new Image()
};
player.image.src = "rakas.png";

const goal = {
    x: 8,
    y: 9,
    image: new Image()
};
goal.image.src = "mä.png";

const meImage = new Image();
meImage.src = "me.png";

let imagesLoaded = 0;
const totalImages = 3; // Kuva-arvojen määrä (player, goal, meImage)

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        drawMaze();
    }
}

player.image.onload = checkImagesLoaded;
goal.image.onload = checkImagesLoaded;
meImage.onload = checkImagesLoaded;

function drawMaze() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const level = levels[currentLevel];
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            if (level[y][x] === "#") {
                context.fillStyle = "black";
                context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
    context.drawImage(player.image, player.x * cellSize, player.y * cellSize, cellSize, cellSize);
    context.drawImage(goal.image, goal.x * cellSize, goal.y * cellSize, cellSize, cellSize);
}

function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (levels[currentLevel][newY][newX] === " ") {
        player.x = newX;
        player.y = newY;
    }
    if (player.x === goal.x && player.y === goal.y) {
        currentLevel++;
        if (currentLevel >= levels.length) {
            document.getElementById("maze").classList.add("hidden");
            document.getElementById("completed").classList.remove("hidden");
            document.getElementById("mazeCanvas").classList.add("hidden");
            document.getElementById("arrowControls").classList.add("hidden");
        } else {
            player.x = 1;
            player.y = 1;
        }
    }
    drawMaze();
}

document.getElementById("arrowUp").addEventListener("click", () => movePlayer(0, -1));
document.getElementById("arrowDown").addEventListener("click", () => movePlayer(0, 1));
document.getElementById("arrowLeft").addEventListener("click", () => movePlayer(-1, 0));
document.getElementById("arrowRight").addEventListener("click", () => movePlayer(1, 0));

// Kosketustapahtumien käsittely
function handleTouch(event, direction) {
    event.preventDefault();
    switch (direction) {
        case 'up':
            movePlayer(0, -1);
            break;
        case 'down':
            movePlayer(0, 1);
            break;
        case 'left':
            movePlayer(-1, 0);
            break;
        case 'right':
            movePlayer(1, 0);
            break;
    }
}

document.getElementById("arrowUp").addEventListener("touchstart", (e) => handleTouch(e, 'up'));
document.getElementById("arrowDown").addEventListener("touchstart", (e) => handleTouch(e, 'down'));
document.getElementById("arrowLeft").addEventListener("touchstart", (e) => handleTouch(e, 'left'));
document.getElementById("arrowRight").addEventListener("touchstart", (e) => handleTouch(e, 'right'));

drawMaze();
