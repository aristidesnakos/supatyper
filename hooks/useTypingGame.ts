'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTimer } from './useTimer';
import { calculateScore } from '@/lib/utils/scoring';
import { splitIntoWords, compareWords } from '@/lib/utils/text';
import { GameState, TypingResults } from '@/types';

export function useTypingGame() {
  const [playerName, setPlayerName] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>('idle');
  const [topic, setTopic] = useState<string>('');
  const [paragraph, setParagraph] = useState<string>('');
  const [typedText, setTypedText] = useState<string>('');
  const [results, setResults] = useState<TypingResults | null>(null);
  
  const { timer, isRunning, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer();
  
  // Start timer when user begins typing
  useEffect(() => {
    if (typedText.length === 1 && gameState === 'typing' && !isRunning) {
      startTimer();
    }
  }, [typedText, gameState, isRunning, startTimer]);
  
  const handleTyping = useCallback((text: string) => {
    setTypedText(text);
    
    // Check if typing is complete (all words typed)
    if (paragraph) {
      const paragraphWords = splitIntoWords(paragraph);
      const typedWords = splitIntoWords(text);
      
      if (typedWords.length >= paragraphWords.length && text.trim().length > 0) {
        completeTyping();
      }
    }
  }, [paragraph]);
  
  const completeTyping = useCallback(() => {
    stopTimer();
    
    // Calculate results
    const timeInSeconds = timer;
    const timeInMinutes = timeInSeconds / 60;
    
    const result = calculateScore(paragraph, typedText, timeInMinutes);
    
    setResults({
      ...result,
      typedText,
      timeInSeconds,
    });
    
    setGameState('completed');
  }, [timer, paragraph, typedText, stopTimer]);
  
  const startGame = useCallback((selectedTopic: string, generatedParagraph: string) => {
    setTopic(selectedTopic);
    setParagraph(generatedParagraph);
    setTypedText('');
    resetTimer();
    setResults(null);
    setGameState('typing');
  }, [resetTimer]);
  
  const resetGame = useCallback(() => {
    stopTimer();
    resetTimer();
    setTopic('');
    setParagraph('');
    setTypedText('');
    setResults(null);
    setGameState('idle');
  }, [stopTimer, resetTimer]);
  
  return {
    playerName,
    setPlayerName,
    gameState,
    setGameState,
    topic,
    setTopic,
    paragraph,
    setParagraph,
    typedText,
    timer,
    results,
    startGame,
    resetGame,
    handleTyping,
  };
}
