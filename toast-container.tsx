'use client';

import { useToast } from './useToast';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from './toast-component';

import { ToastProvider, toastType } from './toastContext';

const IconsByType: { [K in toastType]: React.ReactNode } = {
  error: (
    <div className="inline-flex items-center justify-center rounded-lg bg-red-100 p-2 text-red-500">
      !
    </div>
  ),
  info: (
    <div className="inline-flex items-center justify-center rounded-lg bg-cyan-100 p-2 text-cyan-500">
      ?
    </div>
  ),
  success: (
    <div className="inline-flex items-center justify-center rounded-lg bg-green-100 p-2 text-green-500">
      👍
    </div>
  ),
};

export function ToastContainer() {
  const { toasts, deleteToast } = useToast();

  return (
    <ToastProvider>
      <ToastViewport>
        {toasts.map(
          ({ id, title, type, content, closeButton = true, durationInMs }) => (
            <div className="w-96" key={id}>
              <Toast duration={durationInMs}>
                {IconsByType[type]}
                <div className="flex flex-1 flex-col">
                  <ToastTitle>{title}</ToastTitle>
                  <ToastDescription>{content}</ToastDescription>
                </div>

                {closeButton && <ToastClose onClick={() => deleteToast(id)} />}
              </Toast>
            </div>
          ),
        )}
      </ToastViewport>
    </ToastProvider>
  );
}
