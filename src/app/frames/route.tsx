/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const totalPages = 5;

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL || '';

export const frames = createFrames({

    initialState: {
        pageIndex: 0,
    },
});

const handleRequest = frames(async (ctx) => {
    const pageIndex = Number(ctx.searchParams.pageIndex || 0);


    const imageUrl = `https://picsum.photos/seed/frames.js-${pageIndex}/300/200`;

    return {
        image: (
            <div tw="flex flex-col">
                <img width={300} height={200} src={imageUrl} alt="Image" />
                <div tw="flex">
                    This is slide {pageIndex + 1} / {totalPages}
                </div>
            </div>
        ),
        buttons: [
            <Button
                action="post"
                target={`${NEXT_PUBLIC_URL}/frames/?pageIndex=${(pageIndex - 1) % totalPages}`}
            >
                ←
            </Button>,
            <Button action="tx" target={`${NEXT_PUBLIC_URL}/api/txdata`} >
                Buy it
            </Button >,
            <Button
                action="post"
                target={`${NEXT_PUBLIC_URL}/frames/?pageIndex=${(pageIndex + 1) % totalPages}`}
            >
                →
            </Button >,
        ],
        textInput: "Type something!",
    };
});
export const GET = handleRequest;
export const POST = handleRequest;