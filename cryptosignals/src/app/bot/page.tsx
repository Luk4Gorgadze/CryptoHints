'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toaster, toast } from 'sonner'



export default function Bot() {
    const [subscriptionPlan, setSubscriptionPlan] = useState(null);
    const [telegramId, setTelegramId] = useState('');

    const currentUser = async () => {
        try {
            let response = await axios.get('/api/currentUser')
            if (response.data.data) {
                setSubscriptionPlan(response.data.data.subscriptionPlan)
            }

        } catch (err) {

            return null
        }
    }

    const saveTelegramId = async (telegram_id: String) => {
        try {
            let response = await axios.post('/api/telegram', {
                telegramUsername: telegram_id
            });

            toast.success('Successfully saved your telegram username');
        } catch (err) {
            return null
        }
    }


    useEffect(() => {
        currentUser();
    }, []);

    const handleSubscribe = () => {
        saveTelegramId(telegramId);
    };

    return (
        <div className='mx-auto py-8 w-[80%] text-black dark:text-white mb-[500px]'>
            {subscriptionPlan && (
                <div>
                    <div className='text-lg font-bold'>Bot Manual</div>
                    <div className='mt-5'>Please type your <span className='font-bold'>telegram id </span> in order to recieve notifications from Crypto Bot</div>
                    <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
                        <Input
                            type="text"
                            placeholder="telegram_id"
                            value={telegramId}
                            onChange={(e) => setTelegramId(e.target.value)} // Update the state with the input value
                        />
                        <Button type="submit" onClick={handleSubscribe}>Subscribe</Button>
                    </div>
                    <div className='mt-5'>After subscribing, chat with:  <a href='https://t.me/crypto_hints_bot' className="text-blue-600">CryptoHints Bot</a>. Run command <span className='font-bold'>`/start`</span> to receive signals</div>
                    <div className='mt-5'>NOTE: be patient with bot, it will respond to your command in 1 minute as our APIs get executed once every minute</div>
                </div>
            )}
            {!subscriptionPlan && <div className='text-lg font-bold'>You need subscription to see the bot manual on this page</div>}
        </div>
    )
}
