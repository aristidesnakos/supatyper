export interface ScoreResult {
  correctWords: number;
  totalWords: number;
  accuracy: number;
  timeInMinutes: number;
  wpm: number;
  score: number;
}

export function calculateScore(
  originalParagraph: string, 
  typedText: string, 
  timeInMinutes: number
): ScoreResult {
  const originalWords = originalParagraph.split(/\s+/);
  const typedWords = typedText.split(/\s+/);
  
  let correctWords = 0;
  
  for (let i = 0; i < Math.min(originalWords.length, typedWords.length); i++) {
    // Remove punctuation and compare
    const originalWord = originalWords[i].replace(/[^\w\s]/g, '').toLowerCase();
    const typedWord = typedWords[i].replace(/[^\w\s]/g, '').toLowerCase();
    
    if (originalWord === typedWord) {
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
