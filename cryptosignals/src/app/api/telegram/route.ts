import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        const body = await req.json();
        const { telegramUsername } = body;

        let telegramChat;

        let currentUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        if (currentUser?.telegramChatId) {
            telegramChat = await prisma.telegramChat.findUnique({
                where: { id: currentUser.telegramChatId }
            });
        }

        if (!telegramChat) {
            await prisma.telegramChat.create({
                data: {
                    User: { connect: { id: user?.id } },
                    Username: telegramUsername,
                }
            });
        } else {
            await prisma.telegramChat.update({
                where: { id: currentUser?.telegramChatId },
                data: {
                    Username: telegramUsername
                }
            });
        }

        return NextResponse.json({ message: "Successfully saved your telegram username" }, { status: 200 });
    } catch (error) {
        console.error('Error saving telegram username:', error);
        return NextResponse.json({ message: "Failed to save your telegram username" }, { status: 500 });
    }
}
