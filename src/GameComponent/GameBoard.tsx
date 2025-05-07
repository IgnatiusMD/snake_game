import { useRef, useEffect } from 'react';
import GameControls from './GameControls';
import GameOverModal from './GameOverModal';
import { useSnakeGame } from '../Hooks/useSnakeGame';

const CELL_SIZE = 15;
const BOARD_SIZE = 20;

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    snake,
    food,
    score,
    gameOver,
    isPaused,
    changeDirection,
    resetGame,
    togglePause
  } = useSnakeGame(BOARD_SIZE);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          changeDirection('UP');
          break;
        case 'ArrowDown':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
          changeDirection('RIGHT');
          break;
        case ' ':
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeDirection, togglePause]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1A1F2C';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = '#F97316';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw snake
    ctx.fillStyle = '#8B5CF6';
    snake.forEach((segment, i) => {
      // Head is slightly darker
      if (i === 0) {
        ctx.fillStyle = '#7C3AED';
      } else {
        ctx.fillStyle = '#8B5CF6';
      }
      
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });

  }, [snake, food]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-slate-800 h-screen"> 
      <div className="flex flex-col items-center bg-[#22242B] px-4 py-8 gap-4">
        <div className="flex justify-between items-center w-full max-w-[300px] mb-2">
          <div className="font-semibold text-white">Score: {score}</div>
          <button 
            onClick={togglePause}
            className="px-4 py-1 bg-[#9c60fc] rounded hover:cursor-pointer hover:bg-[#aa78fa] duration-300 ease-in-out"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
        
        <div className="relative border-2 border-[#9c60fc] rounded">
          <canvas
            ref={canvasRef}
            width={BOARD_SIZE * CELL_SIZE}
            height={BOARD_SIZE * CELL_SIZE}
            className="bg-snake-bg"
          />
          
          {gameOver && (
            <GameOverModal score={score} onRestart={resetGame} />
          )}
          
          {isPaused && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
              <div className="bg-white flex flex-col justify-center p-4 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-2">Game Paused</h2>
                <button 
                  onClick={togglePause}
                  className="px-4 py-2 bg-[#9c60fc] text-white rounded hover:cursor-pointer hover:bg-[#aa78fa] duration-300 ease-in-out"
                >
                  Resume
                </button>
              </div>
            </div>
          )}
        </div>
        
        <GameControls onDirectionChange={changeDirection} />
      </div>
    </div>
  );
};

export default GameBoard;