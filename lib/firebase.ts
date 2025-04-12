import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, push, query, orderByChild, limitToLast, get, onValue, DataSnapshot } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const database = getDatabase(app);

// Score interface
export interface Score {
  id?: string;
  name: string;
  score: number;
  timestamp: string;
}

// Save score to Firebase
export function saveScore(playerName: string, score: number): Promise<void> {
  const leaderboardRef = ref(database, 'leaderboard');
  return push(leaderboardRef, {
    name: playerName,
    score: score,
    timestamp: new Date().toISOString()
  }).then();
}

// Get leaderboard data
export function getLeaderboardData(): Promise<Score[]> {
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
