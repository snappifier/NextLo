
import { strapiFetch } from "@/app/lib/strapi";
import NavbarClient from "./NavbarClient";

async function getMenu() {
    const json = await strapiFetch("/api/menu?populate[Kategoria][populate]=*");

    return json?.data ?? {};
}

export default async function Navbar() {
    const menu = await getMenu();
    return <NavbarClient menu={menu} />;
}
