import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import cryptoRandomString from 'crypto-random-string';
import { validateFrameMessage, FrameActionPayload } from 'frames.js';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const data: FrameActionPayload = await req.json(); // This contains the data sent in the POST request
    const { isValid, message } = await validateFrameMessage(data);
    const id = cryptoRandomString({ length: 6, type: 'distinguishable' });

    const res = await supabase.from('item_data').insert({
      fid: data.untrustedData.fid,
      data: data.untrustedData.inputText,
      id: id,
    });
    // console.log(res);
    // if (res.error) {
    //   // Handle other errors
    //   return NextResponse.json({ error: res.error }, { status: 409 });
    // }
    return NextResponse.json({
      id: id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
