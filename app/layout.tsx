import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const josefinSans = Josefin_Sans({ 
  subsets: ["latin"],
  variable: '--font-josefin',
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A modern todo application with drag and drop functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body className={cn("min-h-screen bg-background font-josefin antialiased", josefinSans.variable)}>
        {children}
      </body>
    </html>
  );
}
