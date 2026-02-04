import { useState } from 'react';
import { Users, Building2, Search, TrendingUp, Eye, UserPlus, MapPin, LayoutDashboard, CalendarDays } from 'lucide-react';
import { StatCard } from '../components/ui/Card';
import { BarChart, DonutChart } from '../components/charts';

const periodOptions = [
    { value: '7', label: '7 วัน' },
    { value: '30', label: '30 วัน' },
    { value: '365', label: '1 ปี' },
];

// Combined Dashboard + Reports data
const dashboardData = {
    '7': {
        periodLabel: 'ข้อมูลย้อนหลัง 7 วัน',
        users: { value: 128, delta: '+8%' },
        searches: { value: 1234, delta: '+8%' },
        access: { value: 4820, avgPerDay: 160 },
        newUsers: { value: 86, avgPerDay: 3 },
        topBuilding: { name: 'ภาควิชาวิศวกรรมคอมพิวเตอร์', count: 842 },
        chart: {
            labels: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
            data: [84, 64, 74, 88, 70, 30, 25]
        },
        searchByType: [
            { name: 'วิศวกรรมคอมพิวเตอร์', value: 320 },
            { name: 'อาคาร EN', value: 289 },
            { name: 'บริหารธุรกิจ', value: 210 },
            { name: 'อื่นๆ', value: 415 },
        ],
        popularSearches: [
            { room: 'CPE-203', building: 'อาคาร CPE', count: 156 },
            { room: 'EN-105', building: 'อาคาร EN', count: 134 },
            { room: 'CPE-301', building: 'อาคาร CPE', count: 98 },
            { room: 'BA-101', building: 'อาคาร BA', count: 86 },
            { room: 'EN-205', building: 'อาคาร EN', count: 72 },
        ],
        activities: [
            { name: 'User 001', action: 'ค้นหา CPE-203', time: 'วันนี้ 10:21', type: 'search' },
            { name: 'Admin', action: 'แก้ไขอาคาร CPE', time: 'วันนี้ 09:58', type: 'login' },
            { name: 'User 002', action: 'ค้นหา CPE-105', time: 'วันนี้ 09:15', type: 'search' },
        ]
    },
    '30': {
        periodLabel: 'ข้อมูลย้อนหลัง 30 วัน',
        users: { value: 2450, delta: '+12%' },
        searches: { value: 8520, delta: '+15%' },
        access: { value: 18450, avgPerDay: 615 },
        newUsers: { value: 342, avgPerDay: 11 },
        topBuilding: { name: 'ภาควิชาวิศวกรรมคอมพิวเตอร์', count: 3256 },
        chart: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [1850, 2100, 2340, 2230]
        },
        searchByType: [
            { name: 'วิศวกรรมคอมพิวเตอร์', value: 3256 },
            { name: 'อาคาร EN', value: 2890 },
            { name: 'บริหารธุรกิจ', value: 1420 },
            { name: 'อื่นๆ', value: 970 },
        ],
        popularSearches: [
            { room: 'CPE-203', building: 'อาคาร CPE', count: 1234 },
            { room: 'EN-105', building: 'อาคาร EN', count: 986 },
            { room: 'CPE-301', building: 'อาคาร CPE', count: 756 },
            { room: 'BA-101', building: 'อาคาร BA', count: 642 },
            { room: 'EN-205', building: 'อาคาร EN', count: 534 },
        ],
        activities: [
            { name: 'User 001', action: 'ค้นหา CPE-203', time: '29 ม.ค. 10:21', type: 'search' },
            { name: 'Admin', action: 'เพิ่มอาคาร ศูนย์เรียนรู้', time: '28 ม.ค. 15:30', type: 'login' },
            { name: 'User 015', action: 'ค้นหา EN-205', time: '27 ม.ค. 09:15', type: 'search' },
        ]
    },
    '365': {
        periodLabel: 'ข้อมูลย้อนหลัง 1 ปี',
        users: { value: 28500, delta: '+45%' },
        searches: { value: 156780, delta: '+52%' },
        access: { value: 215680, avgPerDay: 591 },
        newUsers: { value: 4250, avgPerDay: 12 },
        topBuilding: { name: 'ภาควิชาวิศวกรรมคอมพิวเตอร์', count: 42150 },
        chart: {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
            data: [12500, 11800, 14200, 8500, 6200, 9800, 15600, 18200, 16400, 14800, 15200, 13580]
        },
        searchByType: [
            { name: 'วิศวกรรมคอมพิวเตอร์', value: 42150 },
            { name: 'อาคาร EN', value: 38900 },
            { name: 'บริหารธุรกิจ', value: 28500 },
            { name: 'อื่นๆ', value: 47230 },
        ],
        popularSearches: [
            { room: 'CPE-203', building: 'อาคาร CPE', count: 15680 },
            { room: 'EN-105', building: 'อาคาร EN', count: 12450 },
            { room: 'CPE-301', building: 'อาคาร CPE', count: 9870 },
            { room: 'BA-101', building: 'อาคาร BA', count: 8650 },
            { room: 'EN-205', building: 'อาคาร EN', count: 7230 },
        ],
        activities: [
            { name: 'รวม 3,250 คน', action: 'ค้นหา 45,200 ครั้ง', time: 'ม.ค. 2026', type: 'search' },
            { name: 'รวม 2,980 คน', action: 'ค้นหา 38,500 ครั้ง', time: 'ธ.ค. 2025', type: 'search' },
            { name: 'รวม 2,850 คน', action: 'ค้นหา 35,200 ครั้ง', time: 'พ.ย. 2025', type: 'search' },
        ]
    }
};

export default function Dashboard() {
    const [period, setPeriod] = useState('7');

    const currentData = dashboardData[period];
    const periodText = period === '7' ? '7 วัน' : period === '30' ? '30 วัน' : '1 ปี';

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-card p-6 border-t-4 border-sky-400">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                            <LayoutDashboard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                            <p className="text-gray-500 text-sm flex items-center gap-1.5">
                                <CalendarDays className="w-4 h-4" />
                                {currentData.periodLabel}
                            </p>
                        </div>
                    </div>

                    {/* Period Selector */}
                    <div className="flex gap-1 bg-slate-100 p-1.5 rounded-xl">
                        {periodOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setPeriod(opt.value)}
                                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${period === opt.value
                                    ? 'bg-white text-slate-800 shadow-md'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Cards - Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="การเข้าถึงระบบ"
                    value={currentData.access.value.toLocaleString()}
                    icon={Eye}
                    trend="up"
                    trendValue={`~${currentData.access.avgPerDay}/วัน`}
                    variant="primary"
                />
                <StatCard
                    title={`การค้นหา (${periodText})`}
                    value={currentData.searches.value.toLocaleString()}
                    icon={Search}
                    trend="up"
                    trendValue={currentData.searches.delta}
                    variant="warning"
                />
                <StatCard
                    title="ผู้ใช้งาน"
                    value={currentData.users.value.toLocaleString()}
                    icon={Users}
                    trend="up"
                    trendValue={currentData.users.delta}
                    variant="info"
                />
                <StatCard
                    title="ผู้ใช้ใหม่"
                    value={currentData.newUsers.value.toLocaleString()}
                    icon={UserPlus}
                    trend="up"
                    trendValue={`~${currentData.newUsers.avgPerDay}/วัน`}
                    variant="danger"
                />
            </div>

            {/* Top Building Card */}
            <div className="bg-white rounded-2xl shadow-card p-5 border-l-4 border-indigo-500 hover:shadow-elevated transition-all duration-300">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl">
                        <Building2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-slate-500 text-sm">🏆 อาคารที่ถูกค้นหามากที่สุด ({periodText})</p>
                        <h3 className="text-xl font-bold text-slate-800">{currentData.topBuilding.name}</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">{currentData.topBuilding.count.toLocaleString()}</p>
                        <p className="text-sm text-slate-400">ครั้ง</p>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-card p-6 hover:shadow-elevated transition-all duration-300 border-t-4 border-amber-400">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">ปริมาณการค้นหา ({periodText})</h3>
                            <p className="text-sm text-slate-500">จำนวนการค้นหา {periodText} ล่าสุด</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-md shadow-amber-500/30">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <BarChart
                        key={`bar-${period}`}
                        labels={currentData.chart.labels}
                        datasets={[{
                            label: 'การค้นหา',
                            data: currentData.chart.data,
                            backgroundColor: 'rgba(245, 158, 11, 0.85)',
                        }]}
                        height={280}
                    />
                </div>

                {/* Donut Chart */}
                <div className="bg-white rounded-2xl shadow-card p-6 hover:shadow-elevated transition-all duration-300 border-t-4 border-violet-400">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">สัดส่วนการค้นหา</h3>
                            <p className="text-sm text-slate-500">แยกตามประเภท</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-md shadow-violet-500/30">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <DonutChart
                        key={`donut-${period}`}
                        labels={currentData.searchByType.map(s => s.name)}
                        data={currentData.searchByType.map(s => s.value)}
                        colors={['rgba(245, 158, 11, 0.9)', 'rgba(99, 102, 241, 0.9)', 'rgba(16, 185, 129, 0.9)', 'rgba(236, 72, 153, 0.9)']}
                        height={260}
                    />
                </div>
            </div>

            {/* Popular Searches */}
            <div className="bg-white rounded-2xl shadow-card p-6 hover:shadow-elevated transition-all duration-300 border-t-4 border-rose-400">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">🔥 ห้องยอดนิยม</h3>
                        <p className="text-sm text-slate-500">ห้องที่ถูกค้นหามากที่สุด ({periodText})</p>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg shadow-md shadow-rose-500/30">
                        <MapPin className="w-5 h-5 text-white" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {currentData.popularSearches.map((item, i) => (
                        <div key={i} className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 group ${i === 0 ? 'bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100' :
                            i === 1 ? 'bg-gradient-to-br from-slate-50 to-gray-100 hover:from-slate-100 hover:to-gray-200' :
                                i === 2 ? 'bg-gradient-to-br from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100' :
                                    i === 3 ? 'bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100' :
                                        'bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100'
                            }`}>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-sm ${i === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
                                i === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-500 text-white' :
                                    i === 2 ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white' :
                                        i === 3 ? 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white' :
                                            'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                                }`}>
                                {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`font-semibold text-slate-800 transition-colors ${i === 0 ? 'group-hover:text-orange-600' :
                                    i === 1 ? 'group-hover:text-slate-600' :
                                        i === 2 ? 'group-hover:text-amber-600' :
                                            i === 3 ? 'group-hover:text-indigo-600' :
                                                'group-hover:text-emerald-600'
                                    }`}>{item.room}</p>
                                <p className="text-xs text-slate-400">{item.building}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${i === 0 ? 'bg-orange-100 text-orange-700' :
                                i === 1 ? 'bg-slate-200 text-slate-700' :
                                    i === 2 ? 'bg-amber-100 text-amber-700' :
                                        i === 3 ? 'bg-indigo-100 text-indigo-700' :
                                            'bg-emerald-100 text-emerald-700'
                                }`}>
                                {item.count.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

