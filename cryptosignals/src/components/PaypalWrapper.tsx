'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/router';

interface PaypalWrapperProps {
    user_id: string;
    order_price: number;
    onPaymentSuccess: () => void;
}

export default function PaypalWrapper({ user_id, order_price, onPaymentSuccess }: PaypalWrapperProps) {
    const [subscriptionPlan, setSubscriptionPlan] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // This ensures the component runs only on the client side
        setIsClient(true);
    }, []);

    const paypalCreateOrder = async () => {
        try {
            let response = await axios.post('/api/paypal/createOrder', {
                user_id,
                order_price
            });
            let order = response.data.data.order;
            return order.id;
        } catch (err) {
            return null;
        }
    };

    const paypalCaptureOrder = async (orderID: string) => {
        try {
            let response = await axios.post('/api/paypal/captureOrder', { orderID });

            if (response.data.success) {
                onPaymentSuccess(); // Trigger the callback
                router.reload(); // Reload the page
            }
        } catch (err) {
            console.error(err);
        }
    };

    const currentUser = async () => {
        try {
            let response = await axios.get('/api/currentUser');
            if (response.data.data) {
                setSubscriptionPlan(response.data.data.subscriptionPlan);
            }
        } catch (err) {
            return null;
        }
    };

    useEffect(() => {
        if (isClient) {
            currentUser();
        }
    }, [user_id, isClient]);

    if (!isClient) {
        return null; // Render nothing on the server side
    }

    return (
        <div style={{ colorScheme: 'none' }} key={subscriptionPlan}>
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
                    <div className="relative z-0">
                        <PayPalButtons
                            style={{
                                color: 'gold',
                                shape: 'rect',
                                label: 'pay',
                                height: 50,
                            }}
                            createOrder={async (data, actions) => {
                                let order_id = await paypalCreateOrder();
                                return order_id + '';
                            }}
                            onApprove={async (data, actions) => {
                                setSubscriptionPlan('A');
                                let response = await paypalCaptureOrder(data.orderID);
                                if (response) return true;
                            }}
                        />
                    </div>
                </PayPalScriptProvider>
            )}
        </div>
    );
}
