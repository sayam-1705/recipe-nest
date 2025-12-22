import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import FuturisticNavbar from "@/components/navbar/FuturisticNavbar";
import QueryProvider from "@/providers/QueryProvider";
import GlobalErrorBoundary from "@/components/common/GlobalErrorBoundary";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "RecipeNest - Discover Amazing Recipes",
    template: "%s | RecipeNest",
  },
  description:
    "Discover and share amazing recipes with RecipeNest. Find recipes based on weather, dietary preferences, and more. Join our community of food enthusiasts.",
  keywords: [
    "recipes",
    "cooking",
    "food",
    "culinary",
    "ingredients",
    "meal planning",
  ],
  authors: [{ name: "RecipeNest Team" }],
  creator: "RecipeNest",
  publisher: "RecipeNest",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "RecipeNest - Discover Amazing Recipes",
    description:
      "Discover and share amazing recipes with RecipeNest. Find recipes based on weather, dietary preferences, and more.",
    siteName: "RecipeNest",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RecipeNest - Discover Amazing Recipes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecipeNest - Discover Amazing Recipes",
    description:
      "Discover and share amazing recipes with RecipeNest. Find recipes based on weather, dietary preferences, and more.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body
        className={`${poppins.variable} antialiased font-poppins overflow-x-hidden`}
      >
        <GlobalErrorBoundary>
          <QueryProvider>
            <FuturisticNavbar />
            <main className="min-h-screen w-full z-10 pt-20">{children}</main>
          </QueryProvider>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
