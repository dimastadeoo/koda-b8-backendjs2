import { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info', // 'info' | 'success' | 'error' | 'confirm'
        onConfirm: null,
        showCancel: false,
        confirmText: 'OK',
        cancelText: 'Cancel',
    });

    const showNotification = (title, message, type = 'info') => {
        setModal({
            isOpen: true,
            title,
            message,
            type,
            onConfirm: null,
            showCancel: false,
            confirmText: 'OK',
            cancelText: 'Cancel',
        });
    };

    const showConfirm = (title, message, onConfirm, confirmText = 'Yes, proceed', cancelText = 'Cancel') => {
        setModal({
            isOpen: true,
            title,
            message,
            type: 'confirm',
            onConfirm,
            showCancel: true,
            confirmText,
            cancelText,
        });
    };

    const closeModal = () => {
        setModal({ ...modal, isOpen: false });
    };

    const value = {
        modal,
        showNotification,
        showConfirm,
        closeModal,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};