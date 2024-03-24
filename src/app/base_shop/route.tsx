/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { getAddressForFid } from "frames.js"
import backgroundImg from '../../../public/background.png'
import { supabase } from '../lib/supabase'


const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL || '';

export const frames = createFrames();


const handleRequest = frames(async (ctx) => {
    const imageUrl = 'https://dwscixefzodpolbzcyox.supabase.co/storage/v1/object/public/base_shop_bucket/shop.png';

    return {
        image: (
            <div tw="flex w-8/12" >
                <img src={imageUrl} alt="Image" />
            </div>

        ),
        buttons: [
            <Button
                action="post"
                target={`${NEXT_PUBLIC_URL}/create_shop`}
            >
                Create Shop
            </Button>,
            <Button
                action="post"
                target={`${NEXT_PUBLIC_URL}/shop/279471`}
            >
                Visit Shop
            </Button >,
        ],
    };
});
export const GET = handleRequest;
export const POST = handleRequest;