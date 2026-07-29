import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationsContext';
import { apiFetch } from '../api/api';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, logout } = useAuth();
    const { showNotification } = useNotification();

    const fetchNotes = async () => {
        try {
            const { data } = await apiFetch('/notes');
            if (data.success) setNotes(data.results);
            else setError(data.message);
        } catch (err) {
            setError('Failed to fetch notes');
            showNotification({
                title: 'Error',
                message: 'Failed to fetch notes',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const addNote = async (title, content) => {
        try {
            const { data } = await apiFetch('/notes', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
            });
            if (data.success) {
                setNotes([data.results, ...notes]);
                showNotification({
                    title: 'Note Added',
                    message: 'Note created successfully!',
                    type: 'success',
                });
                return { success: true };
            }
            showNotification({
                title: 'Error',
                message: data.message || 'Failed to add note',
                type: 'error',
            });
            return { success: false, message: data.message };
        } catch (err) {
            showNotification({
                title: 'Error',
                message: 'Failed to add note',
                type: 'error',
            });
            return { success: false, message: 'Failed to add note' };
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
                showNotification({
                    title: 'Note Updated',
                    message: 'Note updated successfully!',
                    type: 'success',
                });
                return { success: true };
            }
            showNotification({
                title: 'Error',
                message: data.message || 'Failed to update note',
                type: 'error',
            });
            return { success: false, message: data.message };
        } catch (err) {
            showNotification({
                title: 'Error',
                message: 'Failed to update note',
                type: 'error',
            });
            return { success: false, message: 'Failed to update note' };
        }
    };

    const deleteNote = async (id) => {
        try {
            const { data } = await apiFetch(`/notes/${id}`, {
                method: 'DELETE',
            });
            if (data.success) {
                setNotes(notes.filter(n => n.id !== id));
                showNotification({
                    title: 'Note Deleted',
                    message: 'Note deleted successfully!',
                    type: 'success',
                });
                return { success: true };
            }
            showNotification({
                title: 'Error',
                message: data.message || 'Failed to delete note',
                type: 'error',
            });
            return { success: false, message: data.message };
        } catch (err) {
            showNotification({
                title: 'Error',
                message: 'Failed to delete note',
                type: 'error',
            });
            return { success: false, message: 'Failed to delete note' };
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Your Notes</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{user?.name || user?.email}</span>
                        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Logout</button>
                    </div>
                </div>

                <NoteForm onAdd={addNote} />

                {error && <p className="text-red-500 mt-4">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {notes.map(note => (
                        <NoteCard key={note.id} note={note} onUpdate={updateNote} onDelete={deleteNote} />
                    ))}
                    {notes.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 mt-10">No notes yet. Create one above!</p>
                    )}
                </div>
            </div>
        </div>
    );
}