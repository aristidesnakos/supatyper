'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ref, onValue, query, orderByChild, limitToLast } from "firebase/database";
import { database } from "@/lib/firebase/client";
import { Medal, Trophy, Award } from "lucide-react";

interface LeaderboardEntry {
  key: string;
  name: string;
  score: number;
  accuracy: number;
  topic: string;
  timestamp: number;
}

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const leaderboardRef = query(
      ref(database, "leaderboard"),
      orderByChild("score"),
      limitToLast(10)
    );

    const unsubscribe = onValue(leaderboardRef, (snapshot) => {
      const data = snapshot.val();
      const leaderboardEntries: LeaderboardEntry[] = [];
      
      if (data) {
        Object.entries(data).forEach(([key, value]: [string, any]) => {
          leaderboardEntries.push({
            key,
            name: value.name,
            score: value.score,
            accuracy: value.accuracy,
            topic: value.topic,
            timestamp: value.timestamp,
          });
        });
      }
      
      // Sort by score in descending order
      leaderboardEntries.sort((a, b) => b.score - a.score);
      setEntries(leaderboardEntries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <Award className="h-5 w-5 text-supatyper-mutedBrown" />;
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-supatyper-darkBrown">
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-pulse flex space-x-4">
            <div className="h-32 w-full bg-supatyper-lightBeige rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-supatyper-lightBeige">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-supatyper-darkBrown">
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-8 text-supatyper-oliveBrown">
            No scores yet. Be the first to submit!
          </div>
        ) : (
          <div className="divide-y divide-supatyper-lightBeige">
            {entries.map((entry, index) => (
              <div
                key={entry.key}
                className={`flex items-center py-3 ${
                  index === 0 ? "bg-yellow-50/50" : ""
                }`}
              >
                <div className="flex items-center justify-center w-8 mr-2">
                  {getRankIcon(index)}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{entry.name}</div>
                  <div className="text-xs text-supatyper-oliveBrown">
                    {entry.topic} · {formatDate(entry.timestamp)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-supatyper-brightBlue">
                    {entry.score} <span className="text-xs">WPM</span>
                  </div>
                  <div className="text-xs text-supatyper-oliveBrown">
                    {entry.accuracy.toFixed(1)}% accuracy
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
