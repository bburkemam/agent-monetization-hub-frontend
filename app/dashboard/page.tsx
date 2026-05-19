'use client';

import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader } from '@/components';

const stats = [
  { label: 'API Calls', value: '24,582', change: '+12%' },
  { label: 'Success Rate', value: '99.8%', change: '↑' },
  { label: 'Avg Response', value: '45ms', change: '↓ faster' },
  { label: 'Cost This Month', value: '$8.50', change: 'of $29' },
];

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText('key_live_abc123def456');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-0 bg-neutral-light min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-border-light py-8">
        <div className="container-max">
          <h1 className="mb-2">Dashboard</h1>
          <p className="text-text-secondary">
            Welcome back! Here's your API activity and account overview.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container-max">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardBody>
                  <p className="text-text-secondary text-sm mb-2">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-agent-blue text-2xl font-bold">
                      {stat.value}
                    </h3>
                    <span className="text-success-green text-sm">{stat.change}</span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: API Keys & Usage */}
            <div className="lg:col-span-2 space-y-6">
              {/* API Keys Section */}
              <Card>
                <CardHeader>
                  <h3 className="text-agent-blue mb-4">API Keys</h3>
                  <Button variant="secondary" size="sm">
                    Generate New Key
                  </Button>
                </CardHeader>

                <CardBody className="space-y-4">
                  {[
                    {
                      name: 'Production Key',
                      key: 'key_live_abc123def456',
                      created: 'May 1, 2026',
                      lastUsed: '2 hours ago',
                    },
                    {
                      name: 'Development Key',
                      key: 'key_test_xyz789uvw012',
                      created: 'May 10, 2026',
                      lastUsed: 'Never',
                    },
                  ].map((apiKey, i) => (
                    <div
                      key={i}
                      className="p-4 bg-neutral-light rounded-card border border-border-light"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-text-primary">
                            {apiKey.name}
                          </p>
                          <p className="text-text-secondary text-sm">
                            Created: {apiKey.created}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyKey}
                          >
                            {copied ? '✓ Copied' : 'Copy'}
                          </Button>
                          <Button variant="ghost" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                      <code className="text-xs bg-white p-3 rounded border border-border-light block font-mono text-text-secondary break-all">
                        {apiKey.key}
                      </code>
                      <p className="text-text-secondary text-xs mt-2">
                        Last used: {apiKey.lastUsed}
                      </p>
                    </div>
                  ))}
                </CardBody>
              </Card>

              {/* Usage Chart (Stub) */}
              <Card>
                <CardHeader>
                  <h3 className="text-agent-blue">API Usage</h3>
                </CardHeader>

                <CardBody>
                  <div className="h-40 flex items-center justify-center bg-neutral-light rounded-card border border-border-light">
                    <div className="text-center">
                      <p className="text-text-secondary text-sm mb-2">
                        Usage chart coming soon
                      </p>
                      <p className="text-text-secondary text-xs">
                        Real-time API call metrics
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Calls this month:</span>
                      <span className="font-semibold text-text-primary">
                        24,582 / 100,000
                      </span>
                    </div>
                    <div className="w-full bg-border-light rounded-full h-2">
                      <div
                        className="bg-accent-cyan h-2 rounded-full"
                        style={{ width: '24.582%' }}
                      ></div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Right Column: Plan & Billing */}
            <div className="space-y-6">
              {/* Current Plan */}
              <Card featured>
                <CardHeader>
                  <h4 className="text-agent-blue">Your Plan</h4>
                </CardHeader>

                <CardBody className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-agent-blue">Starter</p>
                    <p className="text-text-secondary">$29/month</p>
                  </div>

                  <ul className="space-y-2 text-sm">
                    {[
                      '100K calls/month',
                      'Email support',
                      'Rate limit: 50 req/s',
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-success-green">✓</span>
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="secondary" className="w-full">
                    Upgrade to Pro
                  </Button>
                </CardBody>
              </Card>

              {/* Billing */}
              <Card>
                <CardHeader>
                  <h4 className="text-agent-blue">Billing</h4>
                </CardHeader>

                <CardBody className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-text-secondary text-sm">Next Billing Date</p>
                      <p className="font-semibold text-text-primary">
                        June 1, 2026
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm">Payment Method</p>
                      <p className="font-semibold text-text-primary">
                        Visa ending in 4242
                      </p>
                    </div>
                  </div>

                  <Button variant="ghost" className="w-full text-sm">
                    Manage Payment Method
                  </Button>
                </CardBody>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <h4 className="text-agent-blue">Resources</h4>
                </CardHeader>

                <CardBody className="space-y-2">
                  {[
                    { text: 'API Documentation', href: '/api' },
                    { text: 'Status Page', href: '#' },
                    { text: 'Support', href: '#' },
                  ].map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      className="block text-accent-cyan hover:underline text-sm"
                    >
                      {link.text} →
                    </a>
                  ))}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
