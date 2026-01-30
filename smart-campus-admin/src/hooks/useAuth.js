import { useState, useEffect } from 'react';

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Simulate getting user from token
            setUser({
                name: 'Admin User',
                role: 'admin',
                email: 'admin@campus.ac.th'
            });
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        // Simulate login
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('token', 'mock-token');
            setUser({
                name: 'Admin User',
                role: 'admin',
                email: 'admin@campus.ac.th'
            });
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return { user, loading, login, logout };
}
