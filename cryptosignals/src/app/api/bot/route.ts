import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const botToken = process.env.BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, async (msg) => {
    let tChat;
    console.log("message received", msg.chat.username)
    if (msg.chat.id) {
        tChat = await prisma.telegramChat.findFirst({
            where: {
                chatId: msg.chat.id.toString()
            }
        });
    }
    if (tChat == null) {
        await prisma.telegramChat.create({
            data: {
                chatId: msg.chat.id.toString()
            }
        });
        bot.sendMessage(msg.chat.id, 'Hello! I am an amazing crypto hints bot, I will send you the best crypto signals!');
    }

});

export async function POST(req: NextRequest) {
    let anyChat = await prisma.telegramChat.findFirst();
    if (anyChat) {
        return NextResponse.json({ message: "Bot started" }, { status: 200 });
    }
    return NextResponse.json({ message: "Bot not started" }, { status: 400 });
}
