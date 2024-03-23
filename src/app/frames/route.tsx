
// ./app/frames/route.tsx
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL;
const handleRequest = frames(async (ctx) => {
    return {
        image: (
            <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
                This is rendered as an image
            </div>
        ),
        buttons: [
            <Button action="post" target={{ query: { value: "Yes" } }}>
                {`< Back`}
            </Button>,
            <Button action="tx" target={`${NEXT_PUBLIC_URL}/api/txdata`} >
                Buy a unit
            </Button >,
            <Button action="post" target={{ query: { value: "No" } }}>
                {`Next >`}
            </Button>,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
