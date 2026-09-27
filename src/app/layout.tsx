import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://satyamgawali.vercel.app"),
  title: {
    template: "%s | Satyam Gawali",
    default: "Satyam Gawali — Flutter Developer & Mobile Engineer",
  },
  description:
    "Portfolio of Satyam Gawali, a Mobile App Developer specializing in Flutter, Dart, Riverpod, Firebase, on-device AI, and open-source developer tooling.",
  keywords: [
    "Satyam Gawali",
    "Satyam Gawali portfolio",
    "Flutter Developer",
    "Mobile App Developer",
    "Mobile Engineer",
    "Dart Developer",
    "Riverpod",
    "Firebase Realtime Database",
    "Cloud Firestore",
    "Android Developer",
    "Promptixa",
    "CLVCA",
    "Chroma Kit",
    "Chroma Theme",
    "Open Source Flutter Packages",
    "Flutter Mobile Engineer"
  ],
  authors: [{ name: "Satyam Gawali", url: "https://satyamgawali.vercel.app" }],
  creator: "Satyam Gawali",
  publisher: "Satyam Gawali",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://satyamgawali.vercel.app",
    title: "Satyam Gawali — Flutter Developer & Mobile Engineer",
    description:
      "Portfolio of Satyam Gawali, a Mobile App Developer specializing in Flutter, Dart, Riverpod, Firebase, on-device AI, and open-source developer tooling.",
    siteName: "Satyam Gawali Portfolio",
    images: [
      {
        url: "/images/profile/profile.jpg",
        width: 800,
        height: 800,
        alt: "Satyam Gawali — Flutter Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satyam Gawali — Flutter Developer & Mobile Engineer",
    description:
      "Portfolio of Satyam Gawali, a Mobile App Developer specializing in Flutter, Dart, Riverpod, Firebase, on-device AI, and open-source developer tooling.",
    images: ["/images/profile/profile.jpg"],
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
    google: "3a12aca5736c259b",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://satyamgawali.vercel.app/#person",
      "name": "Satyam Gawali",
      "givenName": "Satyam",
      "familyName": "Gawali",
      "url": "https://satyamgawali.vercel.app",
      "image": "https://satyamgawali.vercel.app/images/profile/profile.jpg",
      "jobTitle": "Mobile Application Developer & Flutter Engineer",
      "description":
        "Mobile App Developer specializing in Flutter, Dart, Riverpod, Firebase, on-device AI, and open-source developer tooling.",
      "sameAs": [
        "https://github.com/Satyam-Gawali",
        "https://www.linkedin.com/in/satyam-gawali-b4623b268",
        "https://pub.dev/packages/chroma_kit",
        "https://pub.dev/packages/chroma_theme",
        "https://play.google.com/store/apps/details?id=com.satyamstudios.clvca",
        "https://play.google.com/store/apps/details?id=com.promptixa.app"
      ],
      "knowsAbout": [
        "Flutter",
        "Dart",
        "Android App Development",
        "Riverpod",
        "Firebase Realtime Database",
        "Cloud Firestore",
        "Google ML Kit",
        "Mobile App Architecture",
        "Cross-Platform Development",
        "Open Source Tooling"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://satyamgawali.vercel.app/#website",
      "url": "https://satyamgawali.vercel.app",
      "name": "Satyam Gawali — Flutter Developer Portfolio",
      "description":
        "Portfolio and selected works of Satyam Gawali, a Flutter and Mobile Application Engineer.",
      "publisher": {
        "@id": "https://satyamgawali.vercel.app/#person"
      },
      "inLanguage": "en-US"
    }
  ]
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (!isDark && stored === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-brand-bg text-brand-text-primary flex flex-col font-sans selection:bg-brand-violet/25 selection:text-brand-violet-light antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
