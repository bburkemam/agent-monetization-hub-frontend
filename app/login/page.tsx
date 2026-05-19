'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Card, CardBody, CardHeader } from '@/components';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to backend auth
    console.log('Auth attempt:', { email, isLogin });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex flex-col gap-0 min-h-screen bg-neutral-light">
      <section className="py-16 lg:py-20 flex items-center justify-center flex-grow">
        <div className="container-max w-full max-w-md">
          <Card>
            <CardHeader>
              <h2 className="text-center mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-center text-text-secondary text-sm">
                {isLogin
                  ? 'Sign in to your account to manage API keys'
                  : 'Sign up to get started with the API'}
              </p>
            </CardHeader>

            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-white border border-[#D1D5DB] rounded-[6px] text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0F172E] focus:ring-offset-2"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-white border border-[#D1D5DB] rounded-[6px] text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0F172E] focus:ring-offset-2"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Forgot Password (Login only) */}
                {isLogin && (
                  <div className="text-right">
                    <Link
                      href="#"
                      className="text-sm text-accent-cyan hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isLoading}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>

                {/* OAuth (Stub) */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-light"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-text-secondary">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  disabled
                >
                  🔗 GitHub (Coming Soon)
                </Button>
              </form>

              {/* Toggle Form Type */}
              <div className="mt-6 text-center text-sm text-text-secondary">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-accent-cyan font-medium hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </CardBody>
          </Card>

          {/* Features Highlight */}
          <div className="mt-12 space-y-4">
            <h3 className="text-center text-text-primary font-semibold">
              What you get:
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '🔑', title: 'API Keys', desc: 'Manage multiple keys' },
                { icon: '📊', title: 'Usage Analytics', desc: 'Real-time metrics' },
                { icon: '💳', title: 'Billing', desc: 'Manage your plan' },
                { icon: '🚀', title: 'Dashboard', desc: 'Control panel' },
              ].map((feature, i) => (
                <div key={i} className="bg-white p-4 rounded-card text-center">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <p className="font-medium text-sm text-text-primary">
                    {feature.title}
                  </p>
                  <p className="text-xs text-text-secondary">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
