import type { ButtonHTMLAttributes, ReactNode } from 'react';

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded shadow-sm text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-default';

type ButtonSize = 'sm' | 'md';
type ButtonVariant = 'primary' | 'danger' | 'secondary' | 'tertiary';

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700',
  danger:
    'bg-odp-accentRed hover:bg-red-600 text-white dark:bg-odp-accentRed dark:hover:bg-red-600',
  secondary:
    'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:hover:bg-odp-focusBg dark:text-odp-fgStrong',
  tertiary:
    'bg-transparent hover:bg-gray-100 text-gray-700 dark:hover:bg-odp-focusBg dark:text-odp-fgStrong',
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = 'primary',
  size = 'sm',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const v = variantClasses[variant] ?? variantClasses.primary;
  const s = sizeClasses[size] ?? sizeClasses.sm;

  return (
    <button
      className={`${baseClasses} ${s} ${v} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
