import { useState } from 'react';

export default function NoteCard({ note, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleUpdate = async () => {
        const result = await onUpdate(note.id, title, content);
        if (result.success) {
            setEditing(false);
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            {editing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Content"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
                    <p className="text-gray-600 mt-1 whitespace-pre-wrap">{note.content}</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => setEditing(true)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(note.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}