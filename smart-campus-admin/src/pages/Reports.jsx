import { useState } from 'react';
import { Download, TrendingUp, Users, Building2, Calendar, Clock, Search as SearchIcon } from 'lucide-react';
import { Button } from '../components/ui';
import Card from '../components/ui/Card';

const periodOptions = [
    { value: '7', label: '7 วัน' },
    { value: '30', label: '30 วัน' },
    { value: '365', label: '1 ปี' },
];

// Report data for different periods
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
    },
    activities: {
        '7': [
            { name: 'User 001', action: 'ค้นหา CPE-203', time: 'วันนี้ 10:21', type: 'search' },
            { name: 'Admin', action: 'แก้ไขอาคาร CPE', time: 'วันนี้ 09:58', type: 'edit' },
            { name: 'User 002', action: 'ค้นหา EN-105', time: 'วันนี้ 09:15', type: 'search' },
            { name: 'User 003', action: 'ค้นหา BA-101', time: 'เมื่อวาน 16:42', type: 'search' },
            { name: 'Admin', action: 'เพิ่มห้อง CPE-405', time: 'เมื่อวาน 14:30', type: 'add' },
            { name: 'User 004', action: 'ค้นหา CPE-301', time: 'เมื่อวาน 11:20', type: 'search' },
        ],
        '30': [
            { name: 'User 001', action: 'ค้นหา CPE-203', time: '29 ม.ค. 10:21', type: 'search' },
            { name: 'Admin', action: 'เพิ่มอาคาร ศูนย์เรียนรู้', time: '28 ม.ค. 15:30', type: 'add' },
            { name: 'User 015', action: 'ค้นหา EN-205', time: '27 ม.ค. 09:15', type: 'search' },
            { name: 'Admin', action: 'แก้ไขอาคาร EN', time: '25 ม.ค. 14:00', type: 'edit' },
            { name: 'User 022', action: 'ค้นหา BA-201', time: '23 ม.ค. 16:45', type: 'search' },
            { name: 'Admin', action: 'ลบห้อง OLD-101', time: '20 ม.ค. 10:00', type: 'delete' },
        ],
        '365': [
            { name: 'สรุปปี 2026', action: 'ผู้ใช้ใหม่ 4,250 คน', time: 'ม.ค. 2026', type: 'summary' },
            { name: 'สรุปปี 2025', action: 'ผู้ใช้ใหม่ 3,800 คน', time: 'ธ.ค. 2025', type: 'summary' },
            { name: 'อัพเดทระบบ', action: 'v2.0 - เพิ่มแผนที่ 3D', time: 'พ.ย. 2025', type: 'system' },
            { name: 'อัพเดทระบบ', action: 'v1.5 - ปรับ UI ใหม่', time: 'ส.ค. 2025', type: 'system' },
            { name: 'เปิดใช้งาน', action: 'Smart Campus เริ่มใช้งาน', time: 'ม.ค. 2025', type: 'system' },
        ]
    }
};

export default function Reports() {
    const [period, setPeriod] = useState('7');

    const accessData = reportData.access[period];
    const searchData = reportData.search[period];
    const activities = reportData.activities[period];

    const getPeriodLabel = (p) => {
        switch (p) {
            case '7': return '7 วัน';
            case '30': return '30 วัน';
            case '365': return '1 ปี';
            default: return '7 วัน';
        }
    };

    const handleDownload = (type) => {
        alert(`ดาวน์โหลดรายงาน${type === 'access' ? 'การเข้าถึงระบบ' : 'การค้นหา'} (${getPeriodLabel(period)}) - Demo`);
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'search': return 'bg-emerald-100 text-emerald-600';
            case 'edit': return 'bg-blue-100 text-blue-600';
            case 'add': return 'bg-green-100 text-green-600';
            case 'delete': return 'bg-red-100 text-red-600';
            case 'summary': return 'bg-purple-100 text-purple-600';
            case 'system': return 'bg-amber-100 text-amber-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getActivityLabel = (type) => {
        switch (type) {
            case 'search': return 'ค้นหา';
            case 'edit': return 'แก้ไข';
            case 'add': return 'เพิ่ม';
            case 'delete': return 'ลบ';
            case 'summary': return 'สรุป';
            case 'system': return 'ระบบ';
            default: return 'อื่นๆ';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-card p-6 border-t-4 border-indigo-400">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">รายงาน</h1>
                            <p className="text-gray-500 text-sm">ข้อมูลย้อนหลัง {getPeriodLabel(period)}</p>
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

            {/* Stats Cards - Compact with Color Accents */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-card border-l-4 border-emerald-400 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xl font-bold text-slate-800">{accessData.total.toLocaleString()}</p>
                            <p className="text-slate-500 text-sm">การเข้าถึงระบบ</p>
                        </div>
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-medium">~{accessData.avgPerDay}/วัน</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-card border-l-4 border-blue-400 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                            <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xl font-bold text-slate-800">{searchData.total.toLocaleString()}</p>
                            <p className="text-slate-500 text-sm">การค้นหาอาคาร/ห้อง</p>
                        </div>
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-medium">{searchData.change}</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-card border-l-4 border-violet-400 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg">
                            <Users className="w-5 h-5 text-violet-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xl font-bold text-slate-800">{accessData.newUsers.toLocaleString()}</p>
                            <p className="text-slate-500 text-sm">ผู้ใช้ใหม่</p>
                        </div>
                        <span className="text-xs text-violet-600 bg-violet-50 px-2 py-1 rounded font-medium">~{accessData.avgNewPerDay}/วัน</span>
                    </div>
                </div>
            </div>

            {/* Reports Grid - 2 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Access Report */}
                <div className="bg-white rounded-2xl shadow-card overflow-hidden border-t-4 border-emerald-400">
                    <div className="flex items-center justify-between p-5 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-emerald-100 rounded-lg">
                                <TrendingUp className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">การเข้าถึงระบบ</h3>
                                <p className="text-xs text-slate-500">สถิติผู้ใช้งานรายวัน</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDownload('access')}
                            className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
                            title="ดาวน์โหลด CSV"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {accessData.rows.map((row, idx) => (
                            <div key={idx} className="flex items-center justify-between px-5 py-3 hover:bg-emerald-50/30 transition-colors">
                                <span className="text-slate-600">{row.date}</span>
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-emerald-600 tabular-nums">{row.access.toLocaleString()}</span>
                                    <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded font-medium">+{row.newUsers}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search Report */}
                <div className="bg-white rounded-2xl shadow-card overflow-hidden border-t-4 border-amber-400">
                    <div className="flex items-center justify-between p-5 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-amber-100 rounded-lg">
                                <SearchIcon className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">การค้นหาอาคาร/ห้อง</h3>
                                <p className="text-xs text-slate-500">สถิติการค้นหารายวัน</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDownload('search')}
                            className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-colors"
                            title="ดาวน์โหลด CSV"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {searchData.rows.map((row, idx) => (
                            <div key={idx} className="flex items-center justify-between px-5 py-3 hover:bg-amber-50/30 transition-colors">
                                <span className="text-slate-600">{row.date}</span>
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-amber-600 tabular-nums">{row.count.toLocaleString()}</span>
                                    <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-600 rounded font-medium">{row.popular}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden border-l-4 border-violet-400">
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-violet-100/80 to-purple-50 border-b border-violet-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg shadow-sm">
                            <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">กิจกรรมล่าสุด</h3>
                            <p className="text-xs text-violet-600">ประวัติการใช้งานระบบ</p>
                        </div>
                    </div>
                    <span className="text-sm text-violet-600 bg-violet-100 px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {getPeriodLabel(period)}
                    </span>
                </div>
                <div className="p-5">
                    <div className="space-y-3">
                        {activities.map((activity, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200 group">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform ${getActivityIcon(activity.type)}`}>
                                    {activity.type === 'search' ? <SearchIcon className="w-4 h-4" /> :
                                        activity.type === 'summary' ? <TrendingUp className="w-4 h-4" /> :
                                            <span className="text-sm">{activity.name.charAt(0)}</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-slate-800">{activity.name}</p>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getActivityIcon(activity.type)}`}>
                                            {getActivityLabel(activity.type)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500">{activity.action}</p>
                                </div>
                                <span className="text-xs text-slate-400 whitespace-nowrap bg-slate-100 px-2 py-1 rounded">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

