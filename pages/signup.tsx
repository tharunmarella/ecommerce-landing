import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        router.push('/login');
      } else {
        setError('Signup failed. Try again.');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Head>
        <title>Sign Up | LuxeStore</title>
        <meta name="description" content="Create a new LuxeStore account." />
      </Head>

      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg shadow-md border">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
              Create an account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Sign Up
              </Button>
            </div>
          </form>

          <div className="text-center mt-4">
            <Link href="/login" passHref>
              <Button variant="outline" className="w-full">
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}