'use client';

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { GameState, TypingResults } from '@/types';
import { endpoints } from '@/lib/api';

interface GameContextType {
  gameState: GameState;
  topic: string;
  paragraph: string;
  results: TypingResults | null;
  showLeaderboard: boolean;
  selectTopic: (topic: string) => void;
  startTyping: (topic: string) => Promise<void>;
  completeTyping: (results: TypingResults) => void;
  submitScore: (playerName: string) => Promise<void>;
  tryAgain: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>('topic-selection');
  const [topic, setTopic] = useState<string>('');
  const [paragraph, setParagraph] = useState<string>('');
  const [results, setResults] = useState<TypingResults | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  
  const selectTopic = useCallback((selectedTopic: string) => {
    setTopic(selectedTopic);
  }, []);
  
  const startTyping = useCallback(async (selectedTopic: string) => {
    try {
      const response = await endpoints.generateParagraph(selectedTopic);
      setParagraph(response.paragraph);
      setGameState('typing');
    } catch (error) {
      console.error('Error generating paragraph:', error);
      alert('Failed to generate paragraph. Please try again.');
    }
  }, []);
  
  const completeTyping = useCallback((typingResults: TypingResults) => {
    setResults(typingResults);
    setGameState('completed');
  }, []);
  
  const submitScore = useCallback(async (playerName: string) => {
    if (!results || !paragraph) return;
    
    try {
      await endpoints.calculateScore({
        playerName,
        originalParagraph: paragraph,
        typedText: results.typedText,
        timeInMinutes: results.timeInSeconds / 60,
      });
      
      setShowLeaderboard(true);
    } catch (error) {
      console.error('Error submitting score:', error);
      alert('Failed to submit score. Please try again.');
    }
  }, [results, paragraph]);
  
  const tryAgain = useCallback(() => {
    setGameState('topic-selection');
    setTopic('');
    setParagraph('');
    setResults(null);
    setShowLeaderboard(false);
  }, []);
  
  const value = {
    gameState,
    topic,
    paragraph,
    results,
    showLeaderboard,
    selectTopic,
    startTyping,
    completeTyping,
    submitScore,
    tryAgain,
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
