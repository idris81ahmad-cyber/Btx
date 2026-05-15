import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biyora Textile | Luxury Fabrics",
  description: "Premium African Textiles & Luxury Fashion",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
