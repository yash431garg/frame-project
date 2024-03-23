import { TransactionTargetResponse } from 'frames.js';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseEther } from 'viem';
import { base } from 'viem/chains';
import { baseSepolia } from 'viem/chains';
console.log(baseSepolia);

export function POST(
  req: NextRequest
): NextResponse<TransactionTargetResponse> {
  // console.log(req, 'run');
  return NextResponse.json({
    chainId: `eip155:${baseSepolia.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [], // "function rent(uint256 fid, uint256 units) payable"
      to: '0xb1eb022943369109207B56201F98DD235a605C30',
      data: '0x783a112b0000000000000000000000000000000000000000000000000000000000000e250000000000000000000000000000000000000000000000000000000000000001',
      value: '1',
    },
  });
}
