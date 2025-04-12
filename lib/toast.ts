'use client';

import { toast as hotToast } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'loading';

interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const defaultOptions: ToastOptions = {
  duration: 3000,
  position: 'top-center',
};

function createToast(message: string, type: ToastType, options?: ToastOptions) {
  const mergedOptions = { ...defaultOptions, ...options };
  
  switch (type) {
    case 'success':
      return hotToast.success(message, mergedOptions);
    case 'error':
      return hotToast.error(message, mergedOptions);
    case 'loading':
      return hotToast.loading(message, mergedOptions);
    default:
      return hotToast(message, mergedOptions);
  }
}

export const toast = {
  success: (message: string, options?: ToastOptions) => createToast(message, 'success', options),
  error: (message: string, options?: ToastOptions) => createToast(message, 'error', options),
  loading: (message: string, options?: ToastOptions) => createToast(message, 'loading', options),
  dismiss: hotToast.dismiss,
};
