import type { Metadata } from "next";

import "./style.css"
import "./globals.css";

export const metadata: Metadata = {
  title: "Eskanor",
  description: "Fullstack web developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
