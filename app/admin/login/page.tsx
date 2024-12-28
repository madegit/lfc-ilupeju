'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button"

export default function Login() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSigningIn(true);

    try {
      // Get form data securely using FormData
      const formData = new FormData(e.currentTarget);
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;

      // Validate inputs
      if (!username || !password) {
        throw new Error('Please fill in all fields');
      }

      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Generic error message to avoid revealing specific authentication details
        setError('Invalid credentials. Please try again.');
      } else if (result?.ok) {
        // Successful login
        router.push('/admin/add-event');
        router.refresh(); // Refresh to update session
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center py-24 bg-[url('/events.jpg')] flex items-center justify-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl text-white mb-8 tracking-tighter text-center">
          Admin Login
        </h2>
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 tracking-tight">
                Username
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-xl text-gray-900"
                  autoComplete="username"
                  spellCheck="false"
                  autoCapitalize="none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 tracking-tight">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-xl text-gray-900"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full rounded-xl bg-red-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
              disabled={isSigningIn}
            >
              {isSigningIn ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}