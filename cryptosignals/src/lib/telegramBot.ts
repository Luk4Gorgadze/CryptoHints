// lib/telegrambot.ts
import TelegramBot from 'node-telegram-bot-api';
import prisma from '@/lib/prisma';

let botInstance: TelegramBot | null = null;
if (process.env.NODE_ENV === "production") {
    botInstance = new TelegramBot(process.env.BOT_TOKEN!, { polling: false });
}
else {
    if (!global.botInstance) {
        global.botInstance = new TelegramBot(process.env.BOT_TOKEN!, { polling: true });
    }
    botInstance = global.botInstance;
}


botInstance.onText(/\/start/, async (msg) => {
    let tChat;
    if (msg.chat.id && msg.chat.username) {
        tChat = await prisma.telegramChat.findFirst({
            where: {
                Username: msg.chat.username
            }
        });
    }
    if (tChat != null) {
        await prisma.telegramChat.update({
            where: { id: tChat.id },
            data: {
                chatId: msg.chat.id.toString()
            }
        });
        botInstance.sendMessage(msg.chat.id, 'hey there! from now on you will receive daily crypto signals, **happy trading**!', { parse_mode: 'Markdown' });
    } else {
        botInstance.sendMessage(msg.chat.id, 'You need to type your username on our website first! Go to Bot section and input your username.', { parse_mode: 'Markdown' });
    }
});


const sendMessageToAllChats = async (message: string) => {
    const telegramChats = await prisma.telegramChat.findMany();

    await Promise.all(telegramChats.map(chat => {
        if (chat.chatId?.valueOf() !== null) {
            let chtId = parseInt(chat.chatId);
            botInstance.sendMessage(chtId, message, { parse_mode: 'Markdown' });
        }
    }));
};

export { botInstance, sendMessageToAllChats };
