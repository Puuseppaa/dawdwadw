document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pongCanvas');
    const pongCanvas = document.getElementById('pongCanvas');
    const context = canvas.getContext('2d');
    const paddleSlider = document.getElementById('paddleSlider');
    const pongContainer = document.getElementById('pongContainer');
    const startButton = document.getElementById('startButton');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const restartButton = document.getElementById('restartButton');
    const restartButtonVictory = document.getElementById('restartButtonVictory');
    const victoryScreen = document.getElementById('victoryScreen');

    const paddleWidth = 100;
    const paddleHeight = 10;
    const ballRadius = 10;

    let paddleX = (canvas.width - paddleWidth) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height - 30;
    let ballSpeedX = 2;
    let ballSpeedY = -2;
    let gameStarted = false;

    const blocks = [];
    const blockRowCount = 3;
    const blockColumnCount = 3;
    const blockWidth = 150;
    const blockHeight = 40;
    const blockPadding = 10;
    const blockOffsetTop = 10;
    const blockOffsetLeft = -50;

    const blockImage = new Image();
    blockImage.src = 'AntonJahtaa.png';

    for (let c = 0; c < blockColumnCount; c++) {
        blocks[c] = [];
        for (let r = 0; r < blockRowCount; r++) {
            blocks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    function drawPaddle() {
        context.beginPath();
        context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        context.fillStyle = '#0095DD';
        context.fill();
        context.closePath();
    }

    function drawBall() {
        context.beginPath();
        context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        context.fillStyle = '#0095DD';
        context.fill();
        context.closePath();
    }

    function drawBlocks() {
        for (let c = 0; c < blockColumnCount; c++) {
            for (let r = 0; r < blockRowCount; r++) {
                if (blocks[c][r].status === 1) {
                    const blockX = c * (blockWidth + blockPadding) + blockOffsetLeft;
                    const blockY = r * (blockHeight + blockPadding) + blockOffsetTop;
                    blocks[c][r].x = blockX;
                    blocks[c][r].y = blockY;
                    context.drawImage(blockImage, blockX, blockY, blockWidth, blockHeight);
                }
            }
        }
    }

    function collisionDetection() {
        for (let c = 0; c < blockColumnCount; c++) {
            for (let r = 0; r < blockRowCount; r++) {
                const block = blocks[c][r];
                if (block.status === 1) {
                    if (
                        ballX > block.x &&
                        ballX < block.x + blockWidth &&
                        ballY > block.y &&
                        ballY < block.y + blockHeight
                    ) {
                        ballSpeedY = -ballSpeedY;
                        block.status = 0;
                        if (isGameWon()) {
                            endGame(true);
                            return;
                        }
                    }
                }
            }
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBlocks();
        drawBall();
        drawPaddle();
        collisionDetection();

        if (ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius) {
            ballSpeedX = -ballSpeedX;
        }
        if (ballY + ballSpeedY < ballRadius) {
            ballSpeedY = -ballSpeedY;
        } else if (ballY + ballSpeedY > canvas.height - ballRadius) {
            if (ballX > paddleX && ballX < paddleX + paddleWidth) {
                ballSpeedY = -ballSpeedY;
            } else {
                endGame(false);
                return;
            }
        }

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (gameStarted) {
            requestAnimationFrame(draw);
        }
    }

    function startGame() {
        startButton.style.display = 'none';
        canvas.classList.remove('hidden');
        paddleSlider.classList.remove('hidden');
        pongContainer.classList.remove('hidden');
        gameStarted = true;
        draw();
    }

    function endGame(won) {
        gameStarted = false;
    
        // Näytä voittoruutu tai häviöruutu riippuen pelin tuloksesta
        if (won) {
            victoryScreen.style.display = 'block';
        } else {
            gameOverScreen.style.display = 'block';
        }
    
        // Piilota canvas ja slider
        canvas.classList.add('hidden');
        paddleSlider.classList.add('hidden');
        pongContainer.classList.add('hidden');
    }
    

    // Testaa, että funktio toimii
    endGame(false); // Vaihda tru

    function resetGame() {
        gameOverScreen.style.display = 'none';
        victoryScreen.style.display = 'none';
        startButton.style.display = 'block';
        canvas.classList.remove('hidden');
        paddleSlider.classList.remove('hidden');
        pongContainer.classList.remove('hidden');
        ballX = canvas.width / 2;
        ballY = canvas.height - 30;
        paddleX = (canvas.width - paddleWidth) / 2;
        ballSpeedX = 2;
        ballSpeedY = -2;
        for (let c = 0; c < blockColumnCount; c++) {
            for (let r = 0; r < blockRowCount; r++) {
                blocks[c][r].status = 1;
            }
        }
        gameStarted = false;
    }

    function isGameWon() {
        for (let c = 0; c < blockColumnCount; c++) {
            for (let r = 0; r < blockRowCount; r++) {
                if (blocks[c][r].status === 1) {
                    return false;
                }
            }
        }
        return true;
    }

    paddleSlider.addEventListener('input', function (e) {
        paddleX = parseInt(paddleSlider.value) - paddleWidth / 2;
    });

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', resetGame);
    restartButtonVictory.addEventListener('click', resetGame);

    canvas.addEventListener('mousemove', function (e) {
        const relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    });

    resetGame();
});
