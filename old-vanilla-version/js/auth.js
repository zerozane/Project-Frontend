/**
 * Authentication Utilities
 * Handles login, logout, and auth guard
 */

// Check if user is authenticated
function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Auth guard - redirect to login if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Get current user info from token
function getCurrentUserInfo() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        // Decode JWT payload (basic decode, not verification)
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (e) {
        console.error('Error decoding token:', e);
        return null;
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    const submitBtn = event.target.querySelector('button[type="submit"]');

    // Show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'กำลังเข้าสู่ระบบ...';
    }

    try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await loginUser(username, password);

        // Demo mode: simulate login
        if (username && password) {
            // Simulate API response
            const demoToken = btoa(JSON.stringify({
                id: 1,
                username: username,
                role: 'admin',
                exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
            }));

            localStorage.setItem('token', demoToken);
            localStorage.setItem('user', JSON.stringify({
                id: 1,
                username: username,
                name: 'ผู้ดูแลระบบ',
                role: 'admin'
            }));

            window.location.href = 'index.html';
        } else {
            throw new Error('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
        }
    } catch (error) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = error.message || 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่';
        } else {
            alert(error.message || 'เข้าสู่ระบบไม่สำเร็จ');
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'เข้าสู่ระบบ';
        }
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Update user display in header
function updateUserDisplay() {
    const userNameEl = document.querySelector('.user-name');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (userNameEl && user.name) {
        userNameEl.textContent = user.name;
    }
}

// Initialize auth on page load
function initAuth() {
    // Skip auth check on login page
    if (window.location.pathname.includes('login.html')) {
        return;
    }

    // Check authentication for protected pages
    if (!requireAuth()) {
        return;
    }

    // Update user display
    updateUserDisplay();
}

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', initAuth);
