import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { apiFetch } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        setTimeout(() => {
            if (token && userData) {
                const user = JSON.parse(userData)
                if (typeof user == 'object' && user !== null && !Array.isArray(user)) {
                    setUser(user);
                }
            }
            setLoading(false);
        })
    }, [navigate]);

    const login = async (email, password) => {
        try {
            const { data } = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            if (data.success) {
                let { token, user } = data.results;
                user = {
                    ...user,
                    status: data.success
                }
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                navigate('/notes');
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'Login failed because ' + error };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
            });
            if (data.success) {
                const { token, user } = data.results;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                navigate('/notes');
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'Registration failed because ' + error };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);