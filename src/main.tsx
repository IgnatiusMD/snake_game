import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GameBoard from './GameComponent/GameBoard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameBoard />
  </StrictMode>,
)
