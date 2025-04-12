import { apiClient } from './client';
import { ScoreResult, SubmitScoreParams } from '@/types/game';

export interface GenerateParagraphResponse {
  paragraph: string;
}

export interface LeaderboardResponse {
  leaderboard: Array<{
    id: string;
    name: string;
    score: number;
    timestamp: string;
  }>;
}

export const endpoints = {
  generateParagraph: async (topic: string): Promise<GenerateParagraphResponse> => {
    return apiClient<GenerateParagraphResponse>('/api/generate-paragraph', {
      method: 'POST',
      body: JSON.stringify({ topic }),
    });
  },
  
  calculateScore: async (params: SubmitScoreParams): Promise<ScoreResult> => {
    return apiClient<ScoreResult>('/api/calculate-score', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },
  
  getLeaderboard: async (): Promise<LeaderboardResponse> => {
    return apiClient<LeaderboardResponse>('/api/get-leaderboard');
  },
};
