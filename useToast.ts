'use client';

import { useContext } from 'react';

import { ToastContext } from '@/contexts/toast';

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) throw new Error('useToast must be used inside a ToastProvider');

  return context;
}
