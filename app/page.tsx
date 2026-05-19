'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, CardBody, CardHeader, Badge } from '@/components';

const featuredContent = [
  {
    id: 1,
    title: 'Usage-Based Pricing 101',
    category: 'Framework',
    difficulty: 'easy',
    description: 'Learn when and how to implement usage-based pricing for your AI agent.',
    readTime: 6,
    href: '/guides/usage-based-pricing',
  },
  {
    id: 2,
    title: 'Custom Agents',
    category: 'Revenue Stream',
    difficulty: 'medium',
    description: 'Build and sell specialized agents tailored to specific business needs.',
    readTime: 8,
    href: '/guides/custom-agents',
  },
  {
    id: 3,
    title: 'Lead Gen AI: $45K/Month',
    category: 'Case Study',
    difficulty: 'hard',
    description: 'See how one founder scaled from MVP to $45K monthly recurring revenue.',
    readTime: 10,
    href: '/case-studies/lead-gen-ai',
  },
  {
    id: 4,
    title: 'Freemium Basics',
    category: 'Framework',
    difficulty: 'medium',
    description: 'Convert free users to paying customers with smart freemium strategies.',
    readTime: 7,
    href: '/guides/freemium-basics',
  },
];

const valuePropSections = [
  {
    icon: '📊',
    title: 'Frameworks',
    description: '7 proven monetization models. From usage-based pricing to white-label licensing.',
    cta: 'Learn more →',
    href: '/guides',
  },
  {
    icon: '🛠️',
    title: 'Tools',
    description: 'Curated agent tools & templates. Everything you need to get from MVP to revenue.',
    cta: 'Discover →',
    href: '/tools',
  },
  {
    icon: '💰',
    title: 'Real Results',
    description: '4-6 case studies with real numbers. Learn from founders who monetized.',
    cta: 'Read →',
    href: '/case-studies',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-24 lg:py-32">
        <div className="container-max text-center">
          <h1 className="text-white mb-4">Agent Monetization Hub</h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover 10+ revenue streams. Learn from real case studies. Build, scale, monetize.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/guides">
              <Button size="lg">Browse Guides</Button>
            </Link>
            <Link href="/api">
              <Button variant="accent" size="lg">Explore API</Button>
            </Link>
          </div>
          <p className="text-accent-cyan italic text-sm">
            💡 Built BY agents, FOR agents
          </p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 lg:py-20 bg-neutral-light">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-8">
            {valuePropSections.map((section) => (
              <div key={section.title} className="text-center">
                <div className="text-5xl mb-4">{section.icon}</div>
                <h3 className="mb-2">{section.title}</h3>
                <p className="text-text-secondary mb-4">
                  {section.description}
                </p>
                <Link href={section.href} className="text-accent-cyan font-medium hover:underline">
                  {section.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content Grid */}
      <section className="py-16 lg:py-20">
        <div className="container-max">
          <div className="mb-12">
            <h2 className="mb-4">Start Here</h2>
            <p className="text-text-secondary text-lg">
              Popular guides, frameworks, and case studies to get you monetizing fast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredContent.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant={
                        item.category === 'Framework'
                          ? 'framework'
                          : item.category === 'Revenue Stream'
                            ? 'revenue'
                            : 'industry'
                      }
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <h4 className="text-agent-blue font-semibold">{item.title}</h4>
                </CardHeader>
                <CardBody className="mb-4">
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </CardBody>
                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                  <Badge
                    variant={
                      item.difficulty === 'easy' ? 'easy' : item.difficulty === 'medium' ? 'medium' : 'hard'
                    }
                  >
                    {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                  </Badge>
                  <span className="text-xs text-text-secondary">{item.readTime} min read</span>
                </div>
                <Link
                  href={item.href}
                  className="mt-4 inline-block text-accent-cyan font-medium hover:underline"
                >
                  Read → 
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API CTA Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Marketing */}
            <div>
              <h2 className="mb-4">For Agents & Developers</h2>
              <p className="text-text-secondary text-lg mb-6">
                Integrate our API directly. Get structured data on monetization frameworks,
                revenue streams, case studies, and more.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '7 core data types',
                  '8 query patterns',
                  'REST API (simple GET endpoints)',
                  'Flexible authentication tiers',
                  '$0.10 per 1,000 calls',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-success-green text-lg">✓</span>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/api">
                <Button variant="primary" size="lg">View API Docs</Button>
              </Link>
            </div>

            {/* Right: Code Example */}
            <div className="bg-neutral-dark text-text-inverse p-6 rounded-card overflow-auto">
              <pre className="font-mono text-sm">
                <code>{`// Get all Revenue Streams
curl -H "Authorization: Bearer YOUR_KEY" \\
  https://api.agentmonetization.io/v1/revenue-streams

// Response
{
  "streams": [
    {
      "id": "custom-agents",
      "name": "Custom Agents",
      "effort": "medium",
      "revenue_potential": "high",
      "description": "Build and sell..."
    }
  ]
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-20 bg-agent-blue text-white text-center">
        <div className="container-max">
          <h2 className="text-white mb-6">Ready to monetize?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our guides, tools, and case studies to find the perfect revenue model for your agent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides">
              <Button variant="secondary" size="lg">Browse Guides</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="accent" size="lg">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
