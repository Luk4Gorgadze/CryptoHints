'use server'
import { validateToken } from '@/lib/helpers';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToAllChats } from '@/lib/telegramBot';


export async function POST(req: NextRequest) {
    if (!validateToken(req)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { message } = body;
    if (message !== "NOTHING") {
        sendMessageToAllChats(message);

        return NextResponse.json({ message: "Started sending messages to users" }, { status: 200 });
    }
    else {
        return NextResponse.json({ message: "Keeping bot route alive" }, { status: 200 });
    }

}
