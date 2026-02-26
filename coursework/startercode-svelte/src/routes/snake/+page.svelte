<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let snake = [{ x: 150, y: 150 }];
  let food = { x: 0, y: 0 };
  let direction = { x: 0, y: 0 };
  let gridSize = 15;
  let isGameRunning = false;
  let gameLoop: ReturnType<typeof setInterval>;
  let score = 0;

  function startGame() {
    isGameRunning = true;
    snake = [{ x: 150, y: 150 }];
    direction = { x: 0, y: 0 };
    score = 0;
    placeFood();
    gameLoop = setInterval(updateGame, 100);
    drawGame();
  }

  function stopGame() {
    isGameRunning = false;
    clearInterval(gameLoop);
  }

  function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  }

  function updateGame() {
    if (!isGameRunning) return;

    console.log('Current direction:', direction);
    console.log('Snake before move:', snake);

    // Move snake
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };

    // Check for collisions
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= canvas.width ||
      head.y >= canvas.height ||
      snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      stopGame();
      return;
    }

    // Add new head to the snake
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      score++;
      placeFood();
    } else {
      // Remove the tail
      snake.pop();
    }

    console.log('Snake after move:', snake);

    // Draw everything
    drawGame();
  }

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.forEach((segment) => {
      ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw the score
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
  }

  function changeDirection(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);
    if (event.key === 'ArrowUp' && direction.y === 0) {
      direction = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && direction.y === 0) {
      direction = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && direction.x === 0) {
      direction = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x === 0) {
      direction = { x: 1, y: 0 };
    }
    console.log('Direction updated to:', direction);
  }

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    canvas.width = 300;
    canvas.height = 300;

    window.addEventListener('keydown', changeDirection);

    return () => {
      window.removeEventListener('keydown', changeDirection);
    };
  });
</script>

<h1>Snake Game</h1>
<canvas bind:this={canvas}></canvas>
<div class="controls">
  <button on:click={startGame} disabled={isGameRunning}>START</button>
  <button on:click={stopGame}>STOP</button>
</div>

<style>
  h1 {
    text-align: center;
    color: #1f2937;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  canvas {
    display: block;
    margin: 0 auto;
    border: 2px solid #1d4ed8;
    background-color: #e5e7eb;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #1d4ed8;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  button:hover:enabled {
    background-color: #2563eb;
  }
</style>