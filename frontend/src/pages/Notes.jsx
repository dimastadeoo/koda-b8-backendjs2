import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationsContext';
import { apiFetch } from '../api/api';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const { user, logout } = useAuth();
    const { showNotification, showConfirm } = useNotification();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data } = await apiFetch('/notes');
                if (data.success) setNotes(data.results);
                else {
                    showNotification('Error', data.message || 'Failed to add note', 'error');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate("/login")
                }
            } catch {
                setError('Failed to fetch notes');
            } finally {
                setLoading(false);
            }
        };
        fetchNotes()
    }, [navigate, showNotification]);

    const addNote = async (title, content) => {
        try {
            const { data } = await apiFetch('/notes', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
            });
            if (data.success) {
                setNotes([data.results, ...notes]);
                showNotification('Success', data.message || 'Note added successfully!', 'success');
                return { success: true };
            }
            showNotification('Error', data.message || 'Failed to add note', 'error');
            return { success: false };
        } catch {
            showNotification('Error', 'Failed to add note', 'error');
            return { success: false };
        }
    };

    const updateNote = async (id, title, content) => {
        try {
            const { data } = await apiFetch(`/notes/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ title, content }),
            });
            if (data.success) {
                setNotes(notes.map(n => (n.id === id ? data.results : n)));
                showNotification('Success', data.message || 'Note updated successfully!', 'success');
                return { success: true };
            }
            showNotification('Error', data.message || 'Failed to update note', 'error');
            return { success: false };
        } catch {
            showNotification('Error', 'Failed to update note', 'error');
            return { success: false };
        }
    };

    const deleteNote = (id) => {
        showConfirm('Confirm Delete', 'Are you sure you want to delete this note?', async () => {
            try {
                const { data } = await apiFetch(`/notes/${id}`, { method: 'DELETE' });
                if (data.success) {
                    setNotes(notes.filter(n => n.id !== id));
                    showNotification('Success', data.message || 'Success deleted note', 'success');
                } else {
                    showNotification('Error', data.message || 'Failed to delete note', 'error');
                }
            } catch {
                showNotification('Error', 'Failed to delete note', 'error');
            }
        });
    };

    const handleLogout = () => {
        showConfirm('Confirm Logout', 'Are you sure you want to logout?', () => {
            logout();
            showNotification('Success', 'Success logout user', 'success');
            navigate('/login');
        });
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Your Notes</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{user?.name || user?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <NoteForm onAdd={addNote} />

                {error && <p className="text-red-500 mt-4">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {notes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onUpdate={updateNote}
                            onDelete={deleteNote}
                        />
                    ))}
                    {notes.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 mt-10">No notes yet. Create one above!</p>
                    )}
                </div>
            </div>
        </div>
    );
}