import React from 'react';

const Button = React.forwardRef(
  ({ variant = 'default', size = 'default', className = '', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-gray-300 bg-white hover:bg-gray-100 text-black',
      secondary: 'bg-gray-100 text-black hover:bg-gray-200',
      ghost: 'bg-transparent hover:bg-gray-100 text-black',
      link: 'text-blue-600 underline-offset-4 hover:underline bg-transparent',
    };

    const sizes = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-10 px-8',
      icon: 'h-9 w-9 p-0',
    };

    const finalClassName = [
      base,
      variants[variant] || variants.default,
      sizes[size] || sizes.default,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return <button ref={ref} className={finalClassName} {...props} />;
  }
);

Button.displayName = 'Button';

export { Button };
