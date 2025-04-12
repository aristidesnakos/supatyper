'use client';

import { useEffect, useState } from 'react';
import { Score, subscribeToLeaderboard } from '@/lib/firebase';

export default function Leaderboard() {
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
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-card p-8 w-full max-w-md mx-auto text-center">
        <p className="text-secondary">Loading leaderboard...</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-card p-8 w-full max-w-md mx-auto">
      <h2 className="text-secondary text-2xl font-semibold text-center mb-6">Leaderboard</h2>
      
      {scores.length === 0 ? (
        <p className="text-center text-gray">No scores yet. Be the first to submit!</p>
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
    </div>
  );
}
