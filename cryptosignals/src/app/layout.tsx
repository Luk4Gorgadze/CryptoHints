import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import '../app/globals.css';
import { cn } from "@/lib/utils"
import Navbar from '@/components/Navbar';
import { ThemeProvider } from "@/components/Theme-provider"
import '@mantine/charts/styles.css';
import Footer from "@/components/Footer";
import { Toaster, toast } from 'sonner'


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dev-cryptohints.luking.pro'),
  title: "CryptoHints",
  description: "Daily crypto signals for beginner traders",
  openGraph: {
    images: '/CryptoHints-Dark.png',
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors position="bottom-right" />
          <Navbar />{children}
          <Footer />
        </ThemeProvider>
      </body>
    </html >
  );
}
