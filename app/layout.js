import "./globals.css";
import Navbar from "./components/layouts/navbar/navbar";
import Footer from "./components/layouts/footer/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-50">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
