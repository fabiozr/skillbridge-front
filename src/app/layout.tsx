import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import Image from "next/image";
import styles from "./page.module.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SkillBridge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="Skillbridge logo"
            width={92}
            height={92}
            priority
          />
          <Image
            className={styles.hamburger}
            src="/menu.svg"
            alt="Menu"
            width={92}
            height={92}
            priority
          />
        </header>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
