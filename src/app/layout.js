import "./globals.css";


export const metadata = {
  title: "1LO ZAMOŚĆ",
  description: "Strona szkolna 1 Liceum Ogólnokształcącego imienia Jana Zamoyskiego w Zamościu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
