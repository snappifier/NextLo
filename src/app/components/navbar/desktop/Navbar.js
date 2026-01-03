import { strapiFetch } from "@/app/lib/strapi";
import NavbarClient from "./NavbarClient";
import {getFooter} from "@/app/components/footer/FooterServer";

async function getMenu() {
    const json = await strapiFetch({
        endpoint: "/api/menu",
        query: {
            populate: {
                Kategoria: { populate: "*" },
            },
        },
    });
    return json?.data ?? {};
}

export default async function Navbar() {
    const menu = await getMenu();
    const icons = await getFooter(); //Z footera bierzemy icony aby użyć ich w navbarze mobile
    return <NavbarClient menu={menu} icons={icons}/>;
}
