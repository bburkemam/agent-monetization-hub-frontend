'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader } from '@/components';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);

      if (formData.rememberMe) {
        localStorage.setItem('remember_email', formData.email);
      } else {
        localStorage.removeItem('remember_email');
      }

      router.push('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      if (message.includes('Invalid credentials') || message.includes('not found')) {
        setErrors({ submit: 'Invalid email or password' });
      } else {
        setErrors({ submit: message });
      }
    }
  };

  return (
    <div className="flex flex-col gap-0 min-h-screen bg-neutral-light">
      <section className="py-16 lg:py-20 flex items-center justify-center flex-grow">
        <div className="container-max w-full max-w-md">
          <Card>
            <CardHeader>
              <h2 className="text-center mb-2">Welcome Back</h2>
              <p className="text-center text-text-secondary text-sm">
                Sign in to your account to manage API keys and access your dashboard
              </p>
            </CardHeader>

            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Alert */}
                {errors.submit && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-card text-red-600 text-sm">
                    {errors.submit}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`w-full px-4 py-2 bg-white border rounded-[6px] text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      errors.email
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-[#D1D5DB] focus:ring-[#0F172E]'
                    }`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        setErrors({ ...errors, email: '' });
                      }
                    }}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`w-full px-4 py-2 bg-white border rounded-[6px] text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      errors.password
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-[#D1D5DB] focus:ring-[#0F172E]'
                    }`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) {
                        setErrors({ ...errors, password: '' });
                      }
                    }}
                    autoComplete="current-password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) =>
                        setFormData({ ...formData, rememberMe: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-border-light cursor-pointer"
                    />
                    <span className="text-sm text-text-secondary">Remember me</span>
                  </label>
                  <Link
                    href="#"
                    className="text-sm text-accent-cyan hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Sign In
                </Button>

                {/* Divider */}
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

              {/* Toggle to Signup */}
              <div className="mt-6 text-center text-sm text-text-secondary">
                Don't have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-accent-cyan font-medium hover:underline"
                >
                  Sign up
                </Link>
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
