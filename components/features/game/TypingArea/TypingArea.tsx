'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/common';
import { useGame } from '@/context';
import { formatTime, splitIntoWords, compareWords } from '@/lib/utils';

export function TypingArea() {
  const { paragraph, completeTyping } = useGame();
  const [typedText, setTypedText] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Focus textarea on component mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setTypedText(text);
    
    // Check if typing is complete
    if (paragraph) {
      const paragraphWords = splitIntoWords(paragraph);
      const typedWords = splitIntoWords(text);
      
      if (typedWords.length >= paragraphWords.length && text.trim().length > 0) {
        finishTyping();
      }
    }
  };
  
  const finishTyping = () => {
    stopTimer();
    
    // Calculate results
    const timeInSeconds = timer;
    const timeInMinutes = timeInSeconds / 60;
    
    const paragraphWords = splitIntoWords(paragraph);
    const typedWords = splitIntoWords(typedText);
    
    let correctWords = 0;
    
    for (let i = 0; i < Math.min(paragraphWords.length, typedWords.length); i++) {
      if (compareWords(paragraphWords[i], typedWords[i])) {
        correctWords++;
      }
    }
    
    const accuracy = (correctWords / paragraphWords.length) * 100;
    const wpm = Math.round(correctWords / timeInMinutes);
    const score = Math.round(correctWords * (200 / timeInMinutes));
    
    completeTyping({
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
    if (!paragraph) return null;
    
    const paragraphWords = splitIntoWords(paragraph);
    const typedWords = splitIntoWords(typedText);
    
    return paragraphWords.map((word, index) => {
      let className = '';
      
      if (index < typedWords.length) {
        className = compareWords(word, typedWords[index]) ? 'text-accent' : 'text-error';
      }
      
      return (
        <span key={index} className={className}>
          {word}{' '}
        </span>
      );
    });
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-secondary text-xl font-semibold">Type the paragraph below</h2>
        <div className="text-secondary text-xl font-mono">{formatTime(timer)}</div>
      </div>
      
      <div className="bg-primary p-4 rounded-lg mb-6 min-h-[100px] text-lg leading-relaxed">
        {renderParagraph()}
      </div>
      
      <textarea
        ref={textareaRef}
        className="w-full p-4 border border-beige rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-buttonBlue min-h-[100px] text-lg"
        placeholder="Start typing here..."
        value={typedText}
        onChange={handleInputChange}
      />
    </Card>
  );
}
