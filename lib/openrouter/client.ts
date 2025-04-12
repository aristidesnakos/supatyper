import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://supatyper.vercel.app", // Update with actual URL
    "X-Title": "SupaTyper",
  },
});

export interface GenerateParagraphOptions {
  maxTokens?: number;
  model?: string;
}

export async function generateParagraph(
  topic: string, 
  options: GenerateParagraphOptions = {}
): Promise<string> {
  try {
    const { 
      maxTokens = 100, 
      model = "openai/gpt-3.5-turbo" 
    } = options;
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates short paragraphs for typing practice."
        },
        {
          role: "user",
          content: `Generate a 30-word paragraph about ${topic}. The text should be engaging, varied in sentence length, and suitable for all ages. Count exactly 30 words.`
        }
      ],
      max_tokens: maxTokens,
    });
    
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating paragraph:", error);
    throw error;
  }
}

export { openai };
