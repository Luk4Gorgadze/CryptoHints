'use client'
import { Button } from '../components/ui/button';
import PaypalWrapper from '../components/PaypalWrapper';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from 'react';


interface PriceCardProps {
    user_id: string | undefined;
}

export default function PriceCards({ user_id }: PriceCardProps) {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [count, setCount] = useState(0);

    const handlePaymentSuccess = () => {
        setCount(count + 1);
        setPaymentSuccess(true);
    };

    return (
        <div className="px-4 mx-auto max-w-screen-xl lg:px-6">
            <div className="lg:flex sm:gap-6 xl:gap-10" key={paymentSuccess.toString()}>
                <div className="mt-5 md:mt-0 justify-between flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-background dark:text-white">
                    <div>
                        <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for starting out and developing strategies</p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">$2.99</span>
                            <span className="text-gray-500 dark:text-gray-400">/one-time</span>
                        </div>
                        <ul role="list" className="mb-8 space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>One time payment</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>4 crypto coin signals</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Daily notifications</span>
                            </li>

                        </ul>
                    </div>
                    {user_id && (
                        <PaypalWrapper user_id={user_id} order_price={2.99} onPaymentSuccess={handlePaymentSuccess} />
                    )}
                    {!user_id && (
                        <LoginLink className="mt-5"><Button className="w-[100%]">Get Started</Button></LoginLink>
                    )
                    }
                </div>
                <div className="mt-5 md:mt-0 justify-between flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-background dark:text-white">
                    <div>
                        <h3 className="mb-4 text-2xl font-semibold">Standard</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Access to all crypto coin datas and indicators included</p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">$29.9</span>
                            <span className="text-gray-500 dark:text-gray-400">/one-time</span>
                        </div>
                    </div>
                    <div className='font-bold text-4xl'>COMING UP</div>
                    <Button className="mt-5" disabled={true}>In development</Button>
                </div>
                <div className="mt-5 md:mt-0 flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-background dark:text-white justify-between">
                    <div>
                        <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Integrated AI assistant which will give you recommendations</p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">$99.99</span>
                            <span className="text-gray-500 dark:text-gray-400">/one-time</span>
                        </div>

                    </div>
                    <div className='font-bold text-4xl'>COMING UP</div>
                    <Button className="mt-5" disabled={true}>In development</Button>
                </div>
            </div>
        </div>
    )

}
