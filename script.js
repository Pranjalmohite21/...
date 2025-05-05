const dino = document.querySelector(".dinosaur");
const obstacle = document.querySelector(".obstacle");
const scoreDisplay = document.querySelector(".score");

let isJumping = false;
let score = 0;
let gameOver = false;

// Jump function
function jump() {
  if (isJumping) return;
  isJumping = true;

  let position = 0;
  const upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

// Obstacle movement
function startObstacleAnimation() {
  obstacle.style.left = "100%";
  obstacle.style.animation = "moveObstacle 2s linear infinite";
}

// Collision detection & scoring
const gameLoop = setInterval(() => {
  const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

  if (obstacleLeft < 50 && obstacleLeft > 0 && dinoBottom < 50) {
    obstacle.style.animation = "none";
    obstacle.style.left = obstacleLeft + "px";
    alert("Game Over! Your score: " + score);
    clearInterval(gameLoop);
    gameOver = true;
  }

  if (!gameOver) {
    score++;
    scoreDisplay.innerText = "Score: " + score;
  }
}, 100);

// Event listener for jump
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});

startObstacleAnimation();