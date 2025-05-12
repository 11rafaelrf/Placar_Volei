import { useState, useEffect, useCallback } from 'react';
import { TimerState } from '@/types/game';

export function useTimer() {
  const [timer, setTimer] = useState<TimerState>({
    seconds: 0,
    minutes: 0,
    isRunning: false,
  });
  
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  
  const startTimer = useCallback(() => {
    if (!timer.isRunning) {
      setTimer(prev => ({ ...prev, isRunning: true }));
      
      const id = setInterval(() => {
        setTimer(prev => {
          const newSeconds = prev.seconds + 1;
          if (newSeconds >= 60) {
            return {
              ...prev,
              seconds: 0,
              minutes: prev.minutes + 1,
            };
          }
          return { ...prev, seconds: newSeconds };
        });
      }, 1000);
      
      setIntervalId(id);
    }
  }, [timer.isRunning]);
  
  const pauseTimer = useCallback(() => {
    if (timer.isRunning && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setTimer(prev => ({ ...prev, isRunning: false }));
    }
  }, [timer.isRunning, intervalId]);
  
  const resetTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimer({ seconds: 0, minutes: 0, isRunning: false });
  }, [intervalId]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  
  const formatTime = useCallback(() => {
    const minutes = String(timer.minutes).padStart(2, '0');
    const seconds = String(timer.seconds).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [timer.minutes, timer.seconds]);
  
  return {
    timer,
    startTimer,
    pauseTimer,
    resetTimer,
    formatTime,
  };
}
