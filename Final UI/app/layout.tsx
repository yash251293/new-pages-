// No "use client"
import type { Metadata } from "next";
import { Inter, Lora, Abhaya_Libre } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import AppShell from "@/components/AppShell"; // New import

const inter = Inter({ subsets: ["latin"] });
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"]
});
const abhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  variable: "--font-abhaya-libre",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = { // Uncommented or add generateViewport if needed
  title: "100 Networks",
  description: "Follow employers and find your dream job",
  // generator: 'v0.dev' // original 'generateViewport' error was from v0.dev, this line might be related or not needed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} ${lora.variable} ${abhayaLibre.variable}`}>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
