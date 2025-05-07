import React from 'react'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface GameControlsProps {
  onDirectionChange: (direction: Direction) => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onDirectionChange }) => {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2 w-[150px]">
      <div></div>
      <button
        onClick={() => onDirectionChange('UP')}
        className="bg-[#9c60fc] rounded-lg p-2 flex justify-center items-center hover:bg-opacity-80 transition hover:cursor-pointer"
        aria-label="Move Up"
      >
        <ArrowUp className="text-white" />
      </button>
      <div></div>
      
      <button
        onClick={() => onDirectionChange('LEFT')}
        className="bg-[#9c60fc] rounded-lg p-2 flex justify-center items-center hover:bg-opacity-80 transition hover:cursor-pointer"
        aria-label="Move Left"
      >
        <ArrowLeft className="text-white" />
      </button>
      
      <div></div>
      
      <button
        onClick={() => onDirectionChange('RIGHT')}
        className="bg-[#9c60fc] rounded-lg p-2 flex justify-center items-center hover:bg-opacity-80 transition hover:cursor-pointer"
        aria-label="Move Right"
      >
        <ArrowRight className="text-white" />
      </button>
      
      <div></div>
      <button
        onClick={() => onDirectionChange('DOWN')}
        className="bg-[#9c60fc] rounded-lg p-2 flex justify-center items-center hover:bg-opacity-80 transition hover:cursor-pointer"
        aria-label="Move Down"
      >
        <ArrowDown className="text-white" />
      </button>
      <div></div>
    </div>
  );
};

export default GameControls;