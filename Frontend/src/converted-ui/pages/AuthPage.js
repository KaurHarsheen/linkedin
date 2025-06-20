'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black dark:bg-black light:bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white dark:text-white light:text-[#202A44]">
            {isSignIn ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300 dark:text-gray-300 light:text-[#202A44]">
            {isSignIn ? (
              <>
                Or{' '}
                <button
                  onClick={() => setIsSignIn(false)}
                  className="font-medium text-white dark:text-white light:text-[#202A44] hover:text-blue-600"
                >
                  create a new account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignIn(true)}
                  className="font-medium text-white dark:text-white light:text-[#202A44] hover:text-blue-600"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
        <form className="rounded-md shadow-sm space-y-4">
          {!isSignIn && (
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-white/20 placeholder-gray-500 text-white dark:text-white light:text-[#202A44] bg-black dark:bg-black light:bg-white focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-white/20 placeholder-gray-500 text-white dark:text-white light:text-[#202A44] bg-black dark:bg-black light:bg-white focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-white/20 placeholder-gray-500 text-white dark:text-white light:text-[#202A44] bg-black dark:bg-black light:bg-white focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          {isSignIn && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-white/20 rounded bg-black dark:bg-black light:bg-white"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white dark:text-white light:text-[#202A44]">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-white dark:text-white light:text-[#202A44] hover:text-blue-600">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              {isSignIn ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black dark:bg-black light:bg-white text-white dark:text-white light:text-[#202A44]">Or continue with</span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="w-full inline-flex justify-center py-2 px-4 border border-blue-600 rounded-lg shadow-sm bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
            <span className="sr-only">Sign in with Google</span>
            Google
          </button>
          <button className="w-full inline-flex justify-center py-2 px-4 border border-blue-600 rounded-lg shadow-sm bg-black dark:bg-black light:bg-white text-sm font-medium text-white dark:text-white light:text-[#202A44] hover:bg-blue-600 hover:text-white">
            <span className="sr-only">Sign in with GitHub</span>
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
} 