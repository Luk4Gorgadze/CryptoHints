'use client'
import { usePathname } from 'next/navigation';
import TransitionLink from "./TransitionLink";

export default function NavbarButtons() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const isBotPage = pathname === '/bot';
    const isAboutPage = pathname === '/about';
    const isPricingPage = pathname === '/pricing';
    return (
        <div className="flex flex-row gap-5 md:w-1/4 justify-between md:justify-between">
            <TransitionLink href="/"><div className={`font-medium text-base my-auto md:py-6 ${isHomePage ? 'text-primary hover:text-gray-400' : 'text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'}`} aria-current="page">Home</div></TransitionLink>
            <TransitionLink href='/bot'><div className={`font-medium text-base my-auto md:py-6 ${isBotPage ? 'text-primary hover:text-gray-400' : 'text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'}`} aria-current="page">Bot</div></TransitionLink>
            <TransitionLink href='/about'><div className={`font-medium text-base my-auto md:py-6 ${isAboutPage ? 'text-primary hover:text-gray-400' : 'text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'}`}>About</div></TransitionLink>
            <TransitionLink href='/pricing'><div className={`font-medium text-base my-auto md:py-6 ${isPricingPage ? 'text-primary hover:text-gray-400' : 'text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'}`}>Pricing</div></TransitionLink>
        </div>
    )
}