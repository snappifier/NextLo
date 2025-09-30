import "./globals.css";
import Navbar from "../components/navbar/Navbar.jsx";


export const metadata = {
  title: "1LO ZAMOŚĆ",
  description: "Strona szkolna 1 Liceum Ogólnokształcącego imienia Jana Zamoyskiego w Zamościu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Navbar/>
        {children}
      </body>
    </html>
  );
}
