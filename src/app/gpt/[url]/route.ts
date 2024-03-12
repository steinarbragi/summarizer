import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { url: string } }
) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Summarize this article in a funny way ${params.url}`,
      },
    ],
    model: 'gpt-4-0125-preview',
  });
  return NextResponse.json({ url: params.url, message: completion.choices[0] });
}
