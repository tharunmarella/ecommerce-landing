import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">LuxeStore</h3>
            <p className="text-sm leading-relaxed">
              We are dedicated to providing the finest quality products for your lifestyle. 
              Our mission is to combine elegance with sustainability.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white transition-colors"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-white focus:border-white"
              />
              <Button type="submit" variant="secondary" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} LuxeStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
