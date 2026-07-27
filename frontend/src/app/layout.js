import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VigilSure – Vendor Insurance Expiry Tracker',
  description: 'Never miss a vendor insurance expiry. Automatic alerts & compliance tracking.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
            currency: 'USD',
            intent: 'capture',
            components: 'buttons',
            enableFunding: 'card',
          }}>
            {children}
            <Toaster position="top-right" />
          </PayPalScriptProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
