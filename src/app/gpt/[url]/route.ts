import { NextRequest, NextResponse } from 'next/server';

export async function GET (request:NextRequest, {params}: {params: {url: string}}){
    // TODO: send url to ChatGPT and ask for a summary
    return NextResponse.json({url: params.url})
} 