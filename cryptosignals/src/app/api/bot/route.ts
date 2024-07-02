import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const botToken = process.env.BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, async (msg) => {
    let tChat;
    console.log("message received", msg.chat.username)

    if (msg.chat.id && msg.chat.username) {
        tChat = await prisma.telegramChat.findFirst({
            where: {
                chatId: msg.chat.id.toString(),
                Username: msg.chat.username
            }
        });
    }
    if (tChat == null && msg.chat.username) {
        await prisma.telegramChat.create({
            data: {
                chatId: msg.chat.id.toString(),
                Username: msg.chat.username
            }
        });
        bot.sendMessage(msg.chat.id, 'hey there! from now on you will receive daily crypto signals, happy trading!');
    }

});

export async function POST(req: NextRequest) {
    let anyChat = await prisma.telegramChat.findFirst();
    if (anyChat) {
        return NextResponse.json({ message: "Bot started" }, { status: 200 });
    }
    return NextResponse.json({ message: "Bot not started" }, { status: 400 });
}
