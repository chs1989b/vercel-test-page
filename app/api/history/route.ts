import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(100, parseInt(searchParams.get('limit') || '20', 10));
  const urlFilter = searchParams.get('url');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ data: [], message: 'SUPABASE_URL or SUPABASE_KEY not set' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

  try {
    let builder: any = supabase.from('analyze_history').select('*').order('created_at', { ascending: false }).limit(limit);
    if (urlFilter) builder = builder.eq('url', urlFilter);

    const { data, error } = await builder;
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Supabase fetch error', error);
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('Unexpected error fetching history', e);
    return NextResponse.json({ data: [], error: e?.message || String(e) }, { status: 500 });
  }
}
