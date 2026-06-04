'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import { useAuth } from '@/lib/auth-context';

export const Navigation: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { label: 'Guides', href: '/guides' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Revenue Streams', href: '/revenue-streams' },
    { label: 'Tools', href: '/marketplace' },
    { label: 'API', href: '/api' },
    { label: 'Pricing', href: '/pricing' },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border-light shadow-sm">
      <div className="container-max flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg flex-shrink-0">
          <span className="text-accent-cyan">🤖</span>
          <span className="text-agent-blue hidden sm:inline">Agent Monetization Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-sm hover:text-accent-cyan transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA / Auth Section */}
        <div className="flex items-center gap-4">
          {isMounted && !isLoading && !isAuthenticated && (
            <>
              <Link href="/auth/login" className="hidden md:block">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup" className="hidden md:block">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {isMounted && !isLoading && isAuthenticated && (
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-btn hover:bg-neutral-light transition-colors"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-accent-cyan/10 flex items-center justify-center text-sm">
                  👤
                </div>
                <span className="text-sm text-text-primary hidden lg:inline">
                  {user?.first_name}
                </span>
                <svg
                  className={`w-4 h-4 text-text-secondary transition-transform ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border-light rounded-card shadow-lg py-2 z-10">
                  <div className="px-4 py-2 border-b border-border-light">
                    <p className="text-sm font-semibold text-text-primary">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-text-secondary">{user?.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-neutral-light transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-light transition-colors text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-agent-blue hover:bg-neutral-light rounded-btn transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-border-light md:hidden">
            <div className="container-max py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-primary hover:text-accent-cyan transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-border-light pt-4 space-y-2">
                {!isAuthenticated && (
                  <>
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button variant="secondary" size="sm" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                      <Button variant="primary" size="sm" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}

                {isAuthenticated && (
                  <>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="secondary" size="sm" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full text-red-600"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
