import { strapiFetch } from "@/app/lib/strapi";
import Footer from "@/app/components/footer/Footer";

async function getFooter() {
    const json = await strapiFetch("/api/stopka?populate=*");
    return json?.data ?? {};
}

export default async function FooterServer() {
    const footer = await getFooter();
    return <Footer footer={footer} />;
}
