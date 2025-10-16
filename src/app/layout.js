import "./globals.css";
import {Meow_Script, Poppins} from 'next/font/google'
import NavbarNew from "../components/navbar/NavbarNew.js";
import Script from "next/script";
import FooterServer from "@/components/footer/FooterServer";

const meow_script = Meow_Script({
    subsets: ['latin'],
    weight: ['400'],
    style: 'normal',
    display: 'swap',
})

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900'],
    style: 'normal',
    display: 'swap',
    preload: true,
});

export const metadata = {
    title: "1LO ZAMOŚĆ",
    description: "Strona szkolna 1 Liceum Ogólnokształcącego imienia Jana Zamoyskiego w Zamościu",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl" className={meow_script.className + " bg-[#f0f0f0] antialiased " + poppins.className}>
        <head>
            {/* ✅ DODAJ preconnect dla Railway */}
            <link rel="preconnect" href="https://strapi-production-cbefe.up.railway.app" />
            <link rel="dns-prefetch" href="https://strapi-production-cbefe.up.railway.app" />

            {/* ✅ Preload kluczowych zasobów */}
            <link rel="preload" href="/images/logo.webp" as="image" />
            <link rel="preload" href="/images/godlo.webp" as="image" />
        </head>
        <body className="">
        <NavbarNew/>
        {children}
        <FooterServer />
        <Script
            src={"https://website-widgets.pages.dev/dist/sienna.min.js"}
            strategy="lazyOnload"  // ✅ ZMIEŃ z "afterInteractive" na "lazyOnload"
            defer
        />
        </body>
        </html>
    );
}