/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { supabase } from '../lib/supabase'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL || '';

export const frames = createFrames();

const handleRequest = frames(async (ctx) => {

    if (ctx?.message?.inputText) {
        await supabase.from('user_address').insert({
            fid: ctx?.message?.castId.fid,
            address: ctx?.message?.inputText,
        });
    }
    const imageUrl = 'https://dwscixefzodpolbzcyox.supabase.co/storage/v1/object/public/base_shop_bucket/shop.png';

    return {
        image: (
            <div tw="flex w-8/12 text-pretty relative" >
                <img src={imageUrl} alt="Image" />
            </div>

        ),
        buttons: [
            <Button
                action="post"
                target={`${NEXT_PUBLIC_URL}/add_address`}
            >
                Save
            </Button>,
            <Button
                action="link"
                target={`https://warpcast.com/~/developers/frames?url=${NEXT_PUBLIC_URL}/shop/${ctx?.message?.castId.fid}`}
            >
                My shop
            </Button>,
            <Button
                action="post"
                target={`${NEXT_PUBLIC_URL}/create_shop`}
            >
                Go Back
            </Button>,

        ],
        textInput: "Enter your base address",
    };
});
export const GET = handleRequest;
export const POST = handleRequest;