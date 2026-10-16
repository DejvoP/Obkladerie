import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit, Playfair_Display } from "next/font/google";
import {
  ROOT_DESCRIPTION,
  ROOT_TITLE,
  SITE_NAME,
  absoluteUrl,
  getSiteUrl,
} from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1f1f1f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: ROOT_TITLE,
  description: ROOT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "RemodelTO s.r.o." }],
  creator: SITE_NAME,
  publisher: "RemodelTO s.r.o.",
  category: "home improvement",
  keywords: [
    "Obkladerie",
    "obklady",
    "dlažby",
    "italská keramika",
    "outletové ceny",
    "betonové stěrky",
    "epoxidové stěrky",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "cs-CZ": absoluteUrl("/"),
    },
  },
  openGraph: {
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: absoluteUrl("/hero.png"),
        width: 1920,
        height: 1080,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    images: [absoluteUrl("/hero.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const ignoreExtensionHydrationNoise = `
(function () {
  var originalError = console.error;
  console.error = function () {
    var text = "";
    for (var i = 0; i < arguments.length; i++) {
      text += String(arguments[i]) + " ";
    }
    if (
      (text.indexOf("Hydration") !== -1 || text.indexOf("hydrated") !== -1) &&
      (text.indexOf("bis_skin") !== -1 ||
        text.indexOf("bis_register") !== -1 ||
        text.indexOf("__processed_") !== -1)
    ) {
      return;
    }
    return originalError.apply(console, arguments);
  };
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="cs"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-white font-sans text-charcoal"
        suppressHydrationWarning
      >
        <Script
          id="ignore-extension-hydration-noise"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: ignoreExtensionHydrationNoise }}
        />
        {children}
      </body>
    </html>
  );
}
