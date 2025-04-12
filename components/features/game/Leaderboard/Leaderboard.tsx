'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/common';
import { Score, subscribeToLeaderboard } from '@/lib/firebase';

export function Leaderboard() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard((leaderboardData) => {
      setScores(leaderboardData);
      setLoading(false);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <h2 className="text-secondary text-2xl font-semibold text-center mb-6">Leaderboard</h2>
      
      {loading ? (
        <div className="text-center py-4">
          <svg className="animate-spin h-8 w-8 text-buttonBlue mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-secondary">Loading leaderboard...</p>
        </div>
      ) : scores.length === 0 ? (
        <p className="text-center text-gray py-4">No scores yet. Be the first to submit!</p>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-beige">
                <th className="py-2 text-left text-secondary">Rank</th>
                <th className="py-2 text-left text-secondary">Name</th>
                <th className="py-2 text-right text-secondary">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={score.id} className="border-b border-beige">
                  <td className="py-2 text-secondary">{index + 1}</td>
                  <td className="py-2 text-secondary">{score.name}</td>
                  <td className="py-2 text-right text-blue font-semibold">{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
