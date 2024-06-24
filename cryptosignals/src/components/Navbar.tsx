import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ThemeToggler from "./Theme-toggler";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import NavbarButtons from "./Navbar-Buttons";

export default async function Navbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return (
        <nav className="navbar mt-5 md:mb-20 flex justify-between w-[80%] mx-auto flex-col gap-5 md:flex-row md:gap-0">
            <div className="my-auto md:w-1/4">
                <a className="flex-none text-xl font-semibold text-primary" href="/" aria-label="Brand">CryptoHints</a>
            </div>
            <NavbarButtons />
            <div className="flex flex-row gap-5 md:w-1/4 justify-between md:justify-end">
                <div className="my-auto" >
                    <ThemeToggler />
                </div>
                {!user && (
                    <><LoginLink className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600  md:border-gray-300 md:my-6  dark:text-neutral-400 dark:hover:text-blue-500">
                        Log in
                    </LoginLink>
                        <RegisterLink className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:border-gray-300 md:my-6  dark:text-neutral-400 dark:hover:text-blue-500">
                            Sign up
                        </RegisterLink></>
                )}
                {user && (
                    <LogoutLink className="font-medium my-auto text-gray-500 hover:text-gray-400 md:py-6 dark:text-neutral-400 dark:hover:text-neutral-500">Logout</LogoutLink>
                )}
            </div>
        </nav>

    );
}