import "./globals.css";
import {Meow_Script, Poppins} from 'next/font/google'
import NavbarNew from "../components/navbar/NavbarNew.js";
import Footer from "../components/footer/Footer.jsx";
import Script from "next/script";

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
});

export const metadata = {
  title: "1LO ZAMOŚĆ",
  description: "Strona szkolna 1 Liceum Ogólnokształcącego imienia Jana Zamoyskiego w Zamościu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={meow_script.className + " bg-[#f0f0f0] antialiased " + poppins.className}>

      <body className="">
      <NavbarNew/>
        {children}
      <Footer />
      <Script src={"https://website-widgets.pages.dev/dist/sienna.min.js"} strategy="afterInteractive" defer></Script>
      </body>
    </html>
  );
}
