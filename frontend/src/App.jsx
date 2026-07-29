import { Routes, Route, Navigate } from 'react-router';
import { useAuth } from './context/AuthContext';
import { useNotification } from './context/NotificationsContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import Modal from './components/Modals';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const { modal, closeModal } = useNotification();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/notes" replace />} />
      </Routes>
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={modal.onConfirm}
        showCancel={modal.showCancel}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
      />
    </>
  );
}

export default App;