'use client'
import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianAxis,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

import { Button } from "../components/ui/button"
import { useTheme } from 'next-themes'


export default function LineGraph() {
    const [selectedCoin, setSelectedCoin] = useState('BTC');
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const fetchCoinData = (coin: any) => {
            fetch(`/api/coins/${coin}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setCryptoData(data.data);
                })
                .catch(error => {
                    console.error('Error fetching coin data:', error);
                    setCryptoData([]); // Set to an empty array if error
                });
        };

        fetchCoinData(selectedCoin);
    }, [selectedCoin]);

    const { theme, setTheme } = useTheme()

    return (
        <div className='mt-[50px] mx-auto w-[100%]' key={cryptoData.length}>
            <div className='text-xl mt-[20px] md:text-3xl font-bold relative w-[80%] py-3 md:items-center md:justify-between  dark:bg-background text-primary'>{selectedCoin}</div>
            <ResponsiveContainer width={"100%"} height={350}>
                <LineChart data={cryptoData} margin={{ top: 0, left: -10, right: 0, bottom: 0 }}>
                    <Line type='monotone' dataKey='price' stroke={theme == 'dark' ? '#F0B90B' : '#ec7018'} width={50} strokeWidth={3} />
                    <XAxis
                        dataKey='timeVisual'
                        stroke={theme == 'dark' ? '#F0B90B' : '#ec7018'}
                        tickLine={false}
                        axisLine={true}
                        fontSize={13}
                        padding={{ left: 0, right: 0 }} />
                    <YAxis
                        stroke={theme == 'dark' ? '#F0B90B' : '#ec7018'}
                        tickLine={false}
                        axisLine={true}
                        fontSize={13}
                        domain={['auto', 'auto']}  // Dynamically set the domain based on data
                        padding={{ top: 0, bottom: 0 }} />
                    <CartesianGrid strokeDasharray="2 2" className='opacity-90' stroke={theme == 'dark' ? '#F0B90B' : '#ec7018'} />
                </LineChart>
            </ResponsiveContainer>
            <header className="text-xl mt-[20px] md:text-3xl font-bold relative w-[80%] py-3 md:items-center md:justify-between  dark:bg-background text-primary">
                Our platform offers the following coin signals
            </header>
            <div className="flex gap-4 mb-10 flex-col md:flex-row justify-between">
                <Button className="mt-5 md:w-1/5" onClick={() => setSelectedCoin('BTC')}>BTC/USDT</Button>
                <Button className="mt-5 md:w-1/5" onClick={() => setSelectedCoin('ETH')}>ETH/USDT</Button>
                <Button className="mt-5 md:w-1/5" onClick={() => setSelectedCoin('XRP')}>XRP/USDT</Button>
                <Button className="mt-5 md:w-1/5" onClick={() => setSelectedCoin('LTC')}>LTC/USDT</Button>
            </div>
        </div>
    )
}