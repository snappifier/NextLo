import "./globals.css";
import {Meow_Script, Poppins} from 'next/font/google'
import NavbarNew from "../components/navbar/NavbarNew.js";
import Footer from "../components/footer/Footer.jsx";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900'],
    style: 'normal',
    display: 'swap',
});

const meow_script = Meow_Script({
    subsets: ['latin'],
    weight: ['400'],
    style: 'normal',
    display: 'swap',
})

export const metadata = {
  title: "1LO ZAMOŚĆ",
  description: "Strona szkolna 1 Liceum Ogólnokształcącego imienia Jana Zamoyskiego w Zamościu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={poppins.className + " " + meow_script.className}>
      <body>
      <NavbarNew/>
        {children}
      <Footer />
      </body>
    </html>
  );
}
