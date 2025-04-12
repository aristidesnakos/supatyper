'use client';

import { useState, useEffect, useRef } from 'react';
import { TypingResults } from '@/hooks/useTypingGame';

interface TypingAreaProps {
  paragraph: string;
  onComplete: (results: TypingResults) => void;
}

export default function TypingArea({ paragraph, onComplete }: TypingAreaProps) {
  const [typedText, setTypedText] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
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
      setIsTimerRunning(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTypedText(e.target.value);
    
    // Check if typing is complete
    const paragraphWords = paragraph.split(/\s+/).length;
    const typedWords = e.target.value.split(/\s+/).length;
    
    if (typedWords >= paragraphWords && e.target.value.trim().length > 0) {
      completeTyping();
    }
  };
  
  const completeTyping = () => {
    stopTimer();
    
    // Calculate results
    const timeInSeconds = timer;
    const timeInMinutes = timeInSeconds / 60;
    
    const paragraphWords = paragraph.split(/\s+/);
    const typedWords = typedText.split(/\s+/);
    
    let correctWords = 0;
    
    for (let i = 0; i < Math.min(paragraphWords.length, typedWords.length); i++) {
      const originalWord = paragraphWords[i].replace(/[^\w\s]/g, '').toLowerCase();
      const typedWord = typedWords[i].replace(/[^\w\s]/g, '').toLowerCase();
      
      if (originalWord === typedWord) {
        correctWords++;
      }
    }
    
    const accuracy = (correctWords / paragraphWords.length) * 100;
    const wpm = Math.round(correctWords / timeInMinutes);
    const score = Math.round(correctWords * (200 / timeInMinutes));
    
    onComplete({
      typedText,
      correctWords,
      totalWords: paragraphWords.length,
      accuracy,
      timeInSeconds,
      timeInMinutes,
      wpm,
      score
    });
  };
  
  // Render paragraph with highlighted words
  const renderParagraph = () => {
    const paragraphWords = paragraph.split(/\s+/);
    const typedWords = typedText.split(/\s+/);
    
    return paragraphWords.map((word, index) => {
      let className = '';
      
      if (index < typedWords.length) {
        const originalWord = word.replace(/[^\w\s]/g, '').toLowerCase();
        const typedWord = typedWords[index].replace(/[^\w\s]/g, '').toLowerCase();
        
        className = originalWord === typedWord ? 'text-accent' : 'text-error';
      }
      
      return (
        <span key={index} className={className}>
          {word}{' '}
        </span>
      );
    });
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-8 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-secondary text-xl font-semibold">Type the paragraph below</h2>
        <div className="text-secondary text-xl font-mono">{formatTime(timer)}</div>
      </div>
      
      <div className="bg-primary p-4 rounded-lg mb-6 min-h-[100px] text-lg leading-relaxed">
        {renderParagraph()}
      </div>
      
      <textarea
        ref={inputRef}
        className="w-full p-4 border border-beige rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-buttonBlue min-h-[100px] text-lg"
        placeholder="Start typing here..."
        value={typedText}
        onChange={handleInputChange}
      />
    </div>
  );
}
