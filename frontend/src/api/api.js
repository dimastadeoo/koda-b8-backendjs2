
const url = import.meta.env.VITE_BACKEND_URL
const port = import.meta.env.VITE_BACKEND_PORT

const API_BASE = `${url}:${port}` 

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();
    return { response, data };
}