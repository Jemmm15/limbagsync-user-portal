'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock } from 'lucide-react';

export default function StaffLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    // Simulate successful login
    router.push('/staff-dashboard');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* App Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome to LimbagSync
        </h1>

        {/* Subtext */}
        <p className="text-center text-gray-600 mb-8">
          Sign in to access your internal dashboard.
        </p>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-xl bg-blue-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-6 rounded-xl bg-blue-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* RBAC Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900">RBAC Note:</p>
            <p className="text-sm text-amber-800">Staff login restricted to 08:00 AM - 08:00 PM.</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm font-semibold mb-4 text-center">
            {error}
          </p>
        )}

        {/* Log In Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl transition-colors duration-200 mb-3"
        >
          Log In
        </button>

        {/* Back to User Portal Button */}
        <button
          onClick={handleBack}
          className="w-full bg-white border-2 border-indigo-700 text-indigo-700 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200"
        >
          Back to User Portal
        </button>
      </div>
    </div>
  );
}
