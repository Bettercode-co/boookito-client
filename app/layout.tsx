import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import { Suspense } from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Header } from "@/components/header";
import { Aside } from "@/components/aside";
import { Main } from "@/components/main";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head />
      <body className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}>
        <Providers>
          <div className="relative flex flex-col h-screen">
            <Suspense fallback={<div className="h-14 bg-white shadow-sm"></div>}>
              <Header />
            </Suspense>
            <div className="flex flex-1">
              <Suspense fallback={<div className="hidden md:flex fixed top-20 right-6 w-64 bg-white p-6 shadow-md rounded-lg flex-col h-[calc(100vh-3.5rem-3rem)] md:h-[calc(100vh-3.5rem-4rem)] z-10 overflow-y-auto">
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-900 border-t-transparent"></div>
                </div>
              </div>}>
                <Aside />
              </Suspense>
              <Suspense fallback={<main className="flex-1 lg:h-screen p-4 md:p-8 pt-20 md:pt-24 md:mr-[calc(16rem+2rem)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent"></div>
              </main>}>
                <Main />
              </Suspense>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
