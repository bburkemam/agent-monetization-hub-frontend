import React from 'react';

type BadgeVariant = 'framework' | 'revenue' | 'industry' | 'easy' | 'medium' | 'hard';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  framework: 'badge-framework',
  revenue: 'badge-revenue',
  industry: 'badge-industry',
  easy: 'badge-easy badge-easy',
  medium: 'badge-effort badge-medium',
  hard: 'badge-effort badge-hard',
};

export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  className = '',
  ...props
}) => {
  const variantClass = variantClasses[variant];
  return (
    <span
      className={`badge ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
};
