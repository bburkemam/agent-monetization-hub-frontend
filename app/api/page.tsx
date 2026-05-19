'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components';

export default function APIPage() {
  const features = [
    { text: '7 core data types', icon: '📦' },
    { text: '8 query patterns', icon: '🔍' },
    { text: 'REST API', icon: '🌐' },
    { text: 'Simple GET endpoints', icon: '⚡' },
    { text: 'Flexible auth tiers', icon: '🔐' },
    { text: '$0.10 per 1K calls', icon: '💰' },
  ];

  const steps = [
    { number: '1', title: 'Get your API key', description: 'Sign up and grab your free tier key in seconds' },
    { number: '2', title: 'Make a request', description: 'Hit any of our 8 endpoints with your key' },
    { number: '3', title: 'Start building', description: 'Integrate structured data into your agent' },
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <section className="gradient-hero text-white py-16 lg:py-20">
        <div className="container-max text-center">
          <h1 className="text-white mb-4">Agent Monetization API</h1>
          <p className="text-xl text-gray-300 mb-8">
            Structured data on revenue frameworks, streams, case studies, and tools.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Marketing */}
            <div>
              <h2 className="mb-6">Perfect for:</h2>
              <ul className="space-y-4 mb-8">
                {[
                  'Agents building discovery features',
                  'SaaS builders adding monetization tips',
                  'Freelancers automating research',
                  'Anyone integrating agent monetization data',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent-cyan text-lg mt-1">✓</span>
                    <span className="text-text-primary">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-neutral-light p-6 rounded-card mb-8">
                <h4 className="font-semibold mb-2">Pricing</h4>
                <p className="text-text-secondary mb-4">
                  Simple REST API with usage-based billing.
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    'Free tier: 10K calls/month',
                    'Starter: $29/mo (100K calls)',
                    'Pro: $99/mo (1M calls)',
                    'Enterprise: Custom pricing',
                  ].map((item, i) => (
                    <li key={i} className="text-text-secondary">{item}</li>
                  ))}
                </ul>
              </div>

              <Link href="/pricing">
                <Button variant="primary" size="lg" className="w-full md:w-auto">
                  View Full Pricing
                </Button>
              </Link>
            </div>

            {/* Right: Code Block */}
            <div className="bg-neutral-dark text-text-inverse p-6 rounded-card overflow-auto">
              <h4 className="font-mono text-sm mb-4 text-accent-cyan">Quick Start</h4>
              <pre className="font-mono text-xs leading-relaxed">
                <code>{`# Get Revenue Streams
curl -H "Authorization: Bearer KEY" \\
  https://api.agentmonetization.io/v1/revenue-streams

# Response
{
  "streams": [
    {
      "id": "custom-agents",
      "name": "Custom Agents",
      "effort": "medium",
      "revenue_potential": "high",
      "description": "Build and sell..."
    }
  ],
  "meta": {
    "total": 10,
    "version": "1.0"
  }
}`}</code>
              </pre>
            </div>
          </div>

          {/* Features Grid */}
          <div className="bg-neutral-light p-8 rounded-card mb-16">
            <h3 className="mb-6">What You Get</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-text-primary">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="mb-16">
            <h3 className="mb-8">Getting Started</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-accent-cyan text-agent-blue rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.number}
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-text-secondary text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-agent-blue text-white p-8 rounded-card text-center">
            <h3 className="text-white mb-4">Ready to integrate?</h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Get started with our free tier. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Get API Key
              </Button>
              <Link href="#docs">
                <Button variant="secondary" size="lg">
                  View Full Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Preview */}
      <section className="py-16 lg:py-20 bg-neutral-light">
        <div className="container-max">
          <h2 className="mb-8">API Reference</h2>
          <div className="space-y-6">
            {[
              {
                endpoint: 'GET /v1/revenue-streams',
                description: 'Fetch all available revenue streams with details',
              },
              {
                endpoint: 'GET /v1/frameworks',
                description: 'Get monetization frameworks and models',
              },
              {
                endpoint: 'GET /v1/case-studies',
                description: 'Retrieve real case studies with metrics',
              },
              {
                endpoint: 'GET /v1/tools',
                description: 'Access curated tools and integrations',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-card border border-border-light">
                <code className="text-accent-cyan font-mono font-bold">{item.endpoint}</code>
                <p className="text-text-secondary mt-2">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="#docs">
              <Button variant="primary" size="lg">
                View Complete API Reference
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
