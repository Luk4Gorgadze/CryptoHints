'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function Bot() {
    const [subscriptionPlan, setSubscriptionPlan] = useState(null);

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


    useEffect(() => {
        currentUser();
    }, []);
    return (
        <div className='mx-auto py-8 w-[80%] text-black dark:text-white mb-[500px]'>
            {subscriptionPlan && (
                <div>
                    <div className='text-lg font-bold'>Bot Manual</div>
                    <div className='mt-5'>Please type your <span className='font-bold'>telegram id </span> in order to recieve notifications from Crypto Bot</div>
                    <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
                        <Input type="email" placeholder="telegram_id" />
                        <Button type="submit">Subscribe</Button>
                    </div>
                </div>
            )}
            {!subscriptionPlan && <div className='text-lg font-bold'>Please login to see bot manual on this page</div>}
        </div>
    )
}
