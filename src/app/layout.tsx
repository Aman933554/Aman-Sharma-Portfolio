import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aman Sharma | AI Engineer",
  description: "Futuristic AI Operating System Portfolio of Aman Sharma, an aspiring AI Engineer.",
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark`}
    >
      <body className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
