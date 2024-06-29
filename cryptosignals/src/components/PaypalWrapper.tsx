'use client'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios';
import { resolve } from 'path';

interface PaypalWrapperProps {
    user_id: string;
    order_price: number;
}

export default function PaypalWrapper({ user_id, order_price }: PaypalWrapperProps) {

    const paypalCreateOrder = async () => {
        try {
            let response = await axios.post('/api/paypal/createOrder', {
                user_id,
                order_price
            })
            console.log("Response: ", response)
            let order = response.data.data.order;
            console.log("Order: ", order.id)
            return order.id
        } catch (err) {
            // Your custom code to show an error like showing a toast:
            // toast.error('Some Error Occured')
            return null
        }
    }

    const paypalCaptureOrder = async (orderID: string) => {
        try {
            let response = await axios.post('/api/paypal/captureOrder', {
                orderID
            })
            if (response.data.success) {
                // Order is successful
                // Your custom code

                // Like showing a success toast:
                // toast.success('Amount Added to Wallet')

                // And/Or Adding Balance to Redux Wallet
                // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
            }
        }
        catch (err) {
            // Order is not successful
            // Your custom code

            // Like showing an error toast
            // toast.error('Some Error Occured')
        }
    }

    return (
        <div style={{ colorScheme: 'none' }}>
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
        </div>)
}
