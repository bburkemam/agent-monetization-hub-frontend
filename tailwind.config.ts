import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'agent-blue': '#0F172E',
        'agent-blue-dark': '#0D1220',
        'agent-blue-darker': '#0A0E18',
        'accent-cyan': '#00D9FF',
        'success-green': '#10B981',
        
        // Neutral
        'neutral-dark': '#1F2937',
        'neutral-light': '#F3F4F6',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'text-inverse': '#F9FAFB',
        'border-light': '#E5E7EB',
        'border-lighter': '#D1D5DB',
        
        // Alerts
        'warn-orange': '#F59E0B',
        'error-red': '#EF4444',
        
        // Badges
        'badge-framework': '#E0F2FE',
        'badge-framework-text': '#0369A1',
        'badge-revenue': '#F0FDF4',
        'badge-revenue-text': '#15803D',
        'badge-industry': '#FEF3C7',
        'badge-industry-text': '#92400E',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1F2937',
            a: {
              color: '#0F172E',
              '&:hover': {
                color: '#00D9FF',
              },
            },
          },
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Monaco', 'Fira Code', 'monospace'],
      },
      fontSize: {
        // Headings
        'h1': ['56px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['30px', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'h5': ['20px', { lineHeight: '1.5', fontWeight: '600' }],
        // Body
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-base': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        // Code
        'code': ['14px', { lineHeight: '1.5' }],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'btn': '8px',
        'card': '12px',
        'input': '6px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
