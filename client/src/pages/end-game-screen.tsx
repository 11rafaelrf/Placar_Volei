import React from 'react';
import { PixelContainer } from '@/components/ui/pixel-container';
import { PixelButton } from '@/components/ui/pixel-button';
import { Trophy } from '@/components/trophy';
import { GameState } from '@/types/game';
import { playSound } from '@/lib/sounds';

interface EndGameScreenProps {
  gameState: GameState;
  gameTime: string;
  onSaveGame: () => void;
  onNewGame: () => void;
}

export function EndGameScreen({ gameState, gameTime, onSaveGame, onNewGame }: EndGameScreenProps) {
  const { team1, team2 } = gameState;
  
  const determineWinner = () => {
    if (team1.score > team2.score) {
      return team1.name;
    } else if (team2.score > team1.score) {
      return team2.name;
    } else {
      return "EMPATE";
    }
  };
  
  const handleSaveGame = () => {
    playSound('switch');
    onSaveGame();
  };
  
  const handleNewGame = () => {
    playSound('switch');
    onNewGame();
  };
  
  return (
    <PixelContainer className="p-8">
      <h2 className="text-coin-gold text-center text-2xl mb-6">FIM DE JOGO</h2>
      
      <div className="flex justify-center mb-8">
        <Trophy />
      </div>
      
      <PixelContainer variant="coin-gold" className="p-6 mb-8">
        <h3 className="text-dark text-center mb-2">VENCEDOR</h3>
        <p className="text-dark text-center text-2xl">{determineWinner()}</p>
      </PixelContainer>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PixelContainer variant="mario-red" className="p-4">
          <h4 className="text-white text-center mb-2">{team1.name}</h4>
          <p className="text-white text-center text-3xl">{team1.score}</p>
        </PixelContainer>
        
        <PixelContainer variant="luigi-green" className="p-4">
          <h4 className="text-white text-center mb-2">{team2.name}</h4>
          <p className="text-white text-center text-3xl">{team2.score}</p>
        </PixelContainer>
      </div>
      
      <PixelContainer variant="sky-blue" className="p-4 mb-8">
        <h4 className="text-white text-center mb-2">TEMPO TOTAL</h4>
        <p className="text-white text-center text-xl">{gameTime}</p>
      </PixelContainer>
      
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <PixelButton 
          variant="luigi-green"
          onClick={handleSaveGame}
        >
          SALVAR JOGO
        </PixelButton>
        <PixelButton 
          variant="mario-red"
          onClick={handleNewGame}
        >
          NOVO JOGO
        </PixelButton>
      </div>
    </PixelContainer>
  );
}
