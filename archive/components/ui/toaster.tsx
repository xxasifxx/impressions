import React from 'react';
import { X } from 'lucide-react';

// Toast context
interface ToastContextType {
  toast: (options: ToastOptions) => void;
}

interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

interface Toast extends ToastOptions {
  id: string;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Toast provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      title: options.title,
      description: options.description,
      duration: options.duration || 3000,
      type: options.type || 'default',
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto-dismiss
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, newToast.duration);
  };

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2 max-w-md w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`bg-white rounded-lg shadow-lg p-4 border-l-4 ${
              toast.type === 'success' ? 'border-green-500' :
              toast.type === 'error' ? 'border-red-500' :
              toast.type === 'warning' ? 'border-yellow-500' :
              toast.type === 'info' ? 'border-blue-500' :
              'border-gray-500'
            } animate-enter`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{toast.title}</h3>
                {toast.description && <p className="text-sm text-gray-600 mt-1">{toast.description}</p>}
              </div>
              <button onClick={() => dismissToast(toast.id)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Simplified toast component for this implementation
export const Toaster: React.FC = () => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  // Global event listener for toast events
  React.useEffect(() => {
    const handleToast = (event: CustomEvent<ToastOptions>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = {
        id,
        title: event.detail.title,
        description: event.detail.description,
        duration: event.detail.duration || 3000,
        type: event.detail.type || 'default',
      };

      setToasts((prevToasts) => [...prevToasts, newToast]);

      // Auto-dismiss
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      }, newToast.duration);
    };

    // @ts-ignore - Custom event
    window.addEventListener('toast', handleToast);
    return () => {
      // @ts-ignore - Custom event
      window.removeEventListener('toast', handleToast);
    };
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2 max-w-md w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-white rounded-lg shadow-lg p-4 border-l-4 ${
            toast.type === 'success' ? 'border-green-500' :
            toast.type === 'error' ? 'border-red-500' :
            toast.type === 'warning' ? 'border-yellow-500' :
            toast.type === 'info' ? 'border-blue-500' :
            'border-gray-500'
          } animate-enter`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{toast.title}</h3>
              {toast.description && <p className="text-sm text-gray-600 mt-1">{toast.description}</p>}
            </div>
            <button onClick={() => dismissToast(toast.id)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to show toast
export const toast = (options: ToastOptions) => {
  const event = new CustomEvent('toast', { detail: options });
  window.dispatchEvent(event);
};

