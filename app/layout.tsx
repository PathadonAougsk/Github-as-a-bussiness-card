import type { Metadata } from "next";
import { Sono } from "next/font/google";

import "./globals.css";
const sono = Sono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Github as business card",
  description: "Check the name.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sono.className}>{children}</body>
    </html>
  );
}
