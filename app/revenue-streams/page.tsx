'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, Badge, Button } from '@/components';

const revenueStreams = [
  {
    id: 1,
    name: 'Usage-Based API',
    description: 'Charge per API call, token, or unit of output.',
    difficulty: 'easy',
    scalability: 'high',
    timeToRevenue: '4 weeks',
    avgPrice: '$0.05–$0.50 per unit',
    bestFor: 'Text generation, search, classification agents',
    effort: 'Low infrastructure needed',
    pros: ['Scales with demand', 'Easy to understand', 'Aligns with usage'],
    cons: ['Revenue unpredictable', 'Users hesitant with unknown costs'],
  },
  {
    id: 2,
    name: 'Subscription Tiers',
    description: 'Monthly or annual recurring fee. Good for predictable revenue.',
    difficulty: 'easy',
    scalability: 'medium',
    timeToRevenue: '6 weeks',
    avgPrice: '$9–$499/month',
    bestFor: 'SaaS agents, content creation, research assistants',
    effort: 'Billing + customer success needed',
    pros: ['Predictable revenue', 'Customer retention focus', 'Easy to explain'],
    cons: ['Acquisition cost high', 'Churn is killer'],
  },
  {
    id: 3,
    name: 'Outcome-Based (Revenue Share)',
    description: 'Earn commission on closed deals or leads generated.',
    difficulty: 'hard',
    scalability: 'high',
    timeToRevenue: '8 weeks',
    avgPrice: '15–50% commission',
    bestFor: 'Lead gen, sales, recruitment agents',
    effort: 'Integration + tracking + disputes',
    pros: ['Fully aligned with customer', 'High upside', 'Customer buys in'],
    cons: ['Hard to track', 'Highest churn risk', 'Complex agreements'],
  },
  {
    id: 4,
    name: 'Freemium Conversion',
    description: 'Free tier with paid premium features or limits.',
    difficulty: 'medium',
    scalability: 'high',
    timeToRevenue: '12 weeks',
    avgPrice: '$19–$99/month (premium)',
    bestFor: 'High-volume agents needing scale',
    effort: 'Feature gates + engagement tracking',
    pros: ['Viral growth potential', 'Low friction to start', 'Natural upgrade path'],
    cons: ['Low free tier conversion', 'Support costs high'],
  },
  {
    id: 5,
    name: 'White-Label Licensing',
    description: 'License your agent to other platforms or resellers.',
    difficulty: 'hard',
    scalability: 'high',
    timeToRevenue: '16 weeks',
    avgPrice: '20–40% revenue share',
    bestFor: 'Mature agents with proven demand',
    effort: 'API hardening + legal + support',
    pros: ['Passive scale', 'Higher LTV', 'Less churn'],
    cons: ['Long sales cycle', 'Support burden', 'Quality control issues'],
  },
  {
    id: 6,
    name: 'Enterprise Contracts',
    description: 'Custom pricing for large-volume enterprise customers.',
    difficulty: 'hard',
    scalability: 'low',
    timeToRevenue: '20 weeks',
    avgPrice: '$5K–$500K+ annually',
    bestFor: 'Mature agents with 10+ paying customers',
    effort: 'Sales team + CS + legal needed',
    pros: ['Highest deal sizes', 'Multi-year contracts', 'Sticky customers'],
    cons: ['Long sales cycles', 'High CAC', 'Distraction from product'],
  },
  {
    id: 7,
    name: 'Consulting & Custom Development',
    description: 'Offer custom agents, integrations, or implementation services.',
    difficulty: 'medium',
    scalability: 'low',
    timeToRevenue: '4 weeks',
    avgPrice: '$3K–$50K per project',
    bestFor: 'Technical founders with sales skills',
    effort: 'Project management + delivery',
    pros: ['Immediate revenue', 'Learn customer needs', 'Can lead to product'],
    cons: ['Not scalable', 'Time intensive', 'Can distract from product'],
  },
  {
    id: 8,
    name: 'Affiliate & Referral Program',
    description: 'Earn commission on tools/services you recommend.',
    difficulty: 'easy',
    scalability: 'medium',
    timeToRevenue: '6 weeks',
    avgPrice: '5–30% commission (varies)',
    bestFor: 'Content creators, agencies, agents with audience',
    effort: 'Minimal—track links and payouts',
    pros: ['No inventory', 'Passive income potential', 'Win-win partnerships'],
    cons: ['Low margins', 'Requires audience', 'Relationship dependent'],
  },
  {
    id: 9,
    name: 'Data Licensing',
    description: 'Sell aggregated, anonymized data from your agent.',
    difficulty: 'hard',
    scalability: 'high',
    timeToRevenue: '24 weeks',
    avgPrice: '$10K–$1M+ annually',
    bestFor: 'Mature agents with rich datasets',
    effort: 'Privacy compliance + packaging',
    pros: ['Passive recurring', 'Huge upside', 'Defensible IP'],
    cons: ['Regulatory maze', 'Privacy sensitive', 'Slow to monetize'],
  },
  {
    id: 10,
    name: 'Certification & Training',
    description: 'Sell courses, certifications, or training on your agent/methodology.',
    difficulty: 'medium',
    scalability: 'medium',
    timeToRevenue: '12 weeks',
    avgPrice: '$99–$499 per course',
    bestFor: 'Agents with strong community',
    effort: 'Course creation + marketing',
    pros: ['High margins', 'Builds authority', 'Engagement driver'],
    cons: ['Time intensive', 'Quality control', 'Distraction from product'],
  },
];

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';
type ScalabilityFilter = 'all' | 'low' | 'medium' | 'high';

export default function RevenueStreamsPage() {
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [scalability, setScalability] = useState<ScalabilityFilter>('all');

  const filteredStreams = revenueStreams.filter((stream) => {
    const difficultyMatch = difficulty === 'all' || stream.difficulty === difficulty;
    const scalabilityMatch = scalability === 'all' || stream.scalability === scalability;
    return difficultyMatch && scalabilityMatch;
  });

  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <section className="gradient-hero text-white py-16 lg:py-20">
        <div className="container-max">
          <h1 className="text-white mb-4">10 Revenue Streams</h1>
          <p className="text-xl text-gray-300 mb-8">
            Complete guide to monetizing your agent. From usage-based to white-label. Compare difficulty, scalability, and unit economics.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-neutral-light border-b border-border-light">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-agent-blue mb-3">Filter by Implementation Difficulty</h4>
              <div className="flex flex-wrap gap-2">
                {['all', 'easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level as DifficultyFilter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      difficulty === level
                        ? 'bg-agent-blue text-white'
                        : 'bg-white text-agent-blue border border-border-light hover:bg-neutral-light'
                    }`}
                  >
                    {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-agent-blue mb-3">Filter by Scalability</h4>
              <div className="flex flex-wrap gap-2">
                {['all', 'low', 'medium', 'high'].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setScalability(scale as ScalabilityFilter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      scalability === scale
                        ? 'bg-agent-blue text-white'
                        : 'bg-white text-agent-blue border border-border-light hover:bg-neutral-light'
                    }`}
                  >
                    {scale === 'all' ? 'All Scales' : scale.charAt(0).toUpperCase() + scale.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {(difficulty !== 'all' || scalability !== 'all') && (
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setDifficulty('all');
                  setScalability('all');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container-max">
          <div className="mb-8">
            <p className="text-text-secondary">
              Showing <strong className="text-agent-blue">{filteredStreams.length}</strong> of <strong className="text-agent-blue">{revenueStreams.length}</strong> revenue streams
            </p>
          </div>

          <div className="space-y-6">
            {filteredStreams.map((stream, idx) => (
              <div key={stream.id} className="animate-fade-in" style={{
                animationDelay: `${idx * 50}ms`
              }}>
                <Card className="overflow-hidden hover:shadow-card-hover transition-all">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant={
                          stream.difficulty === 'easy' ? 'easy' : 
                          stream.difficulty === 'medium' ? 'medium' : 'hard'
                        }>
                          {stream.difficulty === 'easy' ? 'Easy Setup' : 
                           stream.difficulty === 'medium' ? 'Moderate' : 'Complex'}
                        </Badge>
                        <Badge variant={
                          stream.scalability === 'high' ? 'revenue' : 'framework'
                        }>
                          {stream.scalability === 'high' ? '📈 Highly Scalable' : 
                           stream.scalability === 'medium' ? '📊 Medium Scale' : '📍 Limited Scale'}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-agent-blue mb-2">
                        {stream.name}
                      </h3>
                      <p className="text-lg text-text-secondary mb-4">{stream.description}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid md:grid-cols-4 gap-4 mb-6 p-4 bg-neutral-light rounded-lg">
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Typical Price</p>
                      <p className="font-semibold text-agent-blue">{stream.avgPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Time to Revenue</p>
                      <p className="font-semibold text-agent-blue">{stream.timeToRevenue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Implementation</p>
                      <p className="font-semibold text-agent-blue">{stream.effort}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Best For</p>
                      <p className="font-semibold text-agent-blue text-sm">{stream.bestFor}</p>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-success-green mb-3">Pros</h5>
                      <ul className="space-y-2">
                        {stream.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-text-secondary flex items-start gap-2">
                            <span className="text-success-green mt-0.5 flex-shrink-0">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-error-red mb-3">Cons</h5>
                      <ul className="space-y-2">
                        {stream.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-text-secondary flex items-start gap-2">
                            <span className="text-error-red mt-0.5 flex-shrink-0">✗</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
              </div>
            ))}
          </div>

          {filteredStreams.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary mb-4 text-lg">No streams match your filters.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  setDifficulty('all');
                  setScalability('all');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-12 lg:py-16 bg-neutral-light">
        <div className="container-max">
          <h2 className="mb-8">Quick Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border-light">
                  <th className="text-left py-3 px-4 font-semibold text-agent-blue">Revenue Stream</th>
                  <th className="text-left py-3 px-4 font-semibold text-agent-blue">Difficulty</th>
                  <th className="text-left py-3 px-4 font-semibold text-agent-blue">Scalability</th>
                  <th className="text-left py-3 px-4 font-semibold text-agent-blue">Time to Revenue</th>
                </tr>
              </thead>
              <tbody>
                {revenueStreams.map((stream) => (
                  <tr key={stream.id} className="border-b border-border-light hover:bg-white transition-colors">
                    <td className="py-3 px-4 font-medium text-agent-blue">{stream.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        stream.difficulty === 'easy' ? 'easy' : 
                        stream.difficulty === 'medium' ? 'medium' : 'hard'
                      }>
                        {stream.difficulty}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={stream.scalability === 'high' ? 'revenue' : 'framework'}>
                        {stream.scalability}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-text-secondary">{stream.timeToRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16">
        <div className="container-max text-center">
          <h2 className="mb-6">Ready to choose your revenue model?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Start with one stream. Master it. Then add a second. The best monetized agents use 2–3 streams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides">
              <Button variant="primary" size="lg">Browse Frameworks →</Button>
            </Link>
            <Link href="/case-studies">
              <Button variant="accent" size="lg">Learn from Real Founders →</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
