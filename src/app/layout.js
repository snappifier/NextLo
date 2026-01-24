import "./globals.css";
import {Meow_Script, Poppins} from 'next/font/google'
import Script from "next/script";
import FooterServer from "@/app/components/footer/FooterServer";
import Navbar from "@/app/components/navbar/desktop/Navbar";
import Bip from "@/app/components/bip/bip";
import CookieConsent from "@/app/components/consent/CookieConsent";

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
        icon: '/images/logolo.webp',
        shortcut: '/images/logolo.webp',
        apple: '/images/logolo.webp',
    },
    description: "Strona szkolna I Liceum Ogólnokształcącego imienia Jana Zamoyskiego w Zamościu",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
        <body className={meow_script.className + " bg-[#f0f0f0] antialiased " + poppins.className}>
            <Navbar/>
            {children}
            <FooterServer />
            <Script src={"https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"} strategy="lazyOnload" defer></Script>
            <Bip />
            <CookieConsent />

        </body>
        </html>
    );
}