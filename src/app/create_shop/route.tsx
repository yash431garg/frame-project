/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { getAddressForFid } from "frames.js"
import backgroundImg from '../../../public/background.png'
import cryptoRandomString from 'crypto-random-string';
import { supabase } from '../lib/supabase'

const totalPages = 5;
const storeItems = []

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL || '';

export const frames = createFrames();

const handleRequest = frames(async (ctx) => {

    if (ctx?.message?.inputText) {
        const id = cryptoRandomString({ length: 6, type: 'distinguishable' });
        await supabase.from('item_data').insert({
            fid: ctx?.message?.castId.fid,
            data: ctx?.message?.inputText,
            id: id,
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
                target={`${NEXT_PUBLIC_URL}/create_shop`}
            >
                Save
            </Button>,
            <Button
                action="link"
                target={`https://warpcast.com/~/developers/frames?url=${NEXT_PUBLIC_URL}/shop/${ctx?.message?.castId.fid}`}
            >
                My shop
            </Button>,
        ],
        textInput: "Enter Product",
    };
});
export const GET = handleRequest;
export const POST = handleRequest;