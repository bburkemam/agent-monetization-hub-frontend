'use client';

import React, { useState } from 'react';
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
  },
  {
    id: 2,
    title: 'Subscription Model',
    slug: 'subscription-model',
    effort: 'easy',
    revenue: 'medium',
    description: 'Monthly/annual recurring revenue. Best for: SaaS agents.',
    readTime: 7,
  },
  {
    id: 3,
    title: 'Outcome-Based Pricing',
    slug: 'outcome-based',
    effort: 'hard',
    revenue: 'high',
    description: 'Commission on results. Best for: Lead gen & sales agents.',
    readTime: 10,
  },
  {
    id: 4,
    title: 'Hybrid Model',
    slug: 'hybrid-model',
    effort: 'hard',
    revenue: 'high',
    description: 'Combine multiple pricing strategies.',
    readTime: 9,
  },
  {
    id: 5,
    title: 'Freemium',
    slug: 'freemium',
    effort: 'easy',
    revenue: 'low',
    description: 'Free tier + premium features. Best for: Scaling quickly.',
    readTime: 6,
  },
  {
    id: 6,
    title: 'White-Label',
    slug: 'white-label',
    effort: 'hard',
    revenue: 'high',
    description: 'Sell as another company\'s product.',
    readTime: 8,
  },
];

type EffortFilter = 'all' | 'easy' | 'medium' | 'hard';
type RevenueFilter = 'all' | 'low' | 'medium' | 'high';

export default function GuidesPage() {
  const [effort, setEffort] = useState<EffortFilter>('all');
  const [revenue, setRevenue] = useState<RevenueFilter>('all');

  const filteredFrameworks = frameworks.filter((f) => {
    const effortMatch = effort === 'all' || f.effort === effort;
    const revenueMatch = revenue === 'all' || f.revenue === revenue;
    return effortMatch && revenueMatch;
  });

  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <section className="gradient-hero text-white py-16 lg:py-20">
        <div className="container-max">
          <h1 className="text-white mb-4">Monetization Frameworks</h1>
          <p className="text-xl text-gray-300">
            7 proven models to turn your agent into revenue. Filter by effort & revenue potential.
          </p>
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
              <div className="mb-6">
                <p className="text-text-secondary">
                  Showing {filteredFrameworks.length} of {frameworks.length} frameworks
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFrameworks.map((framework) => (
                  <Card key={framework.id}>
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
