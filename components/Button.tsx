import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary focus:ring-2 focus:ring-offset-2 focus:ring-[#0F172E]',
  secondary: 'btn-secondary focus:ring-2 focus:ring-offset-2 focus:ring-[#0F172E]',
  accent: 'btn-accent focus:ring-2 focus:ring-offset-2 focus:ring-[#0F172E]',
  ghost: 'btn-ghost focus:ring-2 focus:ring-offset-2 focus:ring-[#0F172E]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      isLoading = false,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClass = variantClasses[variant];
    const sizeClass = sizeClasses[size];
    const isDisabled = disabled || isLoading;

    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </>
    );

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`${variantClass} ${sizeClass} ${className}`.trim()}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </span>
        ) : (
          content
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
