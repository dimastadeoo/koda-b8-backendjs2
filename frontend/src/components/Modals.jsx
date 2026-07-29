import { useEffect, useRef } from 'react';

export default function Modal({
    isOpen,
    onClose,
    title,
    message,
    type = 'info',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm = null,
    showCancel = false,
}) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                if (type !== 'confirm') onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose, type]);

    if (!isOpen) return null;

    const getColor = () => {
        switch (type) {
            case 'success': return 'text-green-600';
            case 'error': return 'text-red-600';
            case 'confirm': return 'text-yellow-600';
            default: return 'text-blue-600';
        }
    };

    const getButtonColor = () => {
        switch (type) {
            case 'success': return 'bg-green-600 hover:bg-green-700';
            case 'error': return 'bg-red-600 hover:bg-red-700';
            case 'confirm': return 'bg-yellow-600 hover:bg-yellow-700';
            default: return 'bg-blue-600 hover:bg-blue-700';
        }
    };

    const handleConfirm = async () => {
        onClose();
        if (onConfirm) {
            await onConfirm();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold ${getColor()}`}>{title}</h3>
                    {type !== 'confirm' && (
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    {showCancel && (
                        <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
                            {cancelText}
                        </button>
                    )}
                    <button
                        onClick={handleConfirm}
                        className={`px-4 py-2 text-white rounded-md transition ${getButtonColor()}`}
                    >
                        {type === 'confirm' ? confirmText : 'OK'}
                    </button>
                </div>
            </div>
        </div>
    );
}