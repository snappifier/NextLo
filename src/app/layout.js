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
    title: {
        template: '%s - I Liceum Ogólnokształcące w Zamościu',
        default: 'I Liceum Ogólnokształcące w Zamościu'
    },
    icons: {
        icon: '/logo.ico',
        shortcut: '/logo.ico',
        apple: '/logo.ico',
    },
    description: "Strona szkolna I Liceum Ogólnokształcącego imienia Jana Zamoyskiego w Zamościu",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl" className={meow_script.className + " bg-[#f0f0f0] antialiased " + poppins.className}>
        <head>

            <link rel="preconnect" href="https://panel.1lo.com.pl" />
            <link rel="dns-prefetch" href="https://panel.1lo.com.pl" />

            <link rel="preload" href="/images/logo.webp" as="image" />
            <link rel="preload" href="/images/godlo.webp" as="image" />
        </head>
        <body className="">
        <NavbarNew/>
        {children}
        <FooterServer />
        <Script src={"https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"} strategy="lazyOnload" defer></Script>
        </body>
        </html>
    );
}