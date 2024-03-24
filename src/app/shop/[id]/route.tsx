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
    if (ctx.message?.transactionId) {
        return {
            image: (
                <div tw="bg-white w-10/12 h-full justify-center items-center flex flex-col">
                    <p>
                        Your order is on the way 🏎️!
                    </p>
                    <p tw="">
                        {ctx.message.transactionId}
                    </p>
                </div>
            ),
            imageOptions: {
                aspectRatio: "1:1",
            },
            buttons: [
                <Button
                    action="link"
                    target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}
                >
                    View on block explorer
                </Button>,
            ],
        };
    }
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
                {totalItems > 0 ? <><img src={imageUrl} alt="Image" />
                    <div tw="flex text-5xl text-black absolute top-80 left-40">
                        {itemData?.data?.[pageIndex].data}
                    </div></> : "Under Development"}
            </div>

        ),
        buttons: [
            <Button
                action="post"
                target={`${NEXT_PUBLIC_URL}/shop/${match?.[0]}/?pageIndex=${(pageIndex - 1) % totalItems}`}
            >
                ←
            </Button>,
            <Button action="tx" target={`${NEXT_PUBLIC_URL}/txdata`} >
                Buy it
            </Button >,
            <Button
                action="post"
                target={`${NEXT_PUBLIC_URL}/shop/${match?.[0]}/?pageIndex=${(pageIndex + 1) % totalItems}`}
            >
                →
            </Button >,
        ],
        textInput: "Type something!",
    };
});
export const GET = handleRequest;
export const POST = handleRequest;