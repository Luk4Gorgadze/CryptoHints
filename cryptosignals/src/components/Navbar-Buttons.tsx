'use client'
import { usePathname } from 'next/navigation';

export default function NavbarButtons() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const isAboutPage = pathname === '/about';
    const isPricingPage = pathname === '/pricing';
    return (
        <div className="flex flex-row gap-5 md:w-1/4 justify-between md:justify-between">
            <a className={`font-medium my-auto md:py-6 ${isHomePage ? 'text-primary hover:text-gray-400' : 'text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'}`} href="/" aria-current="page">Home</a>
            <a className={`font-medium my-auto md:py-6 ${isAboutPage ? 'text-primary hover:text-gray-400' : 'text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'}`} href="/about">About</a>
            <a className={`font-medium my-auto md:py-6 ${isPricingPage ? 'text-primary hover:text-gray-400' : 'text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'}`} href="/pricing">Pricing</a>
        </div>
    )
}