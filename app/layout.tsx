import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://zakariyajabbar.com"),
  title: "Zakariya Jabbar | Software Developer",
  description:
    "Zakariya Jabbar is a software developer focused on building websites, Discord systems, and custom software from idea to reality.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Zakariya Jabbar | Software Developer",
    description:
      "Zakariya Jabbar is a software developer focused on building websites, Discord systems, and custom software from idea to reality.",
    url: "https://zakariyajabbar.com",
    siteName: "Zakariya Jabbar",
    type: "website",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
