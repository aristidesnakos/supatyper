import { ref, push, query, orderByChild, limitToLast, get, onValue, DataSnapshot } from 'firebase/database';
import { database } from './client';
import { Score } from './types';

// Save score to Firebase
export async function saveScore(playerName: string, score: number): Promise<void> {
  const leaderboardRef = ref(database, 'leaderboard');
  return push(leaderboardRef, {
    name: playerName,
    score: score,
    timestamp: new Date().toISOString()
  }).then();
}

// Get leaderboard data
export async function getLeaderboardData(): Promise<Score[]> {
  return new Promise((resolve, reject) => {
    const leaderboardRef = ref(database, 'leaderboard');
    const topScoresQuery = query(
      leaderboardRef,
      orderByChild('score'),
      limitToLast(10)
    );
    
    get(topScoresQuery)
      .then((snapshot) => {
        const data = snapshot.val() || {};
        const scores = Object.entries(data)
          .map(([key, value]) => ({
            id: key,
            ...value as Omit<Score, 'id'>
          }))
          .sort((a, b) => b.score - a.score);
        
        resolve(scores);
      })
      .catch(reject);
  });
}

// Subscribe to leaderboard updates
export function subscribeToLeaderboard(callback: (scores: Score[]) => void) {
  const leaderboardRef = ref(database, 'leaderboard');
  const topScoresQuery = query(
    leaderboardRef,
    orderByChild('score'),
    limitToLast(10)
  );
  
  return onValue(topScoresQuery, (snapshot: DataSnapshot) => {
    const data = snapshot.val() || {};
    const scores = Object.entries(data)
      .map(([key, value]) => ({
        id: key,
        ...value as Omit<Score, 'id'>
      }))
      .sort((a, b) => b.score - a.score);
    
    callback(scores);
  });
}
