import { Inter } from "next/font/google";
import "./globals.css";
import "./style.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather Now",
  description: "weather app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
