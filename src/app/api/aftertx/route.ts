// import {
//   FrameRequest,
//   getFrameMessage,
//   getFrameHtmlResponse,
// } from '@coinbase/onchainkit/frame';

import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL || '';

async function getResponse(req: NextRequest) {
  //   const body: FrameRequest = await req.json();
  //   const frameMessage = await getFrameMessage(frameActionPayload);
  //   console.log(frameMessage);
  //   if (!isValid) {
  //     return new NextResponse('Message not valid', { status: 500 });
  //   }
  //   return new NextResponse(
  //     getFrameHtmlResponse({
  //       buttons: [
  //         {
  //           action: 'tx',
  //           label: 'Click Again!',
  //           target: `${NEXT_PUBLIC_URL}/api/buttonclicker`,
  //         },
  //         {
  //           action: 'link',
  //           label: 'Leaderboard',
  //           target: `${NEXT_PUBLIC_URL}/buttonclicker`,
  //         },
  //       ],
  //       image: {
  //         src: `${NEXT_PUBLIC_URL}/button.webp`,
  //         aspectRatio: '1:1',
  //       },
  //       input: {
  //         text: 'Noooo, why did you click!?',
  //       },
  //       postUrl: `${NEXT_PUBLIC_URL}/api/aftertx`,
  //     })
  //   );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
