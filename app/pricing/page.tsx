'use client';

import React from 'react';
import { Button, Card, CardBody, CardHeader } from '@/components';

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    callsPerMonth: '10K',
    features: [
      'Core endpoints only',
      '10K calls/month',
      'Community support',
      'Rate limits: 10 req/s',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    callsPerMonth: '100K',
    features: [
      'All endpoints',
      '100K calls/month',
      'Email support',
      'Rate limits: 50 req/s',
      'Webhooks (coming soon)',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    callsPerMonth: '1M',
    features: [
      'All endpoints + custom',
      '1M calls/month',
      'Priority support',
      'Rate limits: 200 req/s',
      'Webhooks',
      'Advanced analytics',
      'Custom SLA',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    callsPerMonth: 'Unlimited',
    features: [
      'Everything in Pro',
      'Unlimited calls',
      'Dedicated support',
      'Custom integrations',
      'On-prem option',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const faqs = [
  {
    question: 'Can I change my plan anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.',
  },
  {
    question: 'What happens if I exceed my monthly limit?',
    answer: 'We\'ll notify you when you reach 80% of your limit. You can upgrade immediately or contact support to discuss higher usage tiers.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No contracts required. All plans are billed monthly and you can cancel anytime. No hidden fees.',
  },
  {
    question: 'Do you offer annual billing discounts?',
    answer: 'Yes! Pay annually and get 20% off any plan. Contact our sales team for details.',
  },
  {
    question: 'Is the API rate-limited?',
    answer: 'Yes, each tier has different rate limits. See the pricing table above for details.',
  },
  {
    question: 'What support is included?',
    answer: 'Free & Starter tiers get community support. Pro & Enterprise get email or priority support with faster response times.',
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <section className="gradient-hero text-white py-16 lg:py-20">
        <div className="container-max text-center">
          <h1 className="text-white mb-4">API Pricing</h1>
          <p className="text-xl text-gray-300">
            Simple, transparent pricing. Pay as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 lg:py-20">
        <div className="container-max">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                featured={tier.highlighted}
                className={tier.highlighted ? 'ring-2 ring-accent-cyan' : ''}
              >
                <CardHeader>
                  <h3 className="text-agent-blue mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-agent-blue">
                      {tier.price}
                    </span>
                    <span className="text-text-secondary text-sm">
                      {tier.period}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mt-4">
                    {tier.callsPerMonth} calls/month
                  </p>
                </CardHeader>

                <CardBody className="my-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent-cyan mt-1">✓</span>
                        <span className="text-sm text-text-secondary">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardBody>

                <div className="pt-4 border-t border-border-light">
                  <Button
                    variant={tier.highlighted ? 'accent' : 'secondary'}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Usage Calculator */}
          <div className="bg-neutral-light p-8 rounded-card mb-16">
            <h3 className="mb-6">Calculate Your Costs</h3>
            <div className="max-w-md">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Estimated API calls per month
              </label>
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                defaultValue="100000"
                className="w-full h-2 bg-border-light rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-text-secondary text-sm mt-4">
                Estimated monthly cost: <span className="text-agent-blue font-bold">Contact us for custom rates</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-20 bg-neutral-light">
        <div className="container-max">
          <h2 className="mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white p-6 rounded-card border border-border-light group cursor-pointer"
              >
                <summary className="font-semibold text-agent-blue flex items-center justify-between">
                  {faq.question}
                  <span className="text-accent-cyan group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="text-text-secondary mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-agent-blue text-white text-center">
        <div className="container-max">
          <h2 className="text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            All plans include free trial access. No credit card required.
          </p>
          <Button variant="secondary" size="lg">
            Get Your Free API Key
          </Button>
        </div>
      </section>
    </div>
  );
}
