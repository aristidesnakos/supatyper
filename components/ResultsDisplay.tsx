'use client';

import { useState } from 'react';

interface ResultsDisplayProps {
  wpm: number;
  accuracy: number;
  timeInSeconds: number;
  onSubmitScore: (playerName: string) => void;
  onTryAgain: () => void;
}

export default function ResultsDisplay({ 
  wpm, 
  accuracy, 
  timeInSeconds, 
  onSubmitScore, 
  onTryAgain 
}: ResultsDisplayProps) {
  const [playerName, setPlayerName] = useState<string>('');
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSubmitScore = () => {
    if (playerName.trim()) {
      onSubmitScore(playerName);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-8 w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-4 rounded-full">
          <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-secondary text-2xl font-semibold text-center mb-8">Your Results</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center">
          <p className="text-blue text-4xl font-bold">{wpm}</p>
          <p className="text-gray text-sm">WPM</p>
        </div>
        <div className="text-center">
          <p className="text-accent text-4xl font-bold">{accuracy.toFixed(1)}%</p>
          <p className="text-gray text-sm">Accuracy</p>
        </div>
        <div className="text-center">
          <p className="text-secondary text-4xl font-bold">{formatTime(timeInSeconds)}</p>
          <p className="text-gray text-sm">Time</p>
        </div>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 border border-beige rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-buttonBlue"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          className="bg-buttonBlue hover:bg-opacity-90 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-buttonBlue focus:ring-opacity-50"
          onClick={handleSubmitScore}
        >
          Submit Score
        </button>
        <button
          className="border border-beige text-secondary hover:bg-gray-50 px-4 py-3 rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-beige"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
      
      <div className="text-center">
        <button
          className="text-blue hover:text-opacity-80 flex items-center justify-center mx-auto focus:outline-none"
          onClick={onTryAgain}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Another Topic
        </button>
      </div>
    </div>
  );
}
