import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import MyLineChart from "@/components/MyLineChart";
import BTC_image from "@/app/BTC.gif";
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { useState } from "react";
import TransitionLink from "@/components/TransitionLink";

export default async function Home() {



    return (
        <div className="flex flex-col justify-start flex-nowrap z-50 text-sm w-[80%] mx-auto">
            <div className="flex md:flex-row flex-col justify-between">
                <div className="IndexHeaders md:w-1/3">
                    <header className="text-3xl font-bold relative w-full py-3 md:items-center md:justify-between lg:xl:mx-auto dark:bg-background">
                        <h1 className="relative group w-full lg:text-5xl text-4xl mb-8 lg:mb-10 font-bold tracking-tight">
                            Daily crypto signals <br />
                            <span className="text-primary ">
                                for new traders
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.6 52.4" className="absolute top-3 translate-x-full right-10 w-5 fill-primary group-hover:rotate-[30deg] duration-150">
                                <path d="M50.6 26.7a3.3 3.3 0 0 0-4-2.7l-1.2.2c-4.1.9-7.3 1.1-10 0-2.8-1.1-4.9-3.6-7-7.8-1.5-3-1.7-5.7-2.2-9l-.5-3-.2-1.6-.3-1C24.4.4 23.2 0 22.4 0s-1.5.1-2.2.6c-.4.2-1 .7-1.4 2-.9 3.3-1.3 6.9-2.1 10.3-.6 2.6-1.5 5-3.8 7a21 21 0 0 1-6.8 3.5l-2.7.2c-.7.2-1.4.5-2 1a3.7 3.7 0 0 0-1 4.6c.3.5.9 1.4 2.3 2 1 .4 3.7 1.1 4 1.1 2.4 1 4.4 2.7 5.9 4.9 1.8 2.4 3.3 4.2 4 7.2l1.2 3.6v1.5c0 .6.4 1.1.7 1.5a3 3 0 0 0 2 1.3c.5.2 1.2.2 2 0a8.9 8.9 0 0 0 3.9-3.3c1.7-2.5 3.4-6.1 4.6-7.5 4.2-4.9 9.7-8.5 15.8-10.6l1.1-.2a3.3 3.3 0 0 0 2.7-4ZM25.9 37.1c-.8.9-1.8 2.7-3 4.6-1-3.3-2.6-5.6-4.7-8.5a19.1 19.1 0 0 0-5.3-5.3c1.6-.8 3.1-1.8 4.4-2.9 2.2-1.8 3.7-4 4.7-6.3l.4.8c3 6 6.4 9.4 10.4 11h.2c-2.6 1.9-5 4.2-7.1 6.6Z">
                                </path></svg>
                            <svg className="absolute bottom-1 -left-0 w-7 -translate-x-full translate-y-full fill-primary -rotate-[85deg] group-hover:-rotate-[95deg] duration-150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 73.4">
                                <path d="M22.4 68.5A132 132 0 0 0 2.8 65c-1.4-.2-2.7.8-2.8 2.2-.2 1.4.8 2.6 2.1 2.8 6.3.8 12.8 1.7 18.9 3.4 1.3.4 2.7-.4 3.1-1.7.4-1.3-.4-2.7-1.7-3.1Zm19.4-25.4c-10.3-10.5-21.9-19.7-32-30.5-.9-1-2.5-1.1-3.5-.1-1 .9-1.1 2.5 0 3.5 10.1 10.8 21.7 20 32 30.6 1 1 2.6 1 3.6 0 .9-1 1-2.6 0-3.5ZM61.1 2.6l.9 18c0 1.4 1.2 2.4 2.6 2.4 1.4 0 2.4-1.2 2.4-2.6l-.9-18.1a2.6 2.6 0 0 0-2.7-2.4c-1.3 0-2.4 1.3-2.3 2.6Z">
                                </path>
                            </svg>
                            <svg className="absolute -bottom-2 left-[40%]  w-40 md:w-48 translate-y-full fill-primary group-hover:scale-110 duration-150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 665 40.7">
                                <path d="M220.5 3.6c-73.4-.8-147 2.2-218 15.2-1.3.2-1.8.7-1.9.8-.6.6-.6 1.3-.6 1.8 0 .3.4 1.7 2.1 1.8l12.7-.7c15.1-.8 30.3-2 45.4-3.3 34.2-3 68.4-5.6 102.7-8 19.3-1.3 38.5-2.4 57.8-3.3 46.3.5 92.5 2.7 137.8 4.8l-48.3 3a2308.8 2308.8 0 0 0-105 7.9l-5.7.5a3 3 0 0 0-1.3.3 2 2 0 0 0-1.4 2c0 .3 0 2 2.2 2.3 98.1 15.1 200.5-2.5 299 12.2 1.2.2 2.2-.6 2.4-1.8.2-1.2-.6-2.2-1.8-2.4-92.8-13.9-189 1-281.9-9.9a1842.6 1842.6 0 0 1 93.6-6.8c23.3-1.2 54.7-3.6 87.6-5.2l84.7 4.8 35.7 1.8c4.9.3 17.5 1.4 19.3.9 1.4-.3 1.8-1.3 1.8-1.8 0-.6 0-1.2-.6-1.9-.2-.2-.8-.6-2-1-33.2-9.5-87.6-9.4-138.5-7.1l-32.9-1.7c-25.1-1.2-50.5-2.4-76-3.4a5008 5008 0 0 1 215.8 0c30.2.5 111.6 3.8 143.7 6.7-.4.4-.6 1-.6 1.6a2 2 0 0 0 2.2 2c6.6-.3 10.4-.7 12-1.1.9-.2 1.5-.6 1.7-.9.6-.6.7-1.3.6-1.9 0-.4-.3-.8-.7-1.2a5 5 0 0 0-2.1-1c-12.6-3.1-120.8-7.7-156.7-8.3C410.4-.5 315.4-.9 220.5 3.6Z">
                                </path>
                            </svg>
                        </h1>


                    </header>
                    <header className="text-xl font-medium relative max-w-[800px] w-full py-3 md:items-center md:justify-between dark:bg-background">
                        <span className=""> </span>
                        <TextGenerateEffect
                            words="Our webservice provides good moments and signals to automate the process of trading with crypto coins and does not guarantee that users will gain profits. Use this tool with caution"
                            fontSize="text-xl"
                            color="dark:text-white text-black"
                            className="text-black dark:text-white" />
                    </header>
                    <TransitionLink href='/pricing'><div className="mt-5 text-base bg-primary rounded-sm px-5 py-2 dark:text-white font-medium">Get Started</div></TransitionLink>
                </div>
                <div className="IndexGif mt-[50px] md:mt-0 md:w-1/2 ">
                    <img src="/BTC.gif" alt="My Image" className="object-cover h-full w-full rounded-xl" />
                </div>
            </div>



            <MyLineChart />

        </div>
    );
}