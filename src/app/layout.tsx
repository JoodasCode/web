import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SlopWatch - The AI That Catches AI Lying",
  description: "Nuclear-powered semantic analysis that detects when AI claims don't match reality. Stop the slop. Start the watch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oxanium.variable} ${sourceCodePro.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
