import React from 'react';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-[250px] animate-grow">
        <h2 className="text-2xl font-bold mb-2">Game Over</h2>
        <p className="mb-4">Your score: <span className="font-bold">{score}</span></p>
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-snake-body text-black rounded-md bg-[#9c60fc] hover:cursor-pointer hover:bg-[#aa78fa] duration-300 ease-in-out"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;