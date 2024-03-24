import { TransactionTargetResponse } from 'frames.js';
import { getFrameMessage } from 'frames.js/next/server';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseEther, parseGwei } from 'viem';
import { baseSepolia } from 'viem/chains';
import { supabase } from '../lib/supabase';
// console.log(baseSepolia);

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  // const frameMessage = await getFrameMessage(json);

  const itemData = await supabase
    .from('user_address')
    .select()
    .eq('fid', json?.untrustedData.fid);
  const userId = itemData.data?.[0].address;

  return NextResponse.json({
    chainId: `eip155:${baseSepolia.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [], // "function rent(uint256 fid, uint256 units) payable"
      to: userId,
      data: '0x783a112b0000000000000000000000000000000000000000000000000000000000000e250000000000000000000000000000000000000000000000000000000000000001',
      value: parseGwei('100000').toString(),
    },
  });
}
