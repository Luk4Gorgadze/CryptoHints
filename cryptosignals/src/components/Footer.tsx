import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className=" py-4 px-8 w-[80%] mx-auto flex justify-center border-t-2 text-black dark:text-white">
            <p className="text-sm">
                Copyright &copy; {currentYear} LukingGood
            </p>
        </footer>
    );
};

export default Footer;
