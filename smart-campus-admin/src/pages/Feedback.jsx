import { useState } from 'react';
import { MessageSquare, CheckCircle, Clock, AlertCircle, Search, Eye } from 'lucide-react';
import { Button, Table, Modal, Badge } from '../components/ui';
import Input from '../components/ui/Input';
import { mockData } from '../services/api';

export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState(mockData.feedback);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const statusMap = {
        pending: { label: 'รอดำเนินการ', variant: 'warning', icon: Clock },
        resolved: { label: 'แก้ไขแล้ว', variant: 'success', icon: CheckCircle },
        rejected: { label: 'ปฏิเสธ', variant: 'danger', icon: AlertCircle },
    };

    const categoryMap = {
        bug: { label: 'แจ้งปัญหา', color: 'text-red-500 bg-red-100' },
        compliment: { label: 'ชื่นชม', color: 'text-emerald-500 bg-emerald-100' },
        suggestion: { label: 'ข้อเสนอแนะ', color: 'text-blue-500 bg-blue-100' },
    };

    const columns = [
        {
            key: 'user',
            label: 'ผู้ส่ง',
            render: (value) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-semibold">
                        {value.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-800">{value}</span>
                </div>
            )
        },
        {
            key: 'message',
            label: 'ข้อความ',
            render: (value) => (
                <p className="text-gray-600 truncate max-w-xs">{value}</p>
            )
        },
        {
            key: 'category',
            label: 'หมวดหมู่',
            render: (value) => {
                const cat = categoryMap[value] || categoryMap.suggestion;
                return (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${cat.color}`}>
                        {cat.label}
                    </span>
                );
            }
        },
        {
            key: 'status',
            label: 'สถานะ',
            render: (value) => {
                const status = statusMap[value] || statusMap.pending;
                return <Badge variant={status.variant}>{status.label}</Badge>;
            }
        },
        {
            key: 'date',
            label: 'วันที่',
            render: (value) => <span className="text-gray-500">{value}</span>
        },
        {
            key: 'actions',
            label: '',
            render: (_, row) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); setSelectedFeedback(row); }}
                >
                    <Eye className="w-4 h-4" />
                </Button>
            )
        },
    ];

    const handleStatusChange = (id, status) => {
        setFeedbacks(feedbacks.map(f =>
            f.id === id ? { ...f, status } : f
        ));
        setSelectedFeedback(null);
    };

    const filteredFeedbacks = feedbacks.filter(f => {
        const matchSearch = f.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === 'all' || f.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-card p-6 border-t-4 border-pink-400">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">จัดการ Feedback</h1>
                            <p className="text-gray-500 text-sm">ดูและตอบกลับความคิดเห็นจากผู้ใช้</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4 border-l-4 border-amber-400 hover:shadow-elevated transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                        <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-800">
                            {feedbacks.filter(f => f.status === 'pending').length}
                        </p>
                        <p className="text-gray-500 text-sm">รอดำเนินการ</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4 border-l-4 border-emerald-400 hover:shadow-elevated transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-800">
                            {feedbacks.filter(f => f.status === 'resolved').length}
                        </p>
                        <p className="text-gray-500 text-sm">แก้ไขแล้ว</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4 border-l-4 border-pink-400 hover:shadow-elevated transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl">
                        <MessageSquare className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-800">{feedbacks.length}</p>
                        <p className="text-gray-500 text-sm">ทั้งหมด</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                <div className="flex-1 max-w-sm relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="ค้นหา feedback..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {['all', 'pending', 'resolved'].map((status) => (
                        <button
                            key={status}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === status
                                    ? 'bg-pink-500 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                            onClick={() => setFilterStatus(status)}
                        >
                            {status === 'all' ? 'ทั้งหมด' : statusMap[status]?.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden border-t-4 border-violet-400">
                <Table columns={columns} data={filteredFeedbacks} />
            </div>

            {/* Detail Modal */}
            <Modal
                isOpen={!!selectedFeedback}
                onClose={() => setSelectedFeedback(null)}
                title="รายละเอียด Feedback"
                size="lg"
            >
                {selectedFeedback && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-xl font-semibold">
                                {selectedFeedback.user.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{selectedFeedback.user}</h3>
                                <p className="text-gray-500">{selectedFeedback.date}</p>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-gray-700">{selectedFeedback.message}</p>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleStatusChange(selectedFeedback.id, 'rejected')}
                            >
                                ปฏิเสธ
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => handleStatusChange(selectedFeedback.id, 'resolved')}
                            >
                                <CheckCircle className="w-4 h-4" />
                                แก้ไขแล้ว
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
