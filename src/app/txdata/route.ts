import { TransactionTargetResponse } from 'frames.js';
import {
  POST as POSTNext,
  PreviousFrame,
  getPreviousFrame,
} from 'frames.js/next/server';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseEther, parseGwei } from 'viem';
import { baseSepolia } from 'viem/chains';
// console.log(baseSepolia);

export function POST(
  req: NextRequest
): NextResponse<TransactionTargetResponse> {
  return NextResponse.json({
    chainId: `eip155:${baseSepolia.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [], // "function rent(uint256 fid, uint256 units) payable"
      to: '0xb1eb022943369109207B56201F98DD235a605C30',
      data: '0x783a112b0000000000000000000000000000000000000000000000000000000000000e250000000000000000000000000000000000000000000000000000000000000001',
      value: parseGwei('1000000').toString(),
    },
  });
}
