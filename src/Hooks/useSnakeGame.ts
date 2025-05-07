import { useState, useEffect, useCallback } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

export const useSnakeGame = (boardSize: number) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 5, y: 5 }]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [food, setFood] = useState<Position>(() => generateInitialFood([{ x: 5, y: 5 }], boardSize));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(150);
  const [isStarted, setIsStarted] = useState(false);

  // Generates a valid food position not on the snake
  const generateFood = useCallback((): Position => {
    let newFood: Position;
    let occupied = new Set(snake.map(seg => `${seg.x},${seg.y}`));

    do {
      newFood = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
    } while (occupied.has(`${newFood.x},${newFood.y}`));

    return newFood;
  }, [boardSize]);

  // Change direction with 180-turn prevention
  const changeDirection = useCallback((newDirection: Direction) => {
    if (
      (direction === 'UP' && newDirection === 'DOWN') ||
      (direction === 'DOWN' && newDirection === 'UP') ||
      (direction === 'LEFT' && newDirection === 'RIGHT') ||
      (direction === 'RIGHT' && newDirection === 'LEFT')
    ) {
      return;
    }
    setDirection(newDirection);
  }, [direction]);

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          changeDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          changeDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection]);

  // Reset game state
  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 5, y: 5 }];
    setSnake(initialSnake);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setFood(generateInitialFood(initialSnake, boardSize));
    setIsPaused(false);
    setSpeed(150);
  }, [boardSize]);

  const togglePause = useCallback(() => {
    if (!gameOver) {
      setIsPaused(prev => !prev);
    }
  }, [gameOver]);

  // Main game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        switch (direction) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Wall collision
        if (head.x < 0 || head.y < 0 || head.x >= boardSize || head.y >= boardSize) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Eat food
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 1);
          const newFood = generateFood();
          setFood(newFood);

          // Increase speed every 5 points
          if ((score + 1) % 5 === 0) {
            setSpeed(prev => Math.max(prev - 10, 70));
          }
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, isPaused, boardSize, generateFood, score, speed]);

  return {
    snake,
    food,
    direction,
    score,
    gameOver,
    isPaused,
    speed,
    isStarted,
    setIsStarted,
    changeDirection,
    resetGame,
    togglePause,
  };  
};

// Static food generator for first load or reset
function generateInitialFood(snake: Position[], boardSize: number): Position {
  let newFood: Position;
  let occupied = new Set(snake.map(seg => `${seg.x},${seg.y}`));

  do {
    newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (occupied.has(`${newFood.x},${newFood.y}`));

  return newFood;
}
