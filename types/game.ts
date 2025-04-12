export type GameState = 'idle' | 'topic-selection' | 'typing' | 'completed';

export interface ScoreResult {
  correctWords: number;
  totalWords: number;
  accuracy: number;
  timeInMinutes: number;
  wpm: number;
  score: number;
}

export interface TypingResults extends ScoreResult {
  typedText: string;
  timeInSeconds: number;
}

export interface SubmitScoreParams {
  playerName: string;
  originalParagraph: string;
  typedText: string;
  timeInMinutes: number;
}

export interface Topic {
  id: string;
  name: string;
}
