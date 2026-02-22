// @ts-nocheck
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import SupportBot from '../components/SupportBot';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
        <SupportBot />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp
