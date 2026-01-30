/**
 * Feedback Page Logic
 * Handles feedback and report management
 */

// ==================== FEEDBACK ACTIONS ====================

// View image (Demo)
function viewImage(detail) {
    alert('แสดงรูปภาพที่เกี่ยวข้องกับ: ' + detail + ' (Demo)');
}

// Toggle feedback status (resolved/pending)
function markResolved(btn) {
    const row = btn.closest('tr');
    const badge = row.querySelector('td:nth-child(4) .badge');

    if (badge.innerText.trim() === 'รอดำเนินการ') {
        badge.innerText = 'เสร็จสิ้น';
        badge.style.background = '#e0f2fe';
        badge.style.color = '#2563eb';
        btn.innerHTML = '↩️ ย้อนกลับ';
        btn.classList.remove('btn-success');
        btn.classList.add('btn-warning');
        btn.title = 'ย้อนกลับเป็นรอดำเนินการ';
        // TODO: Call API when backend is ready
        // updateFeedbackStatusAPI(feedbackId, 'resolved');
    } else {
        badge.innerText = 'รอดำเนินการ';
        badge.style.background = '#fee2e2';
        badge.style.color = '#dc2626';
        btn.innerHTML = '✅ เสร็จสิ้น';
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-success');
        btn.title = 'เปลี่ยนเป็นเสร็จสิ้น';
        // TODO: Call API when backend is ready
        // updateFeedbackStatusAPI(feedbackId, 'pending');
    }
}

// ==================== MODAL FUNCTIONS ====================

function openFeedbackModal() {
    document.getElementById('feedbackModal').classList.add('active');
}

function closeFeedbackModal() {
    document.getElementById('feedbackModal').classList.remove('active');
}

function viewFeedback(detail) {
    alert('รายละเอียด: ' + detail);
}

function confirmDelete() {
    if (confirm('ยืนยันการลบข้อมูล?')) alert('ลบเรียบร้อย (Demo)');
}

// ==================== SEARCH & FILTER ====================

function filterFeedback() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const rows = document.querySelectorAll('#feedbackTable tr');

    const searchTerm = searchInput?.value.toLowerCase() || '';
    const statusValue = statusFilter?.value || '';

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const badge = row.querySelector('.badge');
        const status = badge?.innerText.trim();

        let matchSearch = text.includes(searchTerm);
        let matchStatus = true;

        if (statusValue === 'pending') {
            matchStatus = status === 'รอดำเนินการ';
        } else if (statusValue === 'resolved') {
            matchStatus = status === 'เสร็จสิ้น';
        }

        row.style.display = matchSearch && matchStatus ? '' : 'none';
    });
}

// ==================== INITIALIZATION ====================

function initFeedback() {
    // Setup form submit handler
    const form = document.querySelector('#feedbackModal form');
    if (form) {
        form.onsubmit = function (e) {
            e.preventDefault();
            closeFeedbackModal();
            alert('บันทึกข้อเสนอแนะ (Demo)');
        };
    }

    // Setup search and filter
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterFeedback);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterFeedback);
    }

    // TODO: Load feedback from API when backend is ready
    // loadFeedbackFromAPI();
}

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', initFeedback);
