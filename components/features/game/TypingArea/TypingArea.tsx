'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button, Card } from '@/components/common';
import { formatTime, splitIntoWords, compareWords } from '@/lib/utils/text';
import { RefreshCw, RotateCcw } from 'lucide-react';

interface TypingAreaProps {
  paragraph: string;
  onComplete: (accuracy: number, timeInSeconds: number) => void;
  onReset: () => void;
}

export function TypingArea({ paragraph, onComplete, onReset }: TypingAreaProps) {
  const [typedText, setTypedText] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Start timer when user begins typing
  useEffect(() => {
    if (typedText.length === 1 && !isTimerRunning) {
      startTimer();
    }
  }, [typedText, isTimerRunning]);
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  const startTimer = () => {
    setIsTimerRunning(true);
    const now = Date.now();
    setStartTime(now);
    
    timerRef.current = setInterval(() => {
      const elapsedSeconds = (Date.now() - now) / 1000;
      setTimer(elapsedSeconds);
    }, 100);
  };
  
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerRunning(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lastChar = value[value.length - 1];

    // Start timer on first input
    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
      setIsTimerRunning(true);
    }

    // If space is entered, check the current word
    if (lastChar === " " && value.trim() !== "") {
      checkWord(value.trim());
      setTypedText("");
    } else {
      setTypedText(value);
    }
  };

  const checkWord = (typedWord: string) => {
    // Ignore punctuation for comparison
    const normalizeWord = (word: string) => 
      word.toLowerCase().replace(/[^\w\s]/g, "");

    const paragraphWords = splitIntoWords(paragraph);
    const typedWords = splitIntoWords(typedText);
    
    const currentIndex = typedWords.length;
    
    if (currentIndex >= paragraphWords.length) {
      finishTyping();
      return;
    }
    
    // Continue typing
    setTypedText(typedText + " ");
  };
  
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle final word submission on Enter
    if (e.key === "Enter" && typedText.trim() !== "") {
      const paragraphWords = splitIntoWords(paragraph);
      const typedWords = splitIntoWords(typedText);
      
      if (typedWords.length >= paragraphWords.length - 1) {
        finishTyping();
      }
    }
  };
  
  const finishTyping = () => {
    stopTimer();
    setIsCompleted(true);
    
    // Calculate results
    const timeInSeconds = timer;
    
    const paragraphWords = splitIntoWords(paragraph);
    const typedWords = splitIntoWords(typedText);
    
    let correctWords = 0;
    
    for (let i = 0; i < Math.min(paragraphWords.length, typedWords.length); i++) {
      if (compareWords(paragraphWords[i], typedWords[i])) {
        correctWords++;
      }
    }
    
    const accuracy = (correctWords / paragraphWords.length) * 100;
    
    onComplete(accuracy, timeInSeconds);
  };
  
  // Render paragraph with highlighted words
  const renderParagraph = () => {
    if (!paragraph) return null;
    
    const paragraphWords = splitIntoWords(paragraph);
    const typedWords = splitIntoWords(typedText);
    
    return paragraphWords.map((word, index) => {
      let className = 'word word-waiting';
      
      if (index < typedWords.length) {
        className = compareWords(word, typedWords[index]) ? 'word word-correct text-accent' : 'word word-incorrect text-error';
      } else if (index === typedWords.length) {
        className = 'word word-current';
      }
      
      return (
        <span key={index} className={className}>
          {word}
          {index < paragraphWords.length - 1 && " "}
          {className === 'word word-current' && (
            <span className="cursor-typing"></span>
          )}
        </span>
      );
    });
  };
  
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-supatyper-darkBrown font-mono">
          Time: <span className="font-semibold">{formatTime(timer)}</span>
        </div>
        <Button
          variant="secondary"
          onClick={onReset}
          className="text-supatyper-darkBrown border-supatyper-mutedBrown"
          icon={<RotateCcw className="h-4 w-4" />}
          iconPosition="left"
        >
          New Text
        </Button>
      </div>

      <Card
        className="p-6 bg-white/80 backdrop-blur-sm shadow-md border border-supatyper-lightBeige"
        onClick={focusInput}
      >
        <div className="font-mono text-lg text-supatyper-darkBrown leading-relaxed mb-6 select-none">
          {renderParagraph()}
        </div>

        {!isCompleted ? (
          <input
            ref={inputRef}
            type="text"
            value={typedText}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="w-full p-3 bg-supatyper-backgroundLight border border-supatyper-mutedBrown rounded-md font-mono text-lg focus:outline-none focus:ring-2 focus:ring-supatyper-brightBlue"
            placeholder="Start typing..."
            autoFocus
            disabled={isCompleted}
          />
        ) : (
          <div className="text-center">
            <Button
              onClick={onReset}
              className="bg-supatyper-brightBlue hover:bg-supatyper-brightBlue/90 text-white"
              icon={<RefreshCw className="h-4 w-4" />}
              iconPosition="left"
            >
              Try Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
