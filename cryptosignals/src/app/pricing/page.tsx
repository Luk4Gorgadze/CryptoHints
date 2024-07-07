import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import PriceCards from "@/components/PriceCards";

export default async function Pricing() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();



    return (
        <div className="about-page mx-autow-[80%] text-black dark:text-white mb-[250px]" >
            <section className="">
                <PriceCards user_id={user?.id} />
            </section>
        </div>
    );
}
