import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { StartScreen } from "@/pages/start-screen";
import { GameScreen } from "@/pages/game-screen";
import { EndGameScreen } from "@/pages/end-game-screen";
import { HistoryScreen } from "@/pages/history-screen";
import { Team, GameState, GameRecord } from "@/types/game";
import { playSound } from "@/lib/sounds";
import { apiRequest } from "@/lib/queryClient";

type Screen = 'start' | 'game' | 'end' | 'history';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [gameState, setGameState] = useState<GameState>({
    team1: { name: '', score: 0, faults: 0 },
    team2: { name: '', score: 0, faults: 0 },
    timer: { seconds: 0, minutes: 0, isRunning: false }
  });
  const [gameTime, setGameTime] = useState('00:00');
  
  // Start game with team setup
  const handleStartGame = (team1: Team, team2: Team) => {
    setGameState({
      team1,
      team2,
      timer: { seconds: 0, minutes: 0, isRunning: false }
    });
    setCurrentScreen('game');
  };
  
  // Update score
  const handleUpdateScore = (team: 'team1' | 'team2', value: number) => {
    setGameState(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        score: Math.max(0, prev[team].score + value)
      }
    }));
  };
  
  // Update faults
  const handleUpdateFaults = (team: 'team1' | 'team2', value: number) => {
    setGameState(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        faults: Math.max(0, prev[team].faults + value)
      }
    }));
  };
  
  // End the current game
  const handleEndGame = () => {
    // Format the timer for display
    const minutes = String(gameState.timer.minutes).padStart(2, '0');
    const seconds = String(gameState.timer.seconds).padStart(2, '0');
    setGameTime(`${minutes}:${seconds}`);
    
    setCurrentScreen('end');
    playSound('victory');
  };
  
  // Save the game to history
  const handleSaveGame = async () => {
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    
    const winner = gameState.team1.score > gameState.team2.score 
      ? gameState.team1.name 
      : gameState.team2.score > gameState.team1.score 
        ? gameState.team2.name 
        : "EMPATE";
        
    const gameRecord = {
      date: formattedDate,
      teams: `${gameState.team1.name} x ${gameState.team2.name}`,
      result: `${gameState.team1.score} - ${gameState.team2.score}`,
      time: gameTime,
      winner
    };
    
    try {
      await apiRequest('POST', '/api/games', gameRecord);
      queryClient.invalidateQueries({ queryKey: ['/api/games'] });
      setCurrentScreen('history');
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  };
  
  // Container for the app
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {currentScreen === 'start' && (
            <StartScreen 
              onStartGame={handleStartGame}
              onShowHistory={() => setCurrentScreen('history')}
            />
          )}
          
          {currentScreen === 'game' && (
            <GameScreen 
              gameState={gameState}
              onUpdateScore={handleUpdateScore}
              onUpdateFaults={handleUpdateFaults}
              onEndGame={handleEndGame}
            />
          )}
          
          {currentScreen === 'end' && (
            <EndGameScreen 
              gameState={gameState}
              gameTime={gameTime}
              onSaveGame={handleSaveGame}
              onNewGame={() => setCurrentScreen('start')}
            />
          )}
          
          {currentScreen === 'history' && (
            <HistoryScreen
              onBack={() => setCurrentScreen('start')}
            />
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
