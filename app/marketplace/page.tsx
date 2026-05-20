'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, Badge, Button } from '@/components';

const tools = [
  {
    id: 1,
    name: 'Stripe Billing',
    category: 'payment',
    difficulty: 'easy',
    useCase: 'SaaS Billing',
    description: 'Complete billing platform for subscriptions, usage-based pricing, and invoicing.',
    pros: ['Flexible pricing models', 'Webhook support', 'Robust dashboard'],
    link: 'https://stripe.com',
    featured: true,
  },
  {
    id: 2,
    name: 'Make (Zapier alternative)',
    category: 'integration',
    difficulty: 'easy',
    useCase: 'Workflow Automation',
    description: 'Connect your agent to 1000+ apps without code. Automate lead handoff, notifications.',
    pros: ['Visual workflow builder', 'Multi-step automation', 'Error handling'],
    link: 'https://make.com',
    featured: true,
  },
  {
    id: 3,
    name: 'Segment',
    category: 'analytics',
    difficulty: 'medium',
    useCase: 'Customer Analytics',
    description: 'Track user behavior, events, and conversion funnels. Send data to 300+ tools.',
    pros: ['Real-time tracking', 'Privacy-first', 'No code dashboard'],
    link: 'https://segment.com',
    featured: false,
  },
  {
    id: 4,
    name: 'Airtable',
    category: 'database',
    difficulty: 'easy',
    useCase: 'Content Management',
    description: 'Flexible database for managing case studies, frameworks, pricing data.',
    pros: ['Easy setup', 'API-first', 'Collaboration features'],
    link: 'https://airtable.com',
    featured: false,
  },
  {
    id: 5,
    name: 'PostHog',
    category: 'analytics',
    difficulty: 'medium',
    useCase: 'Product Analytics',
    description: 'Self-hosted analytics. Track funnels, retention, and feature adoption.',
    pros: ['Self-hosted option', 'Powerful cohorts', 'Open source'],
    link: 'https://posthog.com',
    featured: false,
  },
  {
    id: 6,
    name: 'Loom',
    category: 'content',
    difficulty: 'easy',
    useCase: 'Tutorial & Demo Creation',
    description: 'Record and share video tutorials. Perfect for onboarding customers.',
    pros: ['Instant sharing', 'Built-in editing', 'No watermarks'],
    link: 'https://loom.com',
    featured: false,
  },
];

type CategoryFilter = 'all' | 'payment' | 'integration' | 'analytics' | 'database' | 'content';
type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';

export default function MarketplacePage() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const categoryMatch = category === 'all' || tool.category === category;
      const difficultyMatch = difficulty === 'all' || tool.difficulty === difficulty;
      const searchMatch = searchQuery === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.useCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && difficultyMatch && searchMatch;
    });
  }, [category, difficulty, searchQuery]);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'payment', label: 'Payment & Billing' },
    { value: 'integration', label: 'Integration & Automation' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'database', label: 'Database & CMS' },
    { value: 'content', label: 'Content Tools' },
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <section className="gradient-hero text-white py-16 lg:py-20">
        <div className="container-max">
          <h1 className="text-white mb-4">Tools & Integrations</h1>
          <p className="text-xl text-gray-300 mb-8">
            Curated tools to help you implement monetization strategies. Vetted by our community.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <svg
                className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tools (e.g., 'billing', 'analytics')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-10 border border-gray-300 border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h4 className="font-semibold text-agent-blue mb-3">Filter by Category</h4>
                  <div className="space-y-2">
                    {categoryOptions.map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={option.value}
                          checked={category === option.value}
                          onChange={(e) => setCategory(e.target.value as CategoryFilter)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-text-primary text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-agent-blue mb-3">Filter by Setup Time</h4>
                  <div className="space-y-2">
                    {['all', 'easy', 'medium', 'hard'].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="difficulty"
                          value={level}
                          checked={difficulty === level}
                          onChange={(e) => setDifficulty(e.target.value as DifficultyFilter)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-text-primary text-sm capitalize">
                          {level === 'all' ? 'All Levels' : level === 'easy' ? '<1 hour' : level === 'medium' ? '1–4 hours' : '>4 hours'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {(category !== 'all' || difficulty !== 'all' || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-center"
                    onClick={() => {
                      setCategory('all');
                      setDifficulty('all');
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            </aside>

            {/* Main Grid */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <p className="text-text-secondary">
                  Showing <strong className="text-agent-blue">{filteredTools.length}</strong> tool{filteredTools.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredTools.map((tool, idx) => (
                  <div key={tool.id} className="animate-fade-in" style={{
                    animationDelay: `${idx * 50}ms`
                  }}>
                    <Card className="overflow-hidden hover:shadow-card-hover transition-all hover:scale-105 transform flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-agent-blue mb-1">{tool.name}</h4>
                          <p className="text-sm text-text-secondary font-medium">{tool.useCase}</p>
                        </div>
                        {tool.featured && (
                          <Badge variant="revenue">Popular</Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardBody className="flex-1 mb-4">
                      <p className="text-sm text-text-secondary mb-4">{tool.description}</p>

                      {/* Pros */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-agent-blue mb-2">Key Features</p>
                        <ul className="space-y-1">
                          {tool.pros.map((pro, idx) => (
                            <li key={idx} className="text-xs text-text-secondary flex items-start gap-2">
                              <span className="text-accent-cyan mt-0.5">✓</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardBody>

                    {/* Footer */}
                    <div className="pt-4 border-t border-border-light flex items-center justify-between">
                      <Badge
                        variant={
                          tool.difficulty === 'easy' ? 'easy' : tool.difficulty === 'medium' ? 'medium' : 'hard'
                        }
                      >
                        {tool.difficulty === 'easy' ? 'Easy Setup' : tool.difficulty === 'medium' ? 'Moderate' : 'Complex'}
                      </Badge>
                      <a href={tool.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm">
                          Visit →
                        </Button>
                      </a>
                    </div>
                  </Card>
                  </div>
                ))}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-text-secondary mb-4 text-lg">No tools match your filters.</p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setCategory('all');
                      setDifficulty('all');
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-neutral-light">
        <div className="container-max text-center">
          <h2 className="mb-6">Ready to monetize your agent?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Pick a framework, choose your tools, and start building. We've documented the playbook.
          </p>
          <Link href="/guides">
            <Button variant="primary" size="lg">Explore Frameworks →</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
