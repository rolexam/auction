import React, { createContext, useContext, useState, ReactNode } from 'react';

type Toast = {
    id: number;
    message: string;
};

type ToastContextType = {
    toasts: Toast[];
    addToast: (message: string) => void;
    removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message }]);
        // Автоматически удаляем уведомление через 5 секунд (можно изменить время)
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            {/* Контейнер для уведомлений */}
            <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="bg-red-500 text-white p-4 rounded shadow flex items-center justify-between"
                    >
                        <span>{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-4 font-bold"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
