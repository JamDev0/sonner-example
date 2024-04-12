import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const ToastViewport = React.forwardRef<
  HTMLOListElement,
  React.OlHTMLAttributes,
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex h-fit max-h-screen w-full flex-col-reverse gap-y-1.5 p-4 sm:bottom-0 sm:right-0 sm:top-0 sm:flex-col md:max-w-[420px]',
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = 'ToastViewport';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-gray-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full dark:border-gray-800',
  {
    variants: {
      variant: {
        default: 'border bg-white dark:bg-gray-950',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Toast = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = `Toast`;

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-gray-950/50 opacity-0 transition-opacity hover:bg-gray-100 hover:text-gray-950 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 dark:text-gray-50/50 dark:hover:text-gray-50',
      className,
    )}
    {...props}
  >
    X
  </button>
));
ToastClose.displayName = 'ToastCloseButton';

const ToastTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HtmlHTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = 'ToastHeading';

const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.HtmlHTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport
};

