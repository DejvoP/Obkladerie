import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Obkladérie - povrchy, které tvoří prostor",
  description:
    "Nadčasové obklady, dlažby a doplňky pro moderní interiéry i exteriéry.",
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
