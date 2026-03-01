import type { Metadata } from "next";
import { Nunito, Poppins, Lato, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
});

export const metadata: Metadata = {
  title: "BabyCorp — India's First Baby Sports Development Program",
  description:
    "Turn your baby into a champion. Swimming from 6 months, Chess, Badminton & Table Tennis from age 3. BabyCorp builds India's future Olympic champions.",
  openGraph: {
    title: "BabyCorp — India's First Baby Sports Development Program",
    description:
      "Turn your baby into a champion. Swimming from 6 months, Chess, Badminton & Table Tennis from age 3.",
    type: "website",
    locale: "en_IN",
    siteName: "BabyCorp",
  },
  twitter: {
    card: "summary_large_image",
    title: "BabyCorp — India's First Baby Sports Development Program",
    description:
      "Turn your baby into a champion. Swimming from 6 months, Chess, Badminton & Table Tennis from age 3.",
  },
  keywords: [
    "baby sports",
    "infant swimming",
    "early childhood development",
    "baby gymnastics",
    "chess for kids",
    "India sports academy",
    "BabyCorp",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${nunito.variable} ${poppins.variable} ${lato.variable} ${bebas.variable} antialiased`}
      >
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
