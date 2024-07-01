'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


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
        <div className='mx-auto py-8 w-[80%] text-black dark:text-white'>
            {subscriptionPlan ? <h1>Bot Page</h1> : <h1>Unauthorized</h1>}
        </div>
    )
}
