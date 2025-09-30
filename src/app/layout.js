import "./globals.css";
import NavbarNew from "../components/navbar/NavbarNew.js";
import Footer from "../components/footer/Footer.jsx";


export const metadata = {
  title: "1LO ZAMOŚĆ",
  description: "Strona szkolna 1 Liceum Ogólnokształcącego imienia Jana Zamoyskiego w Zamościu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <NavbarNew/>
        {children}
      <Footer />
      </body>
    </html>
  );
}
