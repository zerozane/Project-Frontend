/**
 * Users Page Logic
 * Handles user management with role-based permissions
 */

// Current user role (will be loaded from auth when backend is ready)
let currentUserRole = 'admin';

// Sample users data
let users = [
    { code: 'ADM-001', name: 'ผู้ดูแลระบบ', email: 'admin@rmutt.ac.th', role: 'admin', status: 'active', note: 'Admin System' },
    { code: 'STF-001', name: 'สมชาย ใจดี', email: 'somchai@mail.rmutt.ac.th', role: 'staff', status: 'active', note: '081-234-5678' },
    { code: 'STF-002', name: 'สมหญิง รักเรียน', email: 'somying@mail.rmutt.ac.th', role: 'staff', status: 'disabled', note: '089-876-5432' }
];

// ==================== RENDERING ====================

function renderUsers() {
    const tbody = document.getElementById('usersTbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    users.forEach((u, i) => {
        const firstChar = u.name?.trim()?.charAt(0)?.toUpperCase() || '?';
        const statusColor = u.status === 'active' ? '#3b82f6' : '#ef4444';
        const statusText = u.status === 'active' ? 'ปกติ' : 'ระงับ';
        let actionBtns = '';

        // Role badge styling
        let roleBadge = '';
        if (u.role === 'admin') {
            roleBadge = '<span style="background:linear-gradient(135deg,#dbeafe,#bfdbfe);color:#1e40af;font-size:12px;padding:4px 10px;border-radius:12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">🛡️ Admin</span>';
        } else {
            roleBadge = '<span style="background:#f1f5f9;color:#475569;font-size:12px;padding:4px 10px;border-radius:12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">👤 Staff</span>';
        }

        // Permission-based actions
        // Admin = full permissions (can block/unblock and edit)
        // Staff = limited permissions (can only edit, cannot block/unblock)
        if (currentUserRole === 'admin') {
            const lockIcon = u.status === 'active' ? '\uD83D\uDD13' : '\uD83D\uDD12';
            actionBtns += `<button class="icon-btn block-btn" title="บล็อก/ปลดบล็อก" onclick="toggleUserStatus(${i})">${lockIcon}</button>`;
            actionBtns += `<button class="icon-btn edit-btn" title="แก้ไข" onclick="openModal('edit', ${i})">✏️</button>`;
        } else if (currentUserRole === 'staff') {
            const lockIcon = u.status === 'active' ? '\uD83D\uDD13' : '\uD83D\uDD12';
            actionBtns += `<button class="icon-btn block-btn" title="บล็อก/ปลดบล็อก" style="opacity:0.5;cursor:not-allowed;" disabled>${lockIcon}</button>`;
            actionBtns += `<button class="icon-btn edit-btn" title="แก้ไข" onclick="openModal('edit', ${i})">✏️</button>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="avatar" style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#e0e7ef,#cbd5e1);color:#333;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.1em;">${firstChar}</div>
          <div>
            <div class="username" style="font-weight:600;">${u.name}</div>
          </div>
        </div>
      </td>
      <td class="muted">${u.email}</td>
      <td>${roleBadge}</td>
      <td>
        <span class="status-dot" style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${statusColor};margin-right:6px;"></span>
        <span class="status-text">${statusText}</span>
      </td>
      <td style="text-align:right;">${actionBtns}</td>
    `;
        tbody.appendChild(tr);
    });
}

// ==================== USER ACTIONS ====================

function toggleUserStatus(index) {
    if (!users[index]) return;
    users[index].status = users[index].status === 'active' ? 'disabled' : 'active';
    renderUsers();
    // TODO: Call API when backend is ready
    // toggleUserStatusAPI(users[index].id);
}

function openModal(type, index) {
    const modal = document.getElementById('userModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('userForm');

    document.getElementById('userIndex').value = index ?? '';

    if (type === 'edit') {
        title.innerText = 'แก้ไขข้อมูล';
        const u = users[index];
        document.getElementById('userCode').value = u.code;
        document.getElementById('userName').value = u.name;
        document.getElementById('userEmail').value = u.email;
        document.getElementById('userRole').value = u.role;
        document.getElementById('userStatus').value = u.status;
    } else {
        title.innerText = 'เพิ่มผู้ใช้งาน';
        form.reset();
        document.getElementById('userIndex').value = '';
    }

    modal.classList.add('active');
    setTimeout(() => document.getElementById('userName').focus(), 50);
}

function closeModal() {
    document.getElementById('userModal').classList.remove('active');
}

function deleteUserItem(index) {
    if (!confirm('ยืนยันการลบข้อมูล?')) return;
    users.splice(index, 1);
    renderUsers();
    // TODO: Call API when backend is ready
}

function handleUserFormSubmit(e) {
    e.preventDefault();
    const idx = document.getElementById('userIndex').value;
    const obj = {
        code: document.getElementById('userCode').value.trim(),
        name: document.getElementById('userName').value.trim(),
        email: document.getElementById('userEmail').value.trim(),
        role: document.getElementById('userRole').value,
        status: document.getElementById('userStatus').value,
        note: ''
    };

    if (idx === '') {
        users.push(obj);
    } else {
        users[parseInt(idx)] = obj;
    }

    renderUsers();
    closeModal();
    // TODO: Call API when backend is ready
}

// ==================== INITIALIZATION ====================

function initUsers() {
    renderUsers();

    // Setup form submit handler
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', handleUserFormSubmit);
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('userModal');
        if (e.target === modal) closeModal();
    });

    // TODO: Load users from API when backend is ready
    // loadUsersFromAPI();
}

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', initUsers);
