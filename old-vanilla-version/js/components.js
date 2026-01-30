/**
 * Shared Components
 * Dynamically loads header and sidebar components
 */

// Active page detection
function getActivePage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
}

// Render navigation with active state
function renderNavigation() {
    const activePage = getActivePage();
    const navItems = [
        { href: 'index.html', icon: '🏠', label: 'Dashboard', page: 'index' },
        { href: 'buildings.html', icon: '🏢', label: 'จัดการอาคาร/ห้อง', page: 'buildings' },
        { href: 'users.html', icon: '👥', label: 'จัดการผู้ใช้งาน', page: 'users' },
        { href: 'reports.html', icon: '📊', label: 'รายงาน', page: 'reports' },
        { href: 'feedback.html', icon: '💬', label: 'ข้อเสนอแนะ/รายงาน', page: 'feedback' },
    ];

    const navHtml = navItems.map(item => {
        const isActive = item.page === activePage;
        return `
      <li${isActive ? ' class="active"' : ''}>
        <a href="${item.href}">
          <span class="nav-icon">${item.icon}</span> ${item.label}
        </a>
      </li>
    `;
    }).join('');

    const sidebar = document.querySelector('.sidebar ul');
    if (sidebar) {
        sidebar.innerHTML = navHtml;
    }
}

// Get current user display name
function getUserDisplayName() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.name || 'ผู้ดูแลระบบ';
}

// Initialize components on page load
function initComponents() {
    renderNavigation();

    // Update user name in header
    const userNameEl = document.querySelector('.user-name');
    if (userNameEl) {
        userNameEl.textContent = getUserDisplayName();
    }
}

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', initComponents);
