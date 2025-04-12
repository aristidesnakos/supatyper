'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-secondary text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full p-3 border border-beige rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-buttonBlue ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-red-500 text-xs">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
