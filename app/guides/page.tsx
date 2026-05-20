'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, Badge, Button } from '@/components';

const frameworks = [
  {
    id: 1,
    title: 'Usage-Based Pricing',
    slug: 'usage-based-pricing',
    effort: 'medium',
    revenue: 'medium',
    description: 'Pay-per-call billing model. Best for: API-first agents.',
    readTime: 8,
    tags: ['api', 'saas', 'scaling'],
  },
  {
    id: 2,
    title: 'Subscription Model',
    slug: 'subscription-model',
    effort: 'easy',
    revenue: 'medium',
    description: 'Monthly/annual recurring revenue. Best for: SaaS agents.',
    readTime: 7,
    tags: ['saas', 'recurring', 'predictable'],
  },
  {
    id: 3,
    title: 'Outcome-Based Pricing',
    slug: 'outcome-based',
    effort: 'hard',
    revenue: 'high',
    description: 'Commission on results. Best for: Lead gen & sales agents.',
    readTime: 10,
    tags: ['performance', 'leads', 'sales'],
  },
  {
    id: 4,
    title: 'Hybrid Model',
    slug: 'hybrid-model',
    effort: 'hard',
    revenue: 'high',
    description: 'Combine multiple pricing strategies.',
    readTime: 9,
    tags: ['advanced', 'flexible', 'optimization'],
  },
  {
    id: 5,
    title: 'Freemium',
    slug: 'freemium',
    effort: 'easy',
    revenue: 'low',
    description: 'Free tier + premium features. Best for: Scaling quickly.',
    readTime: 6,
    tags: ['growth', 'conversion', 'viral'],
  },
  {
    id: 6,
    title: 'White-Label',
    slug: 'white-label',
    effort: 'hard',
    revenue: 'high',
    description: 'Sell as another company\'s product.',
    readTime: 8,
    tags: ['b2b', 'partnerships', 'enterprise'],
  },
  {
    id: 7,
    title: 'Licensing & Partnerships',
    slug: 'licensing-partnerships',
    effort: 'hard',
    revenue: 'high',
    description: 'License your agent technology to other platforms.',
    readTime: 9,
    tags: ['b2b', 'licensing', 'enterprise'],
  },
];

type EffortFilter = 'all' | 'easy' | 'medium' | 'hard';
type RevenueFilter = 'all' | 'low' | 'medium' | 'high';

export default function GuidesPage() {
  const [effort, setEffort] = useState<EffortFilter>('all');
  const [revenue, setRevenue] = useState<RevenueFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFrameworks = useMemo(() => {
    return frameworks.filter((f) => {
      const effortMatch = effort === 'all' || f.effort === effort;
      const revenueMatch = revenue === 'all' || f.revenue === revenue;
      const searchMatch = searchQuery === '' || 
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
      return effortMatch && revenueMatch && searchMatch;
    });
  }, [effort, revenue, searchQuery]);

  return (
    <div className="flex flex-col gap-0">
      {/* Skip to main content */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-0 left-0 bg-agent-blue text-white px-4 py-2 z-50 focus:outline-none focus:ring-2 focus:ring-accent-cyan">
        Skip to main content
      </a>

      {/* Hero */}
      <section className="gradient-hero text-white py-16 lg:py-20" aria-labelledby="guides-heading">
        <div className="container-max">
          <h1 className="text-white mb-4" id="guides-heading">Monetization Frameworks</h1>
          <p className="text-xl text-gray-300 mb-8">
            7 proven models to turn your agent into revenue. Find the right one for your use case.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
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
                placeholder="Search frameworks (e.g., 'API', 'SaaS', 'leads')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search frameworks"
                aria-describedby="search-hint"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-10 border border-gray-300 border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
              <span id="search-hint" className="sr-only">Type to filter frameworks by title, description, or tags</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16" id="main-content">
        <div className="container-max">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h4 className="font-semibold text-agent-blue mb-3">Filter by Effort</h4>
                  <div className="space-y-2">
                    {['all', 'easy', 'medium', 'hard'].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="effort"
                          value={level}
                          checked={effort === level}
                          onChange={(e) => setEffort(e.target.value as EffortFilter)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-text-primary text-sm capitalize">
                          {level === 'all' ? 'All Levels' : level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-agent-blue mb-3">Filter by Revenue</h4>
                  <div className="space-y-2">
                    {['all', 'low', 'medium', 'high'].map((tier) => (
                      <label key={tier} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="revenue"
                          value={tier}
                          checked={revenue === tier}
                          onChange={(e) => setRevenue(e.target.value as RevenueFilter)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-text-primary text-sm capitalize">
                          {tier === 'all' ? 'All Tiers' : tier}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {(effort !== 'all' || revenue !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-center"
                    onClick={() => {
                      setEffort('all');
                      setRevenue('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            </aside>

            {/* Main Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-text-secondary">
                    Showing <strong className="text-agent-blue">{filteredFrameworks.length}</strong> of <strong className="text-agent-blue">{frameworks.length}</strong> frameworks
                  </p>
                  {searchQuery && (
                    <p className="text-sm text-text-secondary mt-1">
                      Search: <span className="text-agent-blue italic">'{searchQuery}'</span>
                    </p>
                  )}
                </div>
                {(effort !== 'all' || revenue !== 'all' || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEffort('all');
                      setRevenue('all');
                      setSearchQuery('');
                    }}
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFrameworks.map((framework, idx) => (
                  <div key={framework.id} className="animate-fade-in" style={{
                    animationDelay: `${idx * 50}ms`
                  }}>
                    <Card className="hover:shadow-card-hover transition-all hover:scale-105 transform">
                      <CardHeader>
                        <h4 className="text-agent-blue font-semibold mb-3">
                          {framework.title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant={
                              framework.effort === 'easy'
                                ? 'easy'
                                : framework.effort === 'medium'
                                  ? 'medium'
                                  : 'hard'
                            }
                          >
                            {framework.effort.charAt(0).toUpperCase() + framework.effort.slice(1)}
                          </Badge>
                          <Badge variant="revenue">
                            {framework.revenue === 'low'
                              ? '$'
                              : framework.revenue === 'medium'
                                ? '$$'
                                : '$$$'}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardBody className="mb-4">
                        <p className="text-sm text-text-secondary">
                          {framework.description}
                        </p>
                      </CardBody>

                      <div className="pt-4 border-t border-border-light flex items-center justify-between">
                        <span className="text-xs text-text-secondary">
                          {framework.readTime} min read
                        </span>
                        <Link href={`/guides/${framework.slug}`}>
                          <Button variant="ghost" size="sm">
                            Read →
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {filteredFrameworks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-text-secondary mb-4">
                    No frameworks match your filters.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEffort('all');
                      setRevenue('all');
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
          <h2 className="mb-6">Looking for tools instead?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Check out our curated marketplace of integrations, templates, and tools to help you implement these frameworks.
          </p>
          <Link href="/tools">
            <Button variant="primary" size="lg">
              Browse Marketplace
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
