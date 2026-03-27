import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import FloatingContact from "@/components/FloatingContact/FloatingContact";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: "Forte Clinical Laboratory",
  description: "DHA Approved Diagnostic Laboratory & Home Testing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
