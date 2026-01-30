/**
 * Dashboard Page Logic
 * Handles chart and statistics display with global period selector
 */

// Current selected period
let currentPeriod = '7';

// Dashboard data for different time periods
const dashboardData = {
    '7': {
        periodLabel: 'ข้อมูลย้อนหลัง 7 วัน',
        users: { value: 128, delta: '+8%' },
        searches: { value: 1234, delta: '+8%' },
        topBuilding: { name: 'ภาควิชาวิศวกรรมคอมพิวเตอร์', count: 842 },
        chart: {
            labels: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
            data: [84, 64, 74, 88, 70, 30, 25]
        },
        proportions: {
            labels: ['วิศวกรรมคอมพิวเตอร์', 'อาคาร EN', 'บริหารธุรกิจ', 'อื่นๆ'],
            data: [320, 289, 210, 415],
            colors: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6']
        },
        activities: [
            { datetime: 'วันนี้ 10:21', user: '001', action: 'ค้นหา', target: 'CPE-203' },
            { datetime: 'วันนี้ 09:58', user: 'admin', action: 'แก้ไขอาคาร', target: 'CPE' },
            { datetime: 'วันนี้ 09:15', user: '002', action: 'ค้นหา', target: 'CPE-105' },
            { datetime: 'เมื่อวาน 16:42', user: '003', action: 'เปิดแผนที่', target: 'CPE' },
            { datetime: 'เมื่อวาน 14:30', user: '004', action: 'ค้นหา', target: 'EN-101' }
        ]
    },
    '30': {
        periodLabel: 'ข้อมูลย้อนหลัง 30 วัน',
        users: { value: 2450, delta: '+12%' },
        searches: { value: 8520, delta: '+15%' },
        topBuilding: { name: 'ภาควิชาวิศวกรรมคอมพิวเตอร์', count: 3256 },
        chart: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [1850, 2100, 2340, 2230]
        },
        proportions: {
            labels: ['วิศวกรรมคอมพิวเตอร์', 'อาคาร EN', 'บริหารธุรกิจ', 'อื่นๆ'],
            data: [3256, 2890, 1420, 970],
            colors: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6']
        },
        activities: [
            { datetime: '29 ม.ค. 10:21', user: '001', action: 'ค้นหา', target: 'CPE-203' },
            { datetime: '28 ม.ค. 15:30', user: 'admin', action: 'เพิ่มอาคาร', target: 'ศูนย์เรียนรู้' },
            { datetime: '27 ม.ค. 09:15', user: '015', action: 'ค้นหา', target: 'EN-205' },
            { datetime: '25 ม.ค. 11:20', user: '008', action: 'เปิดแผนที่', target: 'คณะวิทย์' },
            { datetime: '22 ม.ค. 14:45', user: 'admin', action: 'แก้ไขห้อง', target: 'CPE-101' },
            { datetime: '20 ม.ค. 08:30', user: '022', action: 'ค้นหา', target: 'ห้องสมุด' }
        ]
    },
    '365': {
        periodLabel: 'ข้อมูลย้อนหลัง 1 ปี',
        users: { value: 28500, delta: '+45%' },
        searches: { value: 156780, delta: '+52%' },
        topBuilding: { name: 'ภาควิชาวิศวกรรมคอมพิวเตอร์', count: 42150 },
        chart: {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
            data: [12500, 11800, 14200, 8500, 6200, 9800, 15600, 18200, 16400, 14800, 15200, 13580]
        },
        proportions: {
            labels: ['วิศวกรรมคอมพิวเตอร์', 'อาคาร EN', 'บริหารธุรกิจ', 'อื่นๆ'],
            data: [42150, 38900, 28500, 47230],
            colors: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6']
        },
        activities: [
            { datetime: 'ม.ค. 2026', user: 'รวม 3,250 คน', action: 'ค้นหา', target: '45,200 ครั้ง' },
            { datetime: 'ธ.ค. 2025', user: 'รวม 2,980 คน', action: 'ค้นหา', target: '38,500 ครั้ง' },
            { datetime: 'พ.ย. 2025', user: 'รวม 2,850 คน', action: 'ค้นหา', target: '35,200 ครั้ง' },
            { datetime: 'ต.ค. 2025', user: 'รวม 2,620 คน', action: 'ค้นหา', target: '32,100 ครั้ง' },
            { datetime: 'ก.ย. 2025', user: 'รวม 2,450 คน', action: 'ค้นหา', target: '28,900 ครั้ง' }
        ]
    }
};

let searchChart = null;
let statusChart = null;

// Initialize search chart
function initChart() {
    const ctx = document.getElementById('searchChart');
    if (!ctx) return;

    const data = dashboardData['7'];

    searchChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: data.chart.labels,
            datasets: [{
                label: 'จำนวนการค้นหา',
                data: data.chart.data,
                backgroundColor: '#f59e42',
                borderRadius: 6,
                maxBarThickness: 32
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            },
            scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true, grid: { color: '#eee' } }
            }
        }
    });
}

// Initialize search proportion donut chart
function initStatusChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;

    const data = dashboardData['7'];
    const total = data.proportions.data.reduce((a, b) => a + b, 0);

    statusChart = new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: data.proportions.labels,
            datasets: [{
                data: data.proportions.data,
                backgroundColor: data.proportions.colors,
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value.toLocaleString()} ครั้ง (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [{
            id: 'centerText',
            beforeDraw: function (chart) {
                const ctx = chart.ctx;
                const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.font = 'bold 18px Inter, sans-serif';
                ctx.fillStyle = '#f59e0b';
                ctx.fillText(total.toLocaleString(), centerX, centerY - 4);

                ctx.font = '10px Inter, sans-serif';
                ctx.fillStyle = '#9ca3af';
                ctx.fillText('ครั้ง', centerX, centerY + 12);

                ctx.restore();
            }
        }]
    });
}

// Global period selector - updates ALL dashboard sections
function setGlobalPeriod(period) {
    currentPeriod = period;
    const data = dashboardData[period];

    // Update period buttons
    document.querySelectorAll('.period-btn').forEach(btn => {
        if (btn.dataset.period === period) {
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary', 'active');
        } else {
            btn.classList.remove('btn-primary', 'active');
            btn.classList.add('btn-outline');
        }
    });

    // Update period label
    const periodLabel = document.getElementById('periodLabel');
    if (periodLabel) periodLabel.textContent = data.periodLabel;

    // Update period text
    const periodText = period === '7' ? '7 วัน' : period === '30' ? '30 วัน' : '1 ปี';

    // Update cards
    const usersTitle = document.getElementById('usersCardTitle');
    const usersValue = document.getElementById('usersCardValue');
    if (usersTitle) usersTitle.textContent = `ผู้ใช้งาน (${periodText})`;
    if (usersValue) usersValue.innerHTML = `${data.users.value.toLocaleString()} <span class="delta">${data.users.delta}</span>`;

    const searchTitle = document.getElementById('searchCardTitle');
    const searchValue = document.getElementById('searchCardValue');
    if (searchTitle) searchTitle.textContent = `การค้นหา (${periodText})`;
    if (searchValue) searchValue.innerHTML = `${data.searches.value.toLocaleString()} <span class="delta">${data.searches.delta}</span>`;

    const topBuildingName = document.getElementById('topBuildingName');
    const topBuildingCount = document.getElementById('topBuildingCount');
    if (topBuildingName) topBuildingName.textContent = data.topBuilding.name;
    if (topBuildingCount) topBuildingCount.textContent = `${data.topBuilding.count.toLocaleString()} ครั้ง`;

    // Update chart
    if (searchChart) {
        searchChart.data.labels = data.chart.labels;
        searchChart.data.datasets[0].data = data.chart.data;
        searchChart.update();
    }
    const chartTitle = document.getElementById('chartTitle');
    if (chartTitle) chartTitle.textContent = `ปริมาณการค้นหา (${periodText})`;

    // Update donut chart
    if (statusChart) {
        statusChart.data.labels = data.proportions.labels;
        statusChart.data.datasets[0].data = data.proportions.data;
        statusChart.data.datasets[0].backgroundColor = data.proportions.colors;
        statusChart.update();
    }

    // Update activity table
    const activityTitle = document.getElementById('activityTitle');
    if (activityTitle) activityTitle.textContent = `กิจกรรมล่าสุด (${periodText})`;

    const activityBody = document.getElementById('activityTableBody');
    if (activityBody) {
        activityBody.innerHTML = data.activities.map(act => `
            <tr>
                <td>${act.datetime}</td>
                <td>${act.user}</td>
                <td>${act.action}</td>
                <td>${act.target}</td>
            </tr>
        `).join('');
    }
}

// Initialize dashboard
function initDashboard() {
    initChart();
    initStatusChart();
    setGlobalPeriod('7'); // Initialize with 7-day data
}

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', initDashboard);

