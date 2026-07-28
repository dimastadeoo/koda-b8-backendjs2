// src/components/Modal.jsx
import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, message, type = 'info' }) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // auto close after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const bgColor = {
        success: 'bg-green-100 border-green-500',
        error: 'bg-red-100 border-red-500',
        info: 'bg-blue-100 border-blue-500',
    }[type] || 'bg-gray-100 border-gray-500';

    const textColor = {
        success: 'text-green-800',
        error: 'text-red-800',
        info: 'text-blue-800',
    }[type] || 'text-gray-800';

    const icon = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
    }[type] || 'ℹ️';

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
            <div className={`max-w-md w-full mx-4 p-6 rounded-lg shadow-xl border-l-4 ${bgColor}`}>
                <div className="flex items-start">
                    <span className="text-2xl mr-3">{icon}</span>
                    <div className="flex-1">
                        {title && <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>}
                        <p className={`mt-1 ${textColor}`}>{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 ml-4"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}