'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, Badge, Button } from '@/components';

const caseStudies = [
  {
    id: 1,
    title: 'Lead Gen Agency Hits $45K/Month',
    slug: 'lead-gen-agency',
    industry: 'lead-gen',
    revenue: 'high',
    timeline: '6 months',
    founder: 'Alex Chen',
    description: 'How Alex turned an AI lead gen agent into a $45K/month business using usage-based pricing.',
    metrics: {
      initial: '$2.1K',
      final: '$45K+',
      growth: '21x',
    },
    readTime: 10,
    featured: true,
    tags: ['usage-based', 'saas', 'growth'],
  },
];

type IndustryFilter = 'all' | 'lead-gen' | 'content' | 'data' | 'support' | 'research';
type RevenueFilter = 'all' | 'low' | 'medium' | 'high';

export default function CaseStudiesPage() {
  const [industry, setIndustry] = useState<IndustryFilter>('all');
  const [revenue, setRevenue] = useState<RevenueFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((study) => {
      const industryMatch = industry === 'all' || study.industry === industry;
      const revenueMatch = revenue === 'all' || study.revenue === revenue;
      const searchMatch = searchQuery === '' ||
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
      return industryMatch && revenueMatch && searchMatch;
    });
  }, [industry, revenue, searchQuery]);

  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'lead-gen', label: 'Lead Generation' },
    { value: 'content', label: 'Content Creation' },
    { value: 'data', label: 'Data Analysis' },
    { value: 'support', label: 'Customer Support' },
    { value: 'research', label: 'Research' },
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <section className="gradient-hero text-white py-16 lg:py-20">
        <div className="container-max">
          <h1 className="text-white mb-4">Case Studies</h1>
          <p className="text-xl text-gray-300 mb-8">
            Real founders, real numbers. Learn how agents are making $5K–$100K+ monthly.
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
                placeholder="Search by founder, industry, or keyword..."
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
                  <h4 className="font-semibold text-agent-blue mb-3">Filter by Industry</h4>
                  <div className="space-y-2">
                    {industryOptions.map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="industry"
                          value={option.value}
                          checked={industry === option.value}
                          onChange={(e) => setIndustry(e.target.value as IndustryFilter)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-text-primary text-sm">{option.label}</span>
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
                          {tier === 'all' ? 'All Tiers' : tier === 'low' ? 'Under $10K/mo' : tier === 'medium' ? '$10K–$50K/mo' : '$50K+/mo'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {(industry !== 'all' || revenue !== 'all' || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-center"
                    onClick={() => {
                      setIndustry('all');
                      setRevenue('all');
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
              <div className="mb-6">
                <p className="text-text-secondary">
                  Showing <strong className="text-agent-blue">{filteredCaseStudies.length}</strong> case study{filteredCaseStudies.length !== 1 ? 'ies' : ''}
                </p>
              </div>

              <div className="space-y-6">
                {filteredCaseStudies.map((study, idx) => (
                  <div key={study.id} className="animate-fade-in" style={{
                    animationDelay: `${idx * 50}ms`
                  }}>
                    <Card className="overflow-hidden hover:shadow-card-hover transition-all hover:translate-x-1">
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {study.featured && (
                              <Badge variant="revenue">Featured</Badge>
                            )}
                            <Badge variant="framework">{study.industry.replace('-', ' ')}</Badge>
                            <Badge variant="revenue">
                              {study.revenue === 'low' ? '💰' : study.revenue === 'medium' ? '💰💰' : '💰💰💰'}
                            </Badge>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-agent-blue mb-2">
                            {study.title}
                          </h3>
                          <p className="text-text-secondary mb-4">{study.description}</p>
                        </div>

                        {/* Metrics Box */}
                        <div className="bg-neutral-light rounded-lg p-4 md:p-6 md:min-w-48">
                          <div className="text-center">
                            <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">Growth</p>
                            <p className="text-3xl font-bold text-accent-cyan mb-3">{study.metrics.growth}</p>
                            <div className="space-y-2 text-sm">
                              <div>
                                <p className="text-text-secondary text-xs">From</p>
                                <p className="font-semibold text-agent-blue">{study.metrics.initial}</p>
                              </div>
                              <div>
                                <p className="text-text-secondary text-xs">To</p>
                                <p className="font-semibold text-success-green">{study.metrics.final}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border-light pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-text-secondary uppercase tracking-wide">Founder</p>
                            <p className="font-semibold text-agent-blue">{study.founder}</p>
                          </div>
                          <div className="hidden md:block w-px h-8 bg-border-light"></div>
                          <div>
                            <p className="text-xs text-text-secondary uppercase tracking-wide">Timeline</p>
                            <p className="font-semibold text-agent-blue">{study.timeline}</p>
                          </div>
                          <div className="hidden md:block w-px h-8 bg-border-light"></div>
                          <div>
                            <p className="text-xs text-text-secondary uppercase tracking-wide">Read Time</p>
                            <p className="font-semibold text-agent-blue">{study.readTime} min</p>
                          </div>
                        </div>

                        <Link href={`/case-studies/${study.slug}`}>
                          <Button variant="primary">Read Case Study →</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                  </div>
                ))}
              </div>

              {filteredCaseStudies.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-text-secondary mb-4 text-lg">
                    No case studies match your filters.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIndustry('all');
                      setRevenue('all');
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
          <h2 className="mb-6">Get insights from proven monetization strategies</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Our case studies show exactly how real agents scaled to revenue. Learn the playbooks, mistakes, and wins.
          </p>
          <Link href="/guides">
            <Button variant="primary" size="lg">Browse Frameworks →</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
