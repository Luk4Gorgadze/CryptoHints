'use server'
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import taapiClient from "@/lib/taapiClient";

export async function GET(req: NextRequest, route: { params: { coin: string } }) {
    let current_symbol = route.params.coin.toUpperCase();
    let data = await prisma.cryptoData.findMany({
        where: { symbol: current_symbol },
        orderBy: { time: 'asc' },
        take: 20
    });

    return NextResponse.json({ data: data }, { status: 200 });
}
