import { NextResponse } from 'next/server';
import { getLeaderboardData } from '@/lib/firebase';

export async function GET() {
  try {
    const leaderboard = await getLeaderboardData();
    
    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
