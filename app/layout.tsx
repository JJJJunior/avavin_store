import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proshoes - Store Auth",
  description: "Proshoes ecommerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen flex flex-col">
          <ClerkProvider>
            <ToasterProvider />
            <Navbar />
            <div className="flex-1">{children}</div>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
}
