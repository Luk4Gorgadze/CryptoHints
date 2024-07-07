import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) {
            console.error("Authentication error:", user);
            return new NextResponse("Unauthorized", { status: 401 });
        }

        let dbUser;
        if (user.id) {
            dbUser = await prisma.user.findUnique({
                where: { id: user.id }
            });
        }
        // create user if does not currently exist in database
        if (dbUser == null) {
            dbUser = await prisma.user.create({
                data: {
                    id: user.id,
                    firstName: user.given_name ?? "",
                    lastName: user.family_name ?? "",
                    email: user.email ?? ""
                }
            });
        }

        return NextResponse.redirect(process.env.KINDE_SITE_URL ?? ""); // Provide a default value for process.env.KINDE_SITE_URL
    } catch (error) {
        console.error("Error in GET request:", error);
    } finally {
        await prisma.$disconnect();
    }
}