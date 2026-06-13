import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'BIYORA - Luxury African Textiles | Kano, Nigeria',
  description: 'Premium African fabrics and textiles from Kano. Shop authentic Ankara, Adire, Silk, Guinea Brocade and more.',
  keywords: ['African textiles', 'Kano fabrics', 'Ankara', 'Adire', 'Guinea Brocade', 'luxury fashion', 'Biyora'],
  authors: [{ name: 'Idris Ahmad' }],
  openGraph: {
    title: 'BIYORA - Luxury African Textiles | Kano',
    description: 'Premium textiles from Kano to the world',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630/d4af37/1a1a1a?text=BIYORA+-+Luxury+Textiles',
        width: 1200,
        height: 630,
        alt: 'BIYORA - Luxury African Textiles from Kano',
      }
    ],
    siteName: 'BIYORA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIYORA - Luxury African Textiles',
    description: 'Premium textiles from Kano to the world',
    images: ['https://via.placeholder.com/1200x630/d4af37/1a1a1a?text=BIYORA'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-gray-950 text-white antialiased font-sans">
        {children}

        {/* Paystack Payment Script */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
