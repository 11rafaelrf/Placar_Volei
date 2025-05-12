import React, { useState } from 'react';
import { PixelContainer } from '@/components/ui/pixel-container';
import { PixelButton } from '@/components/ui/pixel-button';
import { VolleyballCourt } from '@/components/volleyball-court';
import { playSound } from '@/lib/sounds';
import { Team } from '@/types/game';

interface StartScreenProps {
  onStartGame: (team1: Team, team2: Team) => void;
  onShowHistory: () => void;
}

export function StartScreen({ onStartGame, onShowHistory }: StartScreenProps) {
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  
  const handleStartGame = () => {
    const team1 = {
      name: team1Name || 'EQUIPE 1',
      score: 0,
      faults: 0,
    };
    
    const team2 = {
      name: team2Name || 'EQUIPE 2',
      score: 0,
      faults: 0,
    };
    
    playSound('switch');
    onStartGame(team1, team2);
  };
  
  const handleShowHistory = () => {
    playSound('switch');
    onShowHistory();
  };
  
  return (
    <PixelContainer className="p-6 mb-8">
      <h1 className="text-coin-gold text-4xl text-center mb-8">PLACAR DE VÔLEI</h1>
      
      <div className="flex justify-center mb-8">
        <VolleyballCourt />
      </div>
      
      <form className="mb-8" onSubmit={(e) => {
        e.preventDefault();
        handleStartGame();
      }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="team1" className="block text-white mb-2 text-sm">
              EQUIPE 1:
            </label>
            <input 
              type="text" 
              id="team1" 
              className="w-full bg-white border-4 border-black p-2 font-pixel text-dark"
              placeholder="Time 1"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="team2" className="block text-white mb-2 text-sm">
              EQUIPE 2:
            </label>
            <input 
              type="text" 
              id="team2" 
              className="w-full bg-white border-4 border-black p-2 font-pixel text-dark"
              placeholder="Time 2"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <PixelButton 
            type="submit" 
            variant="mario-red" 
            size="lg"
          >
            INICIAR JOGO
          </PixelButton>
        </div>
      </form>
      
      <div className="mt-8">
        <PixelButton 
          variant="luigi-green" 
          className="w-full"
          onClick={handleShowHistory}
        >
          HISTÓRICO DE JOGOS
        </PixelButton>
      </div>
    </PixelContainer>
  );
}
