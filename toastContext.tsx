'use client';

import { createContext, useCallback, useState } from 'react';

export type toastType = 'success' | 'info' | 'error'

interface ToastProps {
  durationInMs?: number;
  type: toastType;
  title: string;
  content?: React.ReactNode;
  closeButton?: boolean;
  id: string; // title + current timestamp
}

interface toastContextData {
  toasts: ToastProps[];
  addToast: (newToastData: Omit<ToastProps, 'id'>) => void;
  deleteToast: (id: string) => void;
}

export const ToastContext = createContext<toastContextData>(
  {} as toastContextData,
);

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((newToastData: Omit<ToastProps, 'id'>) => {
    const { title, durationInMs = 5000 } = newToastData;

    const newToastId = `${title}_${new Date().getTime()}`;

    const newToast: ToastProps = { ...newToastData, id: newToastId };

    setToasts(state => [...state, newToast]);

    setTimeout(() => {
      setToasts(state => {
        const toastExists =
          state.find(toast => toast.id === newToastId) !== undefined;

        if (toastExists) return state.filter(toast => toast.id !== newToastId);

        return state;
      });
    }, durationInMs);
  }, []);

  function deleteToast(id: string) {
    setToasts(state => {
      return state.filter(toast => toast.id !== id);
    });
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, deleteToast }}>
      {children}
    </ToastContext.Provider>
  );
}
