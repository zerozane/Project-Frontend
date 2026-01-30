import { useState } from 'react';
import { User, Plus, Edit, Search, Lock, Unlock } from 'lucide-react';
import { Button, Modal, Input, Badge } from '../components/ui';

// Initial users data (like old vanilla version)
const initialUsers = [
    { id: 1, code: 'ADM-001', name: 'ผู้ดูแลระบบ', email: 'admin@rmutt.ac.th', role: 'admin', status: 'active' },
    { id: 2, code: 'STF-001', name: 'สมชาย ใจดี', email: 'somchai@mail.rmutt.ac.th', role: 'staff', status: 'active' },
    { id: 3, code: 'STF-002', name: 'สมหญิง รักเรียน', email: 'somying@mail.rmutt.ac.th', role: 'staff', status: 'disabled' },
    { id: 4, code: 'STF-003', name: 'ประยุทธ์ จันทร์โอชา', email: 'prayuth@mail.rmutt.ac.th', role: 'staff', status: 'active' },
];

export default function Users() {
    const [users, setUsers] = useState(initialUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Form state
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        email: '',
        role: 'staff',
        status: 'active'
    });

    // Toggle user status (block/unblock)
    const toggleStatus = (id) => {
        setUsers(users.map(u =>
            u.id === id ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } : u
        ));
    };

    // Open modal for add/edit
    const openModal = (user = null) => {
        setEditingUser(user);
        if (user) {
            setFormData({
                code: user.code,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            });
        } else {
            setFormData({
                code: '',
                name: '',
                email: '',
                role: 'staff',
                status: 'active'
            });
        }
        setIsModalOpen(true);
    };

    // Save user
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.code || !formData.name || !formData.email) {
            alert('กรุณากรอกข้อมูลให้ครบ');
            return;
        }

        if (editingUser) {
            // Edit existing user
            setUsers(users.map(u =>
                u.id === editingUser.id
                    ? { ...u, ...formData }
                    : u
            ));
        } else {
            // Add new user
            const newId = Math.max(...users.map(u => u.id), 0) + 1;
            setUsers([...users, { id: newId, ...formData }]);
        }
        setIsModalOpen(false);
    };

    // Delete user
    const handleDelete = (id) => {
        if (window.confirm('ยืนยันการลบผู้ใช้นี้?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    // Filter users
    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-card p-6 border-t-4 border-emerald-400">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">จัดการผู้ใช้งาน</h1>
                            <p className="text-gray-500 text-sm">เพิ่ม แก้ไข และจัดการสิทธิ์ผู้ใช้</p>
                        </div>
                    </div>
                    <Button onClick={() => openModal()} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-md">
                        <Plus className="w-5 h-5" />
                        เพิ่มผู้ใช้งาน
                    </Button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="ค้นหา ชื่อ, รหัสผู้ใช้, อีเมล..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-sm min-w-[120px] transition-all"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">ทั้งหมด</option>
                    <option value="active">ใช้งานปกติ</option>
                    <option value="disabled">ถูกระงับ</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden border-t-4 border-violet-400">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ชื่อผู้ใช้</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">อีเมล</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600" style={{ width: '120px' }}>สิทธิ์</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600" style={{ width: '100px' }}>สถานะ</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600" style={{ width: '140px' }}>การกระทำ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">{user.name}</div>
                                                <div className="text-sm text-gray-400">{user.code}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4">
                                        {user.role === 'admin' ? (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 whitespace-nowrap">
                                                🛡️ Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 whitespace-nowrap">
                                                👤 Staff
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full ${user.status === 'active' ? 'bg-blue-500' : 'bg-red-500'}`}
                                            />
                                            <span className={user.status === 'active' ? 'text-gray-700' : 'text-red-600'}>
                                                {user.status === 'active' ? 'ปกติ' : 'ระงับ'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => toggleStatus(user.id)}
                                                className={`p-2 rounded-lg transition-colors ${user.status === 'active'
                                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                                    }`}
                                                title={user.status === 'active' ? 'ระงับผู้ใช้' : 'เปิดใช้งาน'}
                                            >
                                                {user.status === 'active' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => openModal(user)}
                                                className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                                title="แก้ไข"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>ไม่พบข้อมูลผู้ใช้</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingUser ? 'แก้ไขข้อมูล' : 'เพิ่มผู้ใช้งาน'}
            >
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผู้ใช้ *</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="เช่น ADM-002"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ-นามสกุล *</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="กรอกชื่อ"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล *</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="email@rmutt.ac.th"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">สิทธิ์การใช้งาน</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">สถานะ</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="active">ปกติ</option>
                            <option value="disabled">ระงับ</option>
                        </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                            ยกเลิก
                        </Button>
                        <Button type="submit" className="flex-1">
                            บันทึก
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
