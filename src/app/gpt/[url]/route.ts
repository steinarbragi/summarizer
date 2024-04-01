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
  const urlParams = new URLSearchParams(params.url);
  const url = urlParams.get('url');
  const category = urlParams.get('category');
  const length = urlParams.get('length');

  try {
    if (!url || !category || !length) {
      return new Response(
        JSON.stringify({ error: 'Incomplete query parameters' }),
        { status: 400 }
      );
    }
    const lengthNumber = parseInt(length, 10);
    // Try to fetch an existing summary from the database
    const client = await db.connect();
    const results =
      await client.sql`SELECT * FROM Summaries WHERE name = ${url} AND category = ${category} AND length = ${lengthNumber}`;

    if (results.rows.length > 0) {
      // If a summary exists, use it
      console.log('Fetched summary from database');

      summary = results.rows[0].summary; // Assuming 'Summary' is the column name for the summary text
    } else {
      // If not, call the OpenAI API to generate a summary
      console.log('Generating summary using OpenAI');
      const lengthEnd = length + ' words.';
      const funny_prompt_gpt =
        "Create a brief and comically exaggerated summary of a news article, ensuring it captures the essence of the story while infusing a dose of humor. Focus on the main issue, key figures, and notable outcomes, but twist these elements to spotlight the absurdity or irony present. Aim for a concise yet hilarious overview that remains informative. Embrace creativity to highlight the funny side, turning the summary into an entertaining piece that still conveys the article's key details. Keep the summary to the maximum size of ";
      const serious_prompt_gpt =
        'Craft a succinct and focused summary of a news article, concentrating on the core issue, pivotal figures, and significant outcomes. Strive for clarity and gravity, ensuring the summary is informative and reflects the seriousness of the subject matter. Aim for a concise portrayal of the key points, maintaining a tone that respects the gravity of the news story. Ensure the summary remains within ';
      const pirate_prompt_gpt =
        'Ahoy! Spin a yarn summarizing a news article as if ye were a seasoned pirate regaling tales of high seas and treasures. Focus on the main squabble, the notable sea dogs involved, and the booty or outcome, but with a buccaneer’s flair. Make sure it’s brimming with pirate lingo, adventure, and a touch of roguish humor. Let the essence of the story shine through as if it were a tale worthy of the most legendary pirates.Weave this tale in no more than ';
      const aristocrat_prompt_gpt =
        'Compose an elegant and refined summary of a news article, as though addressing an assembly of distinguished aristocrats. Concentrate on the principal matter, key personages, and noteworthy consequences, presenting these elements with sophistication and a highbrow tone. Encapsulate the essence of the news while maintaining the decorum and grace expected in aristocratic circles. Ensure the summary reflects the polished and discerning nature of its intended audience, providing them with an insightful and cultured overview. Aim for a succinct exposition, limited to ';
      const categoryMap: { [key: string]: string } = {
        funny: funny_prompt_gpt,
        serious: serious_prompt_gpt,
        pirate: pirate_prompt_gpt,
        aristocrat: aristocrat_prompt_gpt,
      };

      const final_prompt = categoryMap[category] + lengthEnd;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `${final_prompt} \n\n ${url}`,
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
        INSERT INTO Summaries (Name, Summary, Likes, Dislikes, Category, Length ) VALUES (${url}, ${summary}, 0, 0, ${category}, ${lengthNumber});
      `;
    }

    return NextResponse.json({ url: url, summary });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
