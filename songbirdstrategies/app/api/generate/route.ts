import { NextResponse } from 'next/server';
import { createContentPrompt } from '@/lib/openai/prompts/generator';
import { validateGenerationParams } from '@/lib/openai/validation';
import { GenerationParams } from '@/lib/openai/types';
import { ContentService } from '@/lib/openai/services/content';
import { checkRateLimit } from '@/lib/rate-limiting/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const isAllowed = await checkRateLimit(session.user.id);
      if (!isAllowed) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    let params: GenerationParams;
    try {
      params = await request.json();
    } catch (e) {
      console.error('Error parsing request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const validationError = validateGenerationParams(params);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    try {
      const content = await ContentService.generateContent(params);

      if (session?.user) {
        await supabase.from('content_generations').insert({
          user_id: session.user.id,
          audience: params.audience,
          goal: params.goal,
          tone: params.tone,
          content_type: params.contentType,
          context: params.context,
          generated_content: content
        });
      }

      return NextResponse.json({ content });
    } catch (error: any) {
      console.error('Content generation error:', error);
      return NextResponse.json(
        { error: error?.message || 'Failed to generate content' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in generate route:', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}