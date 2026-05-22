import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const siteUrl = "https://zakariyajabbar.com";
const siteTitle = "Zakariya Jabbar";
const siteDescription =
  "Software developer focused on building web applications and systems, combining clean design, reliable functionality, and AI-powered workflows to improve speed and quality.";
const previewImage = "/about-photo.png";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Zakariya Jabbar",
    type: "website",
    images: [
      {
        url: previewImage,
        alt: "Zakariya Jabbar portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfcfc",
};

const loaderBootScript = `
(() => {
  const storageKey = 'loaderShown';

  try {
    if (!window.sessionStorage.getItem(storageKey)) {
      document.documentElement.classList.add('loader-first-visit');
    }
  } catch (error) {
    document.documentElement.classList.add('loader-first-visit');
  }
})();
`;

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zakariya R. Jabbar",
  alternateName: "Zakariya Jabbar",
  url: siteUrl,
  jobTitle: "Software Developer",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IQ",
  },
  sameAs: [
    "https://github.com/zakariyarjabbar",
    "https://www.linkedin.com/in/zakariya-jabbar-6b7880407",
    "https://www.instagram.com/zakariyarjabbar",
    "https://x.com/zakariyarjabbar",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
