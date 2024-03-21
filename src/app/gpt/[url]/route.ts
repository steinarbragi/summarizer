// Import necessary libraries and initialize OpenAI
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { sql, db } from '@vercel/postgres'; // Assuming you have a setup like this

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { url: string } }
) {
  let summary;

  try {
    // Try to fetch an existing summary from the database
    const client = await db.connect();
    const results =
      await client.sql`SELECT * FROM Summaries WHERE name = ${params.url}`;

    if (results.rows.length > 0) {
      // If a summary exists, use it
      console.log('Fetched summary from database');

      summary = results.rows[0].summary; // Assuming 'Summary' is the column name for the summary text
    } else {
      // If not, call the OpenAI API to generate a summary
      console.log('Generating summary using OpenAI');
      const funny_prompt_gpt =
        "Create a brief and comically exaggerated summary of a news article, ensuring it captures the essence of the story while infusing a dose of humor. Focus on the main issue, key figures, and notable outcomes, but twist these elements to spotlight the absurdity or irony present. Aim for a concise yet hilarious overview that remains informative. Embrace creativity to highlight the funny side, turning the summary into an entertaining piece that still conveys the article's key details. Keep the summary to the maximum size of 50 words.";

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `${funny_prompt_gpt} \n\n ${params.url}`,
          },
        ],
        model: 'gpt-4-0125-preview',
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      summary = completion.choices[0].message.content; // Adjust according to the actual response structure
      // Save the new summary to the database

      await client.sql`
        INSERT INTO Summaries (Name, Summary, Likes, Dislikes, Category ) VALUES (${params.url}, ${summary}, 0, 0, 'funny');
      `;
    }

    return NextResponse.json({ url: params.url, summary });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
