// Resources
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

// Definitions
import type { Metadata, Viewport } from "next";
import type { Children } from "@/lib/definitions";

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
    default: "Inticate Softworks",
    template: "%s | Inticate",
  },
  description:
    "The official status of all of Inticate's services. Keep up-to-date with outages and other important events.",
  openGraph: {
    title: "Inticate Softworks",
    siteName: "Inticate Softworks",
    images: [
      {
        url: "https://inticate.com/assets/images/brand.jpg",
        alt: "Inticate Softworks",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// Viewport
export const viewport: Viewport = {
  themeColor: "#121212",
};

/**
 * The root layout affecting pages across the entire application.
 */
export default function RootLayout(props: Readonly<Children<true>>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {props.children}
      </body>
    </html>
  );
}
