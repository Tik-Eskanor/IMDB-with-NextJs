import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
export const metadata: Metadata = {
  title: "IMDB",
  description: "Movie Nation of entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
        >
          <ThemeProvider>
            <Header />
            <Navbar />
            <SearchBox />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
