'use server'
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import taapiClient from "@/lib/taapiClient";

const symbols = ['BTC', 'ETH', 'XRP', 'LTC'];
const VALID_TOKEN = process.env.COIN_API_POST_KEY;  // Replace with your actual token


const fetchBulkCoinData = async (coinSymbol: string) => {
    taapiClient.resetBulkConstructs();
    taapiClient.addCalculation("price", `${coinSymbol}/USDT`, "1m", 'coin');
    taapiClient.addCalculation("macd", `${coinSymbol}/USDT`, "1m", 'macd');
    taapiClient.executeBulk().then(results => {

        const processData = async (coinSymbol, timeNow, current_time, data, prisma) => {
            await prisma.cryptoData.create({
                data: {
                    symbol: coinSymbol,
                    time: timeNow,
                    timeVisual: current_time,
                    price: data.coin.value,
                }
            });

            const cryptoDataCount = await prisma.cryptoData.count({
                where: {
                    symbol: coinSymbol
                }
            });

            if (cryptoDataCount > 20) {
                const oldestCryptoData = await prisma.cryptoData.findFirst({
                    where: {
                        symbol: coinSymbol
                    },
                    orderBy: [{ time: 'asc' }]
                });

                if (oldestCryptoData) {
                    await prisma.cryptoData.delete({
                        where: { id: oldestCryptoData.id }
                    });
                }
            }
        };

        console.log(results);
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let current_time = `${hour}:${minute < 10 ? '0' : ''}${minute}`;
        let timeNow = new Date();

        processData(coinSymbol, timeNow, current_time, results, prisma);

    }).catch(error => {
        console.error(error)
    });

}


const validateToken = (req) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        console.log('no auth header')
        return false;
    }

    return authHeader === VALID_TOKEN;
};

const fetchNextCoin = async () => {
    let currentCoin = await prisma.currentFetchingCoin.findFirst();

    if (!currentCoin) {
        currentCoin = await prisma.currentFetchingCoin.create({
            data: { symbol: symbols[0] }
        });
    }

    const currentSymbol = currentCoin.symbol;
    await fetchBulkCoinData(currentSymbol);
    console.log('fetching coin data for', currentSymbol)

    // Update to next symbol
    const currentIndex = symbols.indexOf(currentSymbol);
    const nextIndex = (currentIndex + 1) % symbols.length;
    const nextSymbol = symbols[nextIndex];

    await prisma.currentFetchingCoin.update({
        where: { id: currentCoin.id },
        data: { symbol: nextSymbol }
    });
};


export async function POST(req: NextRequest) {
    if (!validateToken(req)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await fetchNextCoin();

    return NextResponse.json({ message: "Fetching started" }, { status: 200 });
}
