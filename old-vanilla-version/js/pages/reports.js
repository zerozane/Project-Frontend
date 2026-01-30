/**
 * Reports Page Logic
 * Handles period-based data filtering for access and search reports
 * 
 * PERMISSIONS:
 * - Admin: View all reports
 * - Staff: View all reports
 */

// Sample data for different periods
const reportData = {
    access: {
        '7': {
            total: 4820,
            avgPerDay: 160,
            newUsers: 86,
            avgNewPerDay: 3,
            rows: [
                { date: '29 ม.ค.', access: 182, newUsers: 3 },
                { date: '28 ม.ค.', access: 156, newUsers: 2 },
                { date: '27 ม.ค.', access: 210, newUsers: 4 },
                { date: '26 ม.ค.', access: 145, newUsers: 2 },
                { date: '25 ม.ค.', access: 198, newUsers: 5 },
                { date: '24 ม.ค.', access: 176, newUsers: 3 },
                { date: '23 ม.ค.', access: 153, newUsers: 2 }
            ]
        },
        '30': {
            total: 18450,
            avgPerDay: 615,
            newUsers: 342,
            avgNewPerDay: 11,
            rows: [
                { date: 'สัปดาห์ที่ 4', access: 4820, newUsers: 86 },
                { date: 'สัปดาห์ที่ 3', access: 4650, newUsers: 92 },
                { date: 'สัปดาห์ที่ 2', access: 4380, newUsers: 78 },
                { date: 'สัปดาห์ที่ 1', access: 4600, newUsers: 86 }
            ]
        },
        '365': {
            total: 215680,
            avgPerDay: 591,
            newUsers: 4250,
            avgNewPerDay: 12,
            rows: [
                { date: 'ม.ค. 2026', access: 18450, newUsers: 342 },
                { date: 'ธ.ค. 2025', access: 21200, newUsers: 380 },
                { date: 'พ.ย. 2025', access: 19800, newUsers: 356 },
                { date: 'ต.ค. 2025', access: 18900, newUsers: 312 },
                { date: 'ก.ย. 2025', access: 17500, newUsers: 298 },
                { date: 'ส.ค. 2025', access: 16800, newUsers: 285 }
            ]
        }
    },
    search: {
        '7': {
            total: 1234,
            change: '+8%',
            rows: [
                { date: '29 ม.ค.', count: 120, popular: 'CPE-203' },
                { date: '28 ม.ค.', count: 98, popular: 'EN-105' },
                { date: '27 ม.ค.', count: 134, popular: 'CPE-301' },
                { date: '26 ม.ค.', count: 86, popular: 'EN-205' },
                { date: '25 ม.ค.', count: 142, popular: 'BA-101' },
                { date: '24 ม.ค.', count: 156, popular: 'CPE-203' },
                { date: '23 ม.ค.', count: 98, popular: 'EN-301' }
            ]
        },
        '30': {
            total: 4856,
            change: '+12%',
            rows: [
                { date: 'สัปดาห์ที่ 4', count: 1234, popular: 'CPE-203' },
                { date: 'สัปดาห์ที่ 3', count: 1186, popular: 'EN-105' },
                { date: 'สัปดาห์ที่ 2', count: 1245, popular: 'CPE-301' },
                { date: 'สัปดาห์ที่ 1', count: 1191, popular: 'BA-101' }
            ]
        },
        '365': {
            total: 58420,
            change: '+23%',
            rows: [
                { date: 'ม.ค. 2026', count: 4856, popular: 'CPE-203' },
                { date: 'ธ.ค. 2025', count: 5240, popular: 'CPE-203' },
                { date: 'พ.ย. 2025', count: 4980, popular: 'EN-105' },
                { date: 'ต.ค. 2025', count: 4650, popular: 'CPE-301' },
                { date: 'ก.ย. 2025', count: 4320, popular: 'BA-101' },
                { date: 'ส.ค. 2025', count: 4180, popular: 'EN-205' }
            ]
        }
    }
};

// Current selected periods
let accessPeriod = '7';
let searchPeriod = '7';

// ==================== UPDATE STATS ====================

function updateStats() {
    const accessData = reportData.access[accessPeriod];

    // Update stats cards
    document.getElementById('statAccess').innerHTML = `
        <div class="stat-title">การเข้าถึงระบบ (${getPeriodLabel(accessPeriod)})</div>
        <div class="stat-number">${accessData.total.toLocaleString()}</div>
        <div class="stat-sub">เฉลี่ยต่อวัน ~${accessData.avgPerDay}</div>
    `;

    document.getElementById('statSearch').innerHTML = `
        <div class="stat-title">การค้นหาข้อมูลอาคาร/ห้อง</div>
        <div class="stat-number">${reportData.search[searchPeriod].total.toLocaleString()}</div>
        <div class="stat-sub">เทียบเดือนก่อน ${reportData.search[searchPeriod].change}</div>
    `;

    document.getElementById('statNewUsers').innerHTML = `
        <div class="stat-title">ผู้ใช้ใหม่ (${getPeriodLabel(accessPeriod)})</div>
        <div class="stat-number">${accessData.newUsers}</div>
        <div class="stat-sub">เฉลี่ยต่อวัน ~${accessData.avgNewPerDay}</div>
    `;
}

function getPeriodLabel(period) {
    switch (period) {
        case '7': return '7 วัน';
        case '30': return '30 วัน';
        case '365': return '1 ปี';
        default: return '7 วัน';
    }
}

// ==================== UPDATE TABLES ====================

function updateAccessTable() {
    const data = reportData.access[accessPeriod];
    const tbody = document.getElementById('accessTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.rows.map(row => `
        <tr>
            <td>${row.date}</td>
            <td>${row.access.toLocaleString()}</td>
            <td>${row.newUsers}</td>
        </tr>
    `).join('');
}

function updateSearchTable() {
    const data = reportData.search[searchPeriod];
    const tbody = document.getElementById('searchTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.rows.map(row => `
        <tr>
            <td>${row.date}</td>
            <td>${row.count.toLocaleString()}</td>
            <td><span style="color:#00b573;font-weight:600;">${row.popular}</span></td>
        </tr>
    `).join('');
}

// ==================== EVENT HANDLERS ====================

function onAccessPeriodChange(value) {
    accessPeriod = value;
    updateStats();
    updateAccessTable();
}

function onSearchPeriodChange(value) {
    searchPeriod = value;
    updateStats();
    updateSearchTable();
}

function downloadReport(type) {
    const period = type === 'access' ? accessPeriod : searchPeriod;
    alert(`ดาวน์โหลดรายงาน${type === 'access' ? 'การเข้าถึงระบบ' : 'การค้นหา'} (${getPeriodLabel(period)}) - Demo`);
}

// ==================== INITIALIZATION ====================

function initReports() {
    updateStats();
    updateAccessTable();
    updateSearchTable();
}

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', initReports);
