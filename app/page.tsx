'use client';

import { useState } from "react";
import { generateParagraph } from "@/lib/openrouter";
import { TopicSelector, TypingArea, ResultsDisplay, Leaderboard } from '@/components/features/game';
import { toast } from "@/lib/toast";
import { Keyboard } from "lucide-react";

enum GameState {
  SELECT_TOPIC,
  TYPING,
  RESULT,
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(GameState.SELECT_TOPIC);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleTopicSelected = async (topic: string) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    
    try {
      const text = await generateParagraph(topic);
      setParagraph(text);
      setGameState(GameState.TYPING);
    } catch (error) {
      console.error("Error fetching paragraph:", error);
      toast.error("Failed to generate paragraph. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypingComplete = (acc: number, time: number) => {
    setAccuracy(acc);
    setTimeInSeconds(time);
    setGameState(GameState.RESULT);
  };

  const handleReset = () => {
    setGameState(GameState.SELECT_TOPIC);
    setParagraph("");
    setSelectedTopic("");
    setShowLeaderboard(false);
  };

  const handleScoreSubmitted = () => {
    setShowLeaderboard(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-supatyper-background via-supatyper-backgroundAlt to-supatyper-backgroundLight">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <Keyboard className="h-8 w-8 mr-2 text-supatyper-brightBlue" />
            <h1 className="text-4xl font-bold text-supatyper-darkBrown">
              SupaTyper
            </h1>
          </div>
          <p className="text-supatyper-oliveBrown max-w-lg mx-auto">
            Improve your typing with quick, topic-based practice
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          {gameState === GameState.SELECT_TOPIC && (
            <div className="flex justify-center">
              <TopicSelector
                onTopicSelected={handleTopicSelected}
                isLoading={isLoading}
              />
            </div>
          )}

          {gameState === GameState.TYPING && paragraph && (
            <TypingArea
              paragraph={paragraph}
              onComplete={handleTypingComplete}
              onReset={handleReset}
            />
          )}

          {gameState === GameState.RESULT && (
            <ResultsDisplay
              accuracy={accuracy}
              timeInSeconds={timeInSeconds}
              onReset={handleReset}
              topic={selectedTopic}
              onScoreSubmitted={handleScoreSubmitted}
              showLeaderboard={showLeaderboard}
            />
          )}
        </div>
      </div>
    </div>
  );
}
