/**
 * API Service Layer
 * Centralized API calls for Smart Campus Admin
 */

const API_BASE = '/api'; // Change this to your backend URL

/**
 * Make authenticated API request
 */
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
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// ==================== AUTH API ====================

async function loginUser(username, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

async function logoutUser() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

async function getCurrentUser() {
  return apiRequest('/auth/me');
}

// ==================== BUILDINGS API ====================

async function fetchBuildings() {
  return apiRequest('/buildings');
}

async function createBuilding(data) {
  return apiRequest('/buildings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function updateBuilding(id, data) {
  return apiRequest(`/buildings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

async function deleteBuilding(id) {
  return apiRequest(`/buildings/${id}`, {
    method: 'DELETE',
  });
}

// ==================== DEPARTMENTS API ====================

async function fetchDepartments() {
  return apiRequest('/departments');
}

async function createDepartment(data) {
  return apiRequest('/departments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function updateDepartment(id, data) {
  return apiRequest(`/departments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

async function deleteDepartment(id) {
  return apiRequest(`/departments/${id}`, {
    method: 'DELETE',
  });
}

// ==================== ROOMS API ====================

async function fetchRooms() {
  return apiRequest('/rooms');
}

async function createRoom(data) {
  return apiRequest('/rooms', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function updateRoom(id, data) {
  return apiRequest(`/rooms/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

async function deleteRoom(id) {
  return apiRequest(`/rooms/${id}`, {
    method: 'DELETE',
  });
}

// ==================== USERS API ====================

async function fetchUsers() {
  return apiRequest('/users');
}

async function createUser(data) {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function updateUser(id, data) {
  return apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

async function deleteUser(id) {
  return apiRequest(`/users/${id}`, {
    method: 'DELETE',
  });
}

async function toggleUserStatus(id) {
  return apiRequest(`/users/${id}/toggle-status`, {
    method: 'PATCH',
  });
}

// ==================== FEEDBACK API ====================

async function fetchFeedback() {
  return apiRequest('/feedback');
}

async function updateFeedbackStatus(id, status) {
  return apiRequest(`/feedback/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

// ==================== REPORTS API ====================

async function fetchDashboardStats() {
  return apiRequest('/reports/dashboard');
}

async function fetchSearchStats(period) {
  return apiRequest(`/reports/search?period=${period}`);
}

async function fetchAccessReports(period) {
  return apiRequest(`/reports/access?period=${period}`);
}
