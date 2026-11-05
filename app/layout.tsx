import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import { client } from "@/lib/sanity";
import { packagesMenuQuery } from "@/lib/queries";
import { PackagesMenuProvider, type PackagesMenu } from "@/components/Navbar/PackagesMenuContext";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: "Forte Clinical Laboratory",
  description: "DHA Approved Diagnostic Laboratory & Home Testing",
};

async function getPackagesMenu(): Promise<PackagesMenu> {
  try {
    return await client.fetch(packagesMenuQuery, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const packagesMenu = await getPackagesMenu();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <PackagesMenuProvider value={packagesMenu}>{children}</PackagesMenuProvider>
      </body>
    </html>
  );
}
