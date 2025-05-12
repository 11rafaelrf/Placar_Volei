import React, { useEffect, useState } from 'react';
import { PixelContainer } from '@/components/ui/pixel-container';
import { PixelButton } from '@/components/ui/pixel-button';
import { playSound } from '@/lib/sounds';
import { GameRecord } from '@/types/game';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

interface HistoryScreenProps {
  onBack: () => void;
}

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const { data: gameHistory = [], isLoading } = useQuery<GameRecord[]>({
    queryKey: ['/api/games'],
  });
  
  const handleBack = () => {
    playSound('switch');
    onBack();
  };
  
  return (
    <PixelContainer className="p-6">
      <h2 className="text-coin-gold text-center text-2xl mb-6">HISTÓRICO DE JOGOS</h2>
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center text-white p-4">Carregando...</div>
        ) : gameHistory.length === 0 ? (
          <div className="text-center text-white p-4">Nenhum jogo registrado</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-coin-gold">
                <th className="border-4 border-black p-2 text-dark text-sm">DATA</th>
                <th className="border-4 border-black p-2 text-dark text-sm">EQUIPES</th>
                <th className="border-4 border-black p-2 text-dark text-sm">RESULTADO</th>
                <th className="border-4 border-black p-2 text-dark text-sm">TEMPO</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory.map((game, index) => (
                <tr key={game.id} className={index % 2 === 0 ? "bg-white" : "bg-sky-blue"}>
                  <td className="border-4 border-black p-2 text-dark text-xs">{game.date}</td>
                  <td className="border-4 border-black p-2 text-dark text-xs">{game.teams}</td>
                  <td className="border-4 border-black p-2 text-dark text-xs">{game.result}</td>
                  <td className="border-4 border-black p-2 text-dark text-xs">{game.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className="mt-8 flex justify-center">
        <PixelButton 
          variant="mario-red"
          onClick={handleBack}
        >
          VOLTAR
        </PixelButton>
      </div>
    </PixelContainer>
  );
}
