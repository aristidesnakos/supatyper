import { ScoreResult } from '@/types';
import { compareWords, splitIntoWords } from './text';

/**
 * Calculates typing score based on accuracy and speed
 */
export function calculateScore(
  originalParagraph: string, 
  typedText: string, 
  timeInMinutes: number
): ScoreResult {
  const originalWords = splitIntoWords(originalParagraph);
  const typedWords = splitIntoWords(typedText);
  
  let correctWords = 0;
  
  for (let i = 0; i < Math.min(originalWords.length, typedWords.length); i++) {
    if (compareWords(originalWords[i], typedWords[i])) {
      correctWords++;
    }
  }
  
  // Calculate accuracy
  const accuracy = (correctWords / originalWords.length) * 100;
  
  // Calculate WPM: words per minute
  const wpm = Math.round(correctWords / timeInMinutes);
  
  // Calculate score: (correct words) × (200 / time in minutes)
  const score = Math.round(correctWords * (200 / timeInMinutes));
  
  return {
    correctWords,
    totalWords: originalWords.length,
    accuracy,
    timeInMinutes,
    wpm,
    score
  };
}
