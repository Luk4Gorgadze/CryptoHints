'use server'
import prisma from '../../../lib/prisma';
import { NextResponse, NextRequest } from "next/server";
import taapiClient from "../../../lib/taapiClient";
import { validateToken } from "../../../lib/helpers";
import axios from 'axios';
const symbols = ['BTC', 'ETH', 'XRP', 'LTC'];



const fetchBulkCoinData = async (coinSymbol: string) => {
    taapiClient.resetBulkConstructs();
    taapiClient.addCalculation("price", `${coinSymbol}/USDT`, "15m", 'coin');
    taapiClient.addCalculation("macd", `${coinSymbol}/USDT`, "15m", 'macd');
    taapiClient.executeBulk().then(results => {

        const processData = async (coinSymbol: any, timeNow: any, current_time: any, data: any, prisma: any) => {
            detectTrend(data, coinSymbol);
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
        type CoinData = {
            value: number;
        };

        type MACDData = {
            valueMACD: number;
            valueMACDSignal: number;
            valueMACDHist: number;
        };

        type MarketData = {
            coin: CoinData;
            macd: MACDData;
        };

        type Signal = {
            type: 'bullish' | 'bearish' | 'neutral';
            message: string;
        };

        const detectTrend = async (marketData: MarketData, coinSymbol: any): Promise<void> => {
            const { valueMACD, valueMACDSignal, valueMACDHist } = marketData.macd;
            let coinNotification = await prisma.coinNotification.findFirst({
                where: {
                    symbol: coinSymbol
                }
            });

            let current_time = new Date();
            let timeOffset = 1 * 60 * 1000;


            const headers = {
                'Authorization': process.env.COIN_API_POST_KEY
            };
            if (coinNotification && current_time.getTime() > coinNotification.updatedAt.getTime() + timeOffset) {
                if (valueMACD > valueMACDSignal && valueMACDHist > 0 && valueMACD < 0 && valueMACDSignal < 0) {
                    const message = `
                    *Strong Buy Signal for ${coinSymbol}* 🟢\n\n*Type:* *Bullish*`;
                    let response = await axios.post(process.env.KINDE_SITE_URL + '/api/bot', {
                        message: message,
                        parse_mode: 'Markdown',
                    }, { headers });
                } else if (valueMACD < valueMACDSignal && valueMACDHist < 0 && valueMACD > 0 && valueMACDSignal > 0) {
                    const message = `
                    *Strong Sell Signal for ${coinSymbol}* 🔴\n\n*Type:* *Bearish*`;
                    let response = await axios.post(process.env.KINDE_SITE_URL + '/api/bot', {
                        message: message,
                        parse_mode: 'Markdown',
                    }, { headers });
                }
                else {
                    const message = `NOTHING`;
                    let response = await axios.post(process.env.KINDE_SITE_URL + '/api/bot', {
                        message: message,
                    }, { headers });

                }
            }

            if (coinNotification && current_time.getTime() > coinNotification.updatedAt.getTime() + timeOffset) {
                await prisma.coinNotification.update({
                    where: { id: coinNotification.id },
                    data: {
                        updatedAt: current_time,
                    }
                });
            }
            else if (!coinNotification) {
                await prisma.coinNotification.create({
                    data: {
                        symbol: coinSymbol,
                        updatedAt: current_time,
                    }
                });
            }

        }

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



const fetchNextCoin = async () => {
    let currentCoin = await prisma.currentFetchingCoin.findFirst();

    if (!currentCoin) {
        currentCoin = await prisma.currentFetchingCoin.create({
            data: { symbol: symbols[0] }
        });
    }

    const currentSymbol = currentCoin.symbol;
    await fetchBulkCoinData(currentSymbol);

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
