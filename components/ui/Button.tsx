import React from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  // FIX: Add variant and size props to the ButtonProps interface to allow for different button styles and sizes.
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // FIX: Destructure variant and size from props, providing default values to handle cases where they are not specified.
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    // FIX: Implement a simple variant system to apply classes based on props, replacing the previous hardcoded styles.
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantClasses = {
        default: 'bg-indigo-600 text-indigo-50 hover:bg-indigo-600/90',
        outline: 'border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-300',
    };

    const sizeClasses = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        icon: 'h-10 w-10',
    };

    return (
      <button
        // FIX: Combine base styles, variant styles, size styles, and any additional classNames passed via props.
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
