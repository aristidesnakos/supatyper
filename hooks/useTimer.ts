'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerReturn {
  timer: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export function useTimer(): UseTimerReturn {
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const start = useCallback(() => {
    if (isRunning) return;
    
    setIsRunning(true);
    const now = Date.now();
    setStartTime(now);
    
    timerRef.current = setInterval(() => {
      const elapsedSeconds = (Date.now() - now) / 1000;
      setTimer(prevTimer => {
        // If timer was already running, add to the existing time
        return startTime ? elapsedSeconds : prevTimer + 0.1;
      });
    }, 100);
  }, [isRunning, startTime]);
  
  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setStartTime(null);
  }, []);
  
  const reset = useCallback(() => {
    stop();
    setTimer(0);
  }, [stop]);
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  return {
    timer,
    isRunning,
    start,
    stop,
    reset,
  };
}
