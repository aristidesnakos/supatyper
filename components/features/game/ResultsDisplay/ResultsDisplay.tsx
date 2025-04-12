'use client';

import { useState, useEffect } from "react";
import { Button, Card, Input } from '@/components/common';
import { Trophy, RefreshCw, Share2 } from "lucide-react";
import { toast } from "@/lib/toast";
import { ref, push } from "firebase/database";
import { database } from "@/lib/firebase/client";
import { Leaderboard } from "@/components/features/game";
import { formatTime } from "@/lib/utils/text";

interface ResultsDisplayProps {
  accuracy: number;
  timeInSeconds: number;
  onReset: () => void;
  topic: string;
  onScoreSubmitted?: () => void;
  showLeaderboard?: boolean;
}

export function ResultsDisplay({
  accuracy,
  timeInSeconds,
  onReset,
  topic,
  onScoreSubmitted,
  showLeaderboard = false
}: ResultsDisplayProps) {
  const [playerName, setPlayerName] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Calculate the score based on accuracy and time
  useEffect(() => {
    const timeInMinutes = timeInSeconds / 60;
    const wordCount = topic === "" ? 10 : 10; // Assuming an average of 10 words
    const wordsPerMinute = Math.round((wordCount * (accuracy / 100)) / timeInMinutes);
    setScore(wordsPerMinute);
  }, [accuracy, timeInSeconds, topic]);

  const submitScore = async () => {
    if (!playerName.trim()) {
      toast.error("Please enter your name to submit your score");
      return;
    }

    setSubmitting(true);
    
    try {
      const scoreData = {
        name: playerName,
        score,
        accuracy,
        timeInSeconds,
        topic,
        timestamp: Date.now()
      };
      
      await push(ref(database, "leaderboard"), scoreData);
      toast.success("Score submitted to leaderboard!");
      setIsSubmitted(true);
      if (onScoreSubmitted) {
        onScoreSubmitted();
      }
    } catch (error) {
      console.error("Error submitting score:", error);
      toast.error("Failed to submit score. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const shareScore = () => {
    const text = `I just typed at ${score} WPM with ${accuracy.toFixed(1)}% accuracy on SupaTyper! Topic: ${topic}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My SupaTyper Score',
        text
      }).catch(err => {
        navigator.clipboard.writeText(text);
        toast.success("Score copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Score copied to clipboard!");
    }
  };

  if (showLeaderboard) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-supatyper-darkBrown">Leaderboard</h2>
          <Button 
            variant="secondary" 
            onClick={onReset}
            className="text-supatyper-darkBrown border-supatyper-mutedBrown"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </div>
        <Leaderboard />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-supatyper-lightBeige animate-fade-in">
      <div className="text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-supatyper-lightGray mb-4">
          <Trophy className="h-10 w-10 text-supatyper-vibrantOrange" />
        </div>
        
        <h2 className="text-2xl font-bold text-supatyper-darkBrown">Your Results</h2>
        
        <div className="flex justify-center space-x-6 my-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-supatyper-brightBlue">{score}</div>
            <div className="text-sm text-supatyper-oliveBrown mt-1">WPM</div>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-supatyper-vibrantOrange">
              {accuracy.toFixed(1)}%
            </div>
            <div className="text-sm text-supatyper-oliveBrown mt-1">Accuracy</div>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-supatyper-darkBrown">
              {formatTime(timeInSeconds)}
            </div>
            <div className="text-sm text-supatyper-oliveBrown mt-1">Time</div>
          </div>
        </div>
        
        {!isSubmitted && (
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-3 bg-supatyper-backgroundLight border border-supatyper-mutedBrown rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-supatyper-brightBlue"
              disabled={submitting}
            />
          </div>
        )}
        
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          {!isSubmitted ? (
            <>
              <Button
                onClick={submitScore}
                disabled={submitting || !playerName.trim()}
                className="flex-1 bg-supatyper-brightBlue hover:bg-supatyper-brightBlue/90 text-white"
                isLoading={submitting}
              >
                Submit Score
              </Button>
              
              <Button
                onClick={shareScore}
                variant="secondary"
                className="flex-1 border-supatyper-mutedBrown text-supatyper-darkBrown"
                icon={<Share2 className="h-4 w-4" />}
                iconPosition="left"
              >
                Share
              </Button>
            </>
          ) : (
            <Button
              onClick={() => onScoreSubmitted && onScoreSubmitted()}
              className="w-full bg-supatyper-brightBlue hover:bg-supatyper-brightBlue/90 text-white"
            >
              View Leaderboard
            </Button>
          )}
        </div>
        
        <Button
          onClick={onReset}
          variant="link"
          className="mt-4 text-supatyper-brightBlue hover:text-supatyper-brightBlue/80"
          icon={<RefreshCw className="h-4 w-4" />}
          iconPosition="left"
        >
          Try Another Topic
        </Button>
      </div>
    </Card>
  );
}
