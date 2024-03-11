import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET (request:NextApiRequest, {params}: {params: {url: string}}){
    // TODO: send url to ChatGPT and ask for a summary
    return NextResponse.json({url: params.url})
} 