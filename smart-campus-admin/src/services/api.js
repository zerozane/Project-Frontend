/**
 * API Service Layer for React
 */

const API_BASE = '/api';

async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return null;
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// ==================== AUTH API ====================
export const authApi = {
    login: (username, password) =>
        apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        }),

    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    },

    getCurrentUser: () => apiRequest('/auth/me'),
};

// ==================== BUILDINGS API ====================
export const buildingsApi = {
    getAll: () => apiRequest('/buildings'),
    create: (data) => apiRequest('/buildings', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`/buildings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiRequest(`/buildings/${id}`, { method: 'DELETE' }),
};

// ==================== USERS API ====================
export const usersApi = {
    getAll: () => apiRequest('/users'),
    create: (data) => apiRequest('/users', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiRequest(`/users/${id}`, { method: 'DELETE' }),
    toggleStatus: (id) => apiRequest(`/users/${id}/toggle-status`, { method: 'PATCH' }),
};

// ==================== FEEDBACK API ====================
export const feedbackApi = {
    getAll: () => apiRequest('/feedback'),
    updateStatus: (id, status) => apiRequest(`/feedback/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};

// ==================== REPORTS API ====================
export const reportsApi = {
    getDashboard: () => apiRequest('/reports/dashboard'),
    getSearchStats: (period) => apiRequest(`/reports/search?period=${period}`),
    getAccessReports: (period) => apiRequest(`/reports/access?period=${period}`),
};

// ==================== MOCK DATA ====================
export const mockData = {
    dashboardStats: {
        totalUsers: 128,
        totalBuildings: 15,
        totalSearches: 2456,
        feedbackCount: 89,
    },

    buildings: [
        { id: 1, name: 'อาคาร A', floors: 5, rooms: 120, status: 'active' },
        { id: 2, name: 'อาคาร B', floors: 3, rooms: 45, status: 'active' },
        { id: 3, name: 'อาคาร C', floors: 4, rooms: 80, status: 'maintenance' },
    ],

    users: [
        { id: 1, name: 'Admin User', email: 'admin@campus.ac.th', role: 'admin', status: 'active' },
        { id: 2, name: 'Staff User', email: 'staff@campus.ac.th', role: 'staff', status: 'active' },
        { id: 3, name: 'User Test', email: 'user@campus.ac.th', role: 'user', status: 'inactive' },
    ],

    feedback: [
        { id: 1, user: 'Student A', message: 'หาห้องไม่เจอ', category: 'bug', status: 'pending', date: '2026-01-28' },
        { id: 2, user: 'Student B', message: 'ระบบใช้งานดีมาก', category: 'compliment', status: 'resolved', date: '2026-01-27' },
    ],

    popularBuildings: [
        { name: 'อาคาร A', searches: 450 },
        { name: 'อาคาร B', searches: 320 },
        { name: 'อาคาร C', searches: 280 },
        { name: 'อาคาร D', searches: 210 },
        { name: 'อาคาร E', searches: 180 },
    ],

    searchByType: [
        { name: 'ค้นหาห้อง', value: 45 },
        { name: 'ค้นหาอาคาร', value: 30 },
        { name: 'ค้นหาแผนก', value: 25 },
    ],
};
