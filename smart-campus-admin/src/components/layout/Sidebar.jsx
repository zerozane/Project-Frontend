import { NavLink } from 'react-router-dom';

const navItems = [
    { path: '/', label: 'Dashboard', emoji: '🏠' },
    { path: '/buildings', label: 'จัดการอาคาร/ห้อง', emoji: '🏢' },
    { path: '/users', label: 'จัดการผู้ใช้งาน', emoji: '👥' },
    { path: '/reports', label: 'รายงาน', emoji: '📊' },
    { path: '/feedback', label: 'ข้อเสนอแนะ/รายงาน', emoji: '💬' },
];

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-[72px] bottom-0 w-[260px] bg-gradient-to-b from-white to-slate-50 overflow-y-auto z-40 shadow-[2px_0_20px_rgba(0,0,0,0.08)] border-r border-slate-200">
            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {navItems.map(({ path, label, emoji }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 font-semibold'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-600'
                            }`
                        }
                    >
                        <span className="text-xl">{emoji}</span>
                        <span className="font-medium text-sm">{label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
