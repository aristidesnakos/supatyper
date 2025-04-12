import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://api.anthropic.com/v1/",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://supatyper.vercel.app", // Update with actual URL
    "X-Title": "SupaTyper",
  },
});

export async function generateParagraph(topic: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "claude-3-haiku-20240307", // Or another model available on OpenRouter
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
      max_tokens: 100,
    });
    
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating paragraph:", error);
    throw error;
  }
}
