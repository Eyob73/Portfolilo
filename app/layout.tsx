import type { Metadata, Viewport } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#111317",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Eyob Getachew — Full-Stack Developer & Software Engineer",
  description:
    "Early-career Full-Stack Developer & Software Engineer based in Addis Ababa, Ethiopia. Passionate about building practical software solutions, designing user-friendly interfaces, developing reliable backend APIs, and engineering robust database architectures.",
  authors: [{ name: "Eyob Getachew", url: "https://github.com/eyob73" }],
  creator: "Eyob Getachew",
  keywords: [
    "Eyob Getachew",
    "Full-Stack Developer",
    "Software Engineer",
    "Addis Ababa",
    "Ethiopia",
    ".NET",
    "ASP.NET Core",
    "C#",
    "React",
    "Angular",
    "TypeScript",
    "PostgreSQL",
    "SQL Server",
    "Laravel",
  ],
  openGraph: {
    title: "Eyob Getachew — Full-Stack Developer & Software Engineer",
    description:
      "Full-stack software engineering with clean architecture, resilient APIs, and responsive design.",
    url: "https://github.com/eyob73",
    siteName: "Eyob Getachew Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eyob Getachew — Full-Stack Developer & Software Engineer",
    description:
      "Full-stack software engineering with clean architecture, resilient APIs, and responsive design.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              var saved = localStorage.getItem('eyob_theme');
              if (saved === 'light') {
                document.documentElement.classList.remove('dark');
              } else {
                document.documentElement.classList.add('dark');
              }
            } catch (e) {}
          `}
        </Script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-surface-container-lowest overflow-x-hidden min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
