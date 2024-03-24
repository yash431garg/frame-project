/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { supabase } from "@/app/lib/supabase";


const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL || '';

export const frames = createFrames({
    initialState: {
        pageIndex: 0,
    },
});

const handleRequest = frames(async (ctx) => {
    const pageIndex = Number(ctx.searchParams.pageIndex || 0);
    const imageUrl = 'https://dwscixefzodpolbzcyox.supabase.co/storage/v1/object/public/base_shop_bucket/shop_items.png';
    // Regular expression pattern to extract numbers
    const pattern = /\d+/;

    // Using RegExp.prototype.exec() to extract the number from the pathname
    const match = pattern.exec(ctx.url.pathname);

    const itemData = await supabase
        .from('item_data')
        .select()
        .eq('fid', match?.[0]);

    const totalItems = itemData?.data?.length || 0

    return {
        image: (

            <div tw="flex w-8/12 text-pretty relative" >
                <img src={imageUrl} alt="Image" />
                <div tw="flex text-5xl text-black absolute top-80 left-80">
                    {itemData?.data?.[pageIndex].data}
                </div>
            </div>

        ),
        buttons: [
            <Button
                action="post"
                target={`${NEXT_PUBLIC_URL}/shop/?pageIndex=${(pageIndex - 1) % totalItems}`}
            >
                ←
            </Button>,
            <Button action="tx" target={`${NEXT_PUBLIC_URL}/api/txdata`} >
                Buy it
            </Button >,
            <Button
                action="post"
                target={`${NEXT_PUBLIC_URL}/shop/?pageIndex=${(pageIndex + 1) % totalItems}`}
            >
                →
            </Button >,
        ],
        textInput: "Type something!",
    };
});
export const GET = handleRequest;
export const POST = handleRequest;