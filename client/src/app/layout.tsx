// Resources
import "./globals.css";
import {Geist, Geist_Mono} from "next/font/google";

// Definitions
import type {Metadata} from "next";
import type {Children} from "@/lib/definitions"

// Components
import Providers from "./providers";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Inticate",
    default: "Inticate Softworks",
  },
};

/**
 * The root layout affecting pages across the entire application.
 */
export default function RootLayout(props: Readonly<Children<true>>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <Providers>
      {props.children}
    </Providers>
    </body>
    </html>
  );
}
