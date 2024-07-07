import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { m } from "framer-motion";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    let dbUser;
    if (user) {
        dbUser = await prisma.user.findUnique({
            where: { email: user?.email ?? undefined }
        });
    }
    return NextResponse.json({ message: "User Found", data: dbUser }, { status: 200 });
}