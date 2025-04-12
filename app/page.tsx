'use client';

import React from 'react';
import { GameProvider } from '@/context';
import { Header } from '@/components/features/layout';
import { TopicSelector, TypingArea, ResultsDisplay, Leaderboard } from '@/components/features/game';
import { useGame } from '@/context';

function GameContent() {
  const { gameState, results, showLeaderboard } = useGame();
  
  return (
    <>
      {gameState === 'topic-selection' && <TopicSelector />}
      {gameState === 'typing' && <TypingArea />}
      {gameState === 'completed' && results && (
        <div className="space-y-8">
          <ResultsDisplay />
          {showLeaderboard && <Leaderboard />}
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <main className="container mx-auto px-4 py-8">
        <Header />
        <GameContent />
      </main>
    </GameProvider>
  );
}
