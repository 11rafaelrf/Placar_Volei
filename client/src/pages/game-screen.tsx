import React from 'react';
import { PixelContainer } from '@/components/ui/pixel-container';
import { PixelButton } from '@/components/ui/pixel-button';
import { VolleyballCourt } from '@/components/volleyball-court';
import { playSound } from '@/lib/sounds';
import { GameState } from '@/types/game';
import { useTimer } from '@/lib/useTimer';

interface GameScreenProps {
  gameState: GameState;
  onUpdateScore: (team: 'team1' | 'team2', value: number) => void;
  onUpdateFaults: (team: 'team1' | 'team2', value: number) => void;
  onEndGame: () => void;
}

export function GameScreen({ gameState, onUpdateScore, onUpdateFaults, onEndGame }: GameScreenProps) {
  const { team1, team2 } = gameState;
  const { timer, startTimer, pauseTimer, resetTimer, formatTime } = useTimer();
  
  const handleScoreChange = (team: 'team1' | 'team2', value: number) => {
    onUpdateScore(team, value);
    if (value > 0) {
      playSound('point');
    }
  };
  
  const handleFaultChange = (team: 'team1' | 'team2', value: number) => {
    onUpdateFaults(team, value);
    if (value > 0) {
      playSound('fault');
    }
  };
  
  const handleEndGame = () => {
    pauseTimer();
    onEndGame();
  };
  
  return (
    <PixelContainer>
      {/* Timer e Controles - Agora no topo */}
      <div className="bg-dark p-4 border-4 border-coin-gold mb-6">
        <div className="text-center mb-4">
          <h3 className="text-white mb-2 text-sm">TEMPO</h3>
          <div className="text-coin-gold text-3xl mb-4">{formatTime()}</div>
          <div className="flex justify-center space-x-3">
            <PixelButton 
              variant="luigi-green" 
              size="sm"
              onClick={startTimer}
            >
              INICIAR
            </PixelButton>
            <PixelButton 
              variant="mario-red" 
              size="sm"
              onClick={pauseTimer}
            >
              PAUSAR
            </PixelButton>
            <PixelButton 
              variant="coin-gold" 
              size="sm"
              onClick={resetTimer}
            >
              ZERAR
            </PixelButton>
          </div>
        </div>
        
        <div className="mt-4">
          <PixelButton 
            variant="sky-blue" 
            className="w-full"
            onClick={handleEndGame}
          >
            FINALIZAR JOGO
          </PixelButton>
        </div>
      </div>
      
      {/* Equipes - Agora lado a lado no meio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Equipe 1 */}
        <PixelContainer variant="mario-red" className="p-4">
          <h2 className="text-white text-center text-lg mb-4">{team1.name}</h2>
          <div className="flex flex-col items-center">
            <div className="text-white text-5xl mb-2">{team1.score}</div>
            <div className="flex space-x-4 mt-4">
              <PixelButton 
                variant="white" 
                size="sm"
                onClick={() => handleScoreChange('team1', 1)}
              >
                +
              </PixelButton>
              <PixelButton 
                variant="white" 
                size="sm"
                onClick={() => handleScoreChange('team1', -1)}
              >
                -
              </PixelButton>
            </div>
          </div>
        </PixelContainer>
        
        {/* Equipe 2 */}
        <PixelContainer variant="luigi-green" className="p-4">
          <h2 className="text-white text-center text-lg mb-4">{team2.name}</h2>
          <div className="flex flex-col items-center">
            <div className="text-white text-5xl mb-2">{team2.score}</div>
            <div className="flex space-x-4 mt-4">
              <PixelButton 
                variant="white" 
                size="sm"
                onClick={() => handleScoreChange('team2', 1)}
              >
                +
              </PixelButton>
              <PixelButton 
                variant="white" 
                size="sm"
                onClick={() => handleScoreChange('team2', -1)}
              >
                -
              </PixelButton>
            </div>
          </div>
        </PixelContainer>
      </div>
      
      {/* Volleyball Court */}
      <div className="flex justify-center my-6">
        <VolleyballCourt />
      </div>
      
      {/* Faltas */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <PixelContainer variant="mario-red" className="p-4">
          <h3 className="text-white text-center mb-2 text-sm">FALTAS</h3>
          <div className="flex justify-center items-center">
            <div className="text-white text-3xl">{team1.faults}</div>
            <div className="flex flex-col ml-4">
              <PixelButton 
                variant="white" 
                size="sm" 
                className="mb-2"
                onClick={() => handleFaultChange('team1', 1)}
              >
                +
              </PixelButton>
              <PixelButton 
                variant="white" 
                size="sm"
                onClick={() => handleFaultChange('team1', -1)}
              >
                -
              </PixelButton>
            </div>
          </div>
        </PixelContainer>
        
        <PixelContainer variant="luigi-green" className="p-4">
          <h3 className="text-white text-center mb-2 text-sm">FALTAS</h3>
          <div className="flex justify-center items-center">
            <div className="text-white text-3xl">{team2.faults}</div>
            <div className="flex flex-col ml-4">
              <PixelButton 
                variant="white" 
                size="sm" 
                className="mb-2"
                onClick={() => handleFaultChange('team2', 1)}
              >
                +
              </PixelButton>
              <PixelButton 
                variant="white" 
                size="sm"
                onClick={() => handleFaultChange('team2', -1)}
              >
                -
              </PixelButton>
            </div>
          </div>
        </PixelContainer>
      </div>
    </PixelContainer>
  );
}
