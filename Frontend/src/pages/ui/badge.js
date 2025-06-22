import React from 'react';

const badgeStyles = {
  default:
    'bg-blue-600 text-white hover:bg-blue-700',
  secondary:
    'bg-gray-200 text-gray-800 hover:bg-gray-300',
  destructive:
    'bg-red-600 text-white hover:bg-red-700',
  outline:
    'border border-gray-400 text-gray-800',
};

export default function 
 Badge({ className = '', variant = 'default', children, ...props }) {
  const base =
    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

  return (
    <div className={`${base} ${badgeStyles[variant] || badgeStyles.default} ${className}`} {...props}>
      {children}
    </div>
  );
}


