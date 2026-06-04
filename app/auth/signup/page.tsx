'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader } from '@/components';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';
import { useAuth } from '@/lib/auth-context';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const result = await signup(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      setApiKey(result.api_key);
      setShowApiKey(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      if (message.includes('already exists')) {
        setErrors({ email: 'This email is already registered' });
      } else {
        setErrors({ submit: message });
      }
    }
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (showApiKey) {
    return (
      <div className="flex flex-col gap-0 min-h-screen bg-neutral-light">
        <section className="py-16 lg:py-20 flex items-center justify-center flex-grow">
          <div className="container-max w-full max-w-md">
            <Card>
              <CardHeader>
                <div className="text-center mb-2">
                  <div className="text-4xl mb-2">🎉</div>
                  <h2>Welcome to Agent Monetization Hub!</h2>
                </div>
                <p className="text-center text-text-secondary text-sm">
                  Your account has been created. Here's your API key.
                </p>
              </CardHeader>

              <CardBody className="space-y-4">
                <div className="p-4 bg-accent-cyan/10 border border-accent-cyan rounded-card">
                  <p className="text-text-secondary text-xs mb-2">Your API Key (save this securely)</p>
                  <div className="flex gap-2">
                    <code className="flex-1 text-xs bg-white p-3 rounded border border-border-light font-mono text-text-secondary break-all">
                      {apiKey}
                    </code>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCopyApiKey}
                      className="flex-shrink-0"
                    >
                      {copied ? '✓' : 'Copy'}
                    </Button>
                  </div>
                  <p className="text-text-secondary text-xs mt-2">
                    💡 Tip: This key will be shown only once. Store it safely!
                  </p>
                </div>

                <div className="space-y-3 p-4 bg-neutral-light rounded-card border border-border-light">
                  <p className="font-semibold text-text-primary text-sm">Next Steps:</p>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li className="flex gap-2">
                      <span className="text-accent-cyan">1.</span>
                      <span>Save your API key somewhere secure</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-cyan">2.</span>
                      <span>Read the API documentation to get started</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-cyan">3.</span>
                      <span>Make your first API call</span>
                    </li>
                  </ul>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => router.push('/dashboard')}
                >
                  Go to Dashboard
                </Button>

                <Link href="/guides" className="block">
                  <Button variant="secondary" className="w-full">
                    Read the Guides
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 min-h-screen bg-neutral-light">
      <section className="py-16 lg:py-20 flex items-center justify-center flex-grow">
        <div className="container-max w-full max-w-md">
          <Card>
            <CardHeader>
              <h2 className="text-center mb-2">Create Your Account</h2>
              <p className="text-center text-text-secondary text-sm">
                Get started with the Agent Monetization Hub API
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

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 bg-white border rounded-[6px] text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      errors.firstName
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-[#D1D5DB] focus:ring-[#0F172E]'
                    }`}
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName) {
                        setErrors({ ...errors, firstName: '' });
                      }
                    }}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 bg-white border rounded-[6px] text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      errors.lastName
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-[#D1D5DB] focus:ring-[#0F172E]'
                    }`}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) {
                        setErrors({ ...errors, lastName: '' });
                      }
                    }}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
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
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Password *
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
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                  <PasswordStrengthIndicator password={formData.password} />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    className={`w-full px-4 py-2 bg-white border rounded-[6px] text-[#1F2937] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      errors.confirmPassword
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-[#D1D5DB] focus:ring-[#0F172E]'
                    }`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) {
                        setErrors({ ...errors, confirmPassword: '' });
                      }
                    }}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-2 p-3 bg-neutral-light rounded-card">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-xs text-text-secondary">
                    I agree to the{' '}
                    <a href="#" className="text-accent-cyan hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-accent-cyan hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Create Account
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

              {/* Toggle to Login */}
              <div className="mt-6 text-center text-sm text-text-secondary">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-accent-cyan font-medium hover:underline"
                >
                  Sign in
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
