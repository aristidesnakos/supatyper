import { NextResponse } from 'next/server';
import { calculateScore } from '@/lib/utils';
import { saveScore } from '@/lib/firebase';
import { SubmitScoreParams } from '@/types';

export async function POST(request: Request) {
  try {
    const { playerName, originalParagraph, typedText, timeInMinutes } = await request.json() as SubmitScoreParams;
    
    if (!originalParagraph || !typedText || !timeInMinutes) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    const result = calculateScore(originalParagraph, typedText, timeInMinutes);
    
    // Save score to Firebase if player name is provided
    if (playerName) {
      await saveScore(playerName, result.score);
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error calculating score:', error);
    return NextResponse.json(
      { error: 'Failed to calculate score' },
      { status: 500 }
    );
  }
}
