'use client';

import { useCallback } from 'react';
import { endpoints } from '@/lib/api';
import { SubmitScoreParams } from '@/types';

export function useApi() {
  const generateParagraph = useCallback(async (topic: string) => {
    try {
      return await endpoints.generateParagraph(topic);
    } catch (error) {
      console.error('Error generating paragraph:', error);
      throw error;
    }
  }, []);
  
  const submitScore = useCallback(async (params: SubmitScoreParams) => {
    try {
      return await endpoints.calculateScore(params);
    } catch (error) {
      console.error('Error submitting score:', error);
      throw error;
    }
  }, []);
  
  const getLeaderboard = useCallback(async () => {
    try {
      return await endpoints.getLeaderboard();
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  }, []);
  
  return {
    generateParagraph,
    submitScore,
    getLeaderboard,
  };
}
