'use client'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios';
import { resolve } from 'path';
import prisma from "@/lib/prisma";
import { useState, useEffect } from 'react';

interface PaypalWrapperProps {
    user_id: string;
    order_price: number;
}

export default function PaypalWrapper({ user_id, order_price }: PaypalWrapperProps) {

    const [subscriptionPlan, setSubscriptionPlan] = useState(null);


    const paypalCreateOrder = async () => {
        try {
            let response = await axios.post('/api/paypal/createOrder', {
                user_id,
                order_price
            })
            let order = response.data.data.order;
            return order.id
        } catch (err) {
            return null
        }
    }

    const paypalCaptureOrder = async (orderID: string) => {
        try {
            let response = await axios.post('/api/paypal/captureOrder', {
                orderID
            })
            if (response.data.success) {

            }
        }
        catch (err) {

        }
    }

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
    }, [user_id]);


    return (
        <div style={{ colorScheme: 'none' }}>

            {subscriptionPlan && (
                <div className='text-lg'>
                    <h1>Already Subscribed</h1>
                </div>
            )}
            {!subscriptionPlan && (
                <PayPalScriptProvider
                    options={{
                        'client-id': 'AZhtxZMZJTfwY2oqc-2BDdMJZzAyOYc0khW8T2lc1TchYAb3hqyIGlc3EYR1bvpAct-6D7xnUG6DkeIZ',
                        currency: 'USD',
                        intent: 'capture'
                    }}
                >
                    <PayPalButtons
                        style={{
                            color: 'gold',
                            shape: 'rect',
                            label: 'pay',
                            height: 50
                        }}
                        createOrder={async (data, actions) => {
                            let order_id = await paypalCreateOrder()
                            return order_id + ''
                        }}
                        onApprove={async (data, actions) => {
                            let response = await paypalCaptureOrder(data.orderID)
                            if (response) return true;
                        }}
                    />
                </PayPalScriptProvider >
            )}

        </div>)
}
