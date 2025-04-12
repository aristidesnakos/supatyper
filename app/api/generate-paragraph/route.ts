import { NextResponse } from 'next/server';
import { generateParagraph } from '@/lib/openrouter';

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();
    
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }
    
    const paragraph = await generateParagraph(topic);
    
    return NextResponse.json({ paragraph });
  } catch (error) {
    console.error('Error generating paragraph:', error);
    return NextResponse.json(
      { error: 'Failed to generate paragraph' },
      { status: 500 }
    );
  }
}
