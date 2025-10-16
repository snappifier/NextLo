
import { strapiFetch } from "@/app/lib/strapi";
import NavbarClient from "./NavbarClient";

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
    return <NavbarClient menu={menu} />;
}
