import { useState } from 'react';
import { Building2, Plus, Edit, Trash2, ChevronDown, ChevronRight, Users, DoorOpen, MapPin } from 'lucide-react';
import { Button, Modal, Input } from '../components/ui';

// Initial data with hierarchical structure
const initialData = {
    buildings: [
        { id: 1, name: 'อาคาร A', lat: '13.9896', lng: '100.6148' },
        { id: 2, name: 'อาคาร B', lat: '13.9898', lng: '100.6150' },
        { id: 3, name: 'อาคาร C', lat: '13.9900', lng: '100.6152' },
    ],
    departments: [
        { id: 1, name: 'คณะวิศวกรรมศาสตร์', buildingId: 1 },
        { id: 2, name: 'คณะวิทยาศาสตร์', buildingId: 1 },
        { id: 3, name: 'คณะบริหารธุรกิจ', buildingId: 2 },
    ],
    rooms: [
        { id: 1, name: 'ห้องปฏิบัติการคอมพิวเตอร์ 1', buildingId: 1, departmentId: 1, floor: 1, number: '101', email: '' },
        { id: 2, name: 'ห้องประชุม A', buildingId: 1, departmentId: 1, floor: 2, number: '201', email: '' },
        { id: 3, name: 'ห้องเรียน B101', buildingId: 2, departmentId: 3, floor: 1, number: '101', email: '' },
        { id: 4, name: 'ห้องพักอาจารย์', buildingId: 2, departmentId: 3, floor: 2, number: '202', email: '' },
        { id: 5, name: 'ห้องสมุด', buildingId: 3, departmentId: null, floor: 1, number: '101', email: '' },
    ],
};

export default function Buildings() {
    const [data, setData] = useState(initialData);
    const [expandedBuildings, setExpandedBuildings] = useState(new Set([1, 2, 3]));
    const [expandedDepartments, setExpandedDepartments] = useState(new Set([1, 2, 3]));

    // Modal states
    const [buildingModalOpen, setBuildingModalOpen] = useState(false);
    const [departmentModalOpen, setDepartmentModalOpen] = useState(false);
    const [roomModalOpen, setRoomModalOpen] = useState(false);

    // Form states
    const [editingBuilding, setEditingBuilding] = useState(null);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [editingRoom, setEditingRoom] = useState(null);

    // Form data states
    const [buildingForm, setBuildingForm] = useState({ name: '', lat: '', lng: '' });
    const [departmentForm, setDepartmentForm] = useState({ name: '', buildingId: '' });
    const [roomForm, setRoomForm] = useState({ name: '', buildingId: '', departmentId: '', floor: '', number: '', email: '' });

    // Image states for room
    const [floorPlanImage, setFloorPlanImage] = useState(null);
    const [roomImages, setRoomImages] = useState([]);

    // Handle floor plan image
    const handleFloorPlanChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('ไฟล์ต้องมีขนาดไม่เกิน 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFloorPlanImage({ file, preview: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle room images (multiple)
    const handleRoomImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (roomImages.length + files.length > 4) {
            alert('สามารถอัพโหลดได้ไม่เกิน 4 รูป');
            return;
        }

        files.forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                alert(`ไฟล์ ${file.name} มีขนาดเกิน 5MB`);
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setRoomImages(prev => [...prev, { file, preview: reader.result, id: Date.now() + Math.random() }]);
            };
            reader.readAsDataURL(file);
        });
    };

    // Remove room image
    const removeRoomImage = (id) => {
        setRoomImages(prev => prev.filter(img => img.id !== id));
    };

    // Toggle functions
    const toggleBuilding = (id) => {
        const newExpanded = new Set(expandedBuildings);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedBuildings(newExpanded);
    };

    const toggleDepartment = (id) => {
        const newExpanded = new Set(expandedDepartments);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedDepartments(newExpanded);
    };

    // Open modal functions
    const openBuildingModal = (building = null) => {
        setEditingBuilding(building);
        setBuildingForm(building ? { name: building.name, lat: building.lat, lng: building.lng } : { name: '', lat: '', lng: '' });
        setBuildingModalOpen(true);
    };

    const openDepartmentModal = (department = null, preselectedBuildingId = null) => {
        setEditingDepartment(department);
        setDepartmentForm(department
            ? { name: department.name, buildingId: department.buildingId.toString() }
            : { name: '', buildingId: preselectedBuildingId ? preselectedBuildingId.toString() : '' }
        );
        setDepartmentModalOpen(true);
    };

    const openRoomModal = (room = null, preselectedBuildingId = null, preselectedDeptId = null) => {
        setEditingRoom(room);
        // Reset images when opening modal
        setFloorPlanImage(null);
        setRoomImages([]);
        setRoomForm(room
            ? {
                name: room.name,
                buildingId: room.buildingId.toString(),
                departmentId: room.departmentId ? room.departmentId.toString() : '',
                floor: room.floor.toString(),
                number: room.number,
                email: room.email || ''
            }
            : {
                name: '',
                buildingId: preselectedBuildingId ? preselectedBuildingId.toString() : '',
                departmentId: preselectedDeptId ? preselectedDeptId.toString() : '',
                floor: '',
                number: '',
                email: ''
            }
        );
        setRoomModalOpen(true);
    };

    // SAVE functions
    const saveBuilding = (e) => {
        e.preventDefault();
        if (!buildingForm.name || !buildingForm.lat || !buildingForm.lng) {
            alert('กรุณากรอกข้อมูลให้ครบ');
            return;
        }

        if (editingBuilding) {
            // Edit existing
            setData({
                ...data,
                buildings: data.buildings.map(b =>
                    b.id === editingBuilding.id
                        ? { ...b, name: buildingForm.name, lat: buildingForm.lat, lng: buildingForm.lng }
                        : b
                ),
            });
        } else {
            // Add new
            const newId = Math.max(...data.buildings.map(b => b.id), 0) + 1;
            setData({
                ...data,
                buildings: [...data.buildings, { id: newId, name: buildingForm.name, lat: buildingForm.lat, lng: buildingForm.lng }],
            });
            // Expand new building
            setExpandedBuildings(new Set([...expandedBuildings, newId]));
        }
        setBuildingModalOpen(false);
    };

    const saveDepartment = (e) => {
        e.preventDefault();
        if (!departmentForm.name || !departmentForm.buildingId) {
            alert('กรุณากรอกข้อมูลให้ครบ');
            return;
        }

        const buildingId = parseInt(departmentForm.buildingId);

        if (editingDepartment) {
            // Edit existing
            setData({
                ...data,
                departments: data.departments.map(d =>
                    d.id === editingDepartment.id
                        ? { ...d, name: departmentForm.name, buildingId: buildingId }
                        : d
                ),
            });
        } else {
            // Add new
            const newId = Math.max(...data.departments.map(d => d.id), 0) + 1;
            setData({
                ...data,
                departments: [...data.departments, { id: newId, name: departmentForm.name, buildingId: buildingId }],
            });
            // Expand new department
            setExpandedDepartments(new Set([...expandedDepartments, newId]));
        }
        setDepartmentModalOpen(false);
    };

    const saveRoom = (e) => {
        e.preventDefault();
        if (!roomForm.name || !roomForm.buildingId || !roomForm.floor) {
            alert('กรุณากรอกข้อมูลให้ครบ');
            return;
        }

        const buildingId = parseInt(roomForm.buildingId);
        const departmentId = roomForm.departmentId ? parseInt(roomForm.departmentId) : null;
        const floor = parseInt(roomForm.floor);

        if (editingRoom) {
            // Edit existing
            setData({
                ...data,
                rooms: data.rooms.map(r =>
                    r.id === editingRoom.id
                        ? { ...r, name: roomForm.name, buildingId, departmentId, floor, number: roomForm.number, email: roomForm.email }
                        : r
                ),
            });
        } else {
            // Add new
            const newId = Math.max(...data.rooms.map(r => r.id), 0) + 1;
            setData({
                ...data,
                rooms: [...data.rooms, { id: newId, name: roomForm.name, buildingId, departmentId, floor, number: roomForm.number, email: roomForm.email }],
            });
        }
        setRoomModalOpen(false);
    };

    // DELETE functions
    const handleDeleteBuilding = (id) => {
        if (window.confirm('ยืนยันการลบอาคารนี้? (หน่วยงานและห้องภายในจะถูกลบด้วย)')) {
            setData({
                ...data,
                buildings: data.buildings.filter(b => b.id !== id),
                departments: data.departments.filter(d => d.buildingId !== id),
                rooms: data.rooms.filter(r => r.buildingId !== id),
            });
        }
    };

    const handleDeleteDepartment = (id) => {
        if (window.confirm('ยืนยันการลบหน่วยงานนี้?')) {
            setData({
                ...data,
                departments: data.departments.filter(d => d.id !== id),
                rooms: data.rooms.map(r => r.departmentId === id ? { ...r, departmentId: null } : r),
            });
        }
    };

    const handleDeleteRoom = (id) => {
        if (window.confirm('ยืนยันการลบห้องนี้?')) {
            setData({
                ...data,
                rooms: data.rooms.filter(r => r.id !== id),
            });
        }
    };

    // Get departments filtered by selected building in room form
    const getDepartmentsForBuilding = (buildingId) => {
        if (!buildingId) return [];
        return data.departments.filter(d => d.buildingId === parseInt(buildingId));
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Modern Header */}
            <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 rounded-2xl shadow-card p-6 border border-slate-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">จัดการอาคาร/ห้อง</h1>
                            <p className="text-slate-500 text-sm">เพิ่ม แก้ไข และจัดการข้อมูลสถานที่</p>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Button onClick={() => openBuildingModal()} className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4" />
                            อาคาร
                        </Button>
                        <Button variant="outline" onClick={() => openDepartmentModal()} className="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
                            <Plus className="w-4 h-4" />
                            หน่วยงาน
                        </Button>
                        <Button variant="outline" onClick={() => openRoomModal()} className="border-amber-300 text-amber-600 hover:bg-amber-50">
                            <Plus className="w-4 h-4" />
                            ห้อง
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tree View */}
            <div className="bg-white rounded-2xl shadow-card p-6">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Building2 className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800">โครงสร้างอาคาร</h2>
                        <p className="text-xs text-slate-500">{data.buildings.length} อาคาร • {data.departments.length} หน่วยงาน • {data.rooms.length} ห้อง</p>
                    </div>
                </div>
                <div className="space-y-3">
                    {data.buildings.map((building) => {
                        const isExpanded = expandedBuildings.has(building.id);
                        const departments = data.departments.filter(d => d.buildingId === building.id);
                        const buildingRooms = data.rooms.filter(r => r.buildingId === building.id);

                        return (
                            <div key={building.id} className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors">
                                {/* Building Node */}
                                <div
                                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-slate-50 cursor-pointer hover:from-blue-100 hover:to-slate-100 transition-all"
                                    onClick={() => toggleBuilding(building.id)}
                                >
                                    <button
                                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-blue-200 rounded transition-colors"
                                        onClick={(e) => { e.stopPropagation(); toggleBuilding(building.id); }}
                                    >
                                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    </button>
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                                        <Building2 className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="font-semibold text-slate-800">{building.name}</span>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <MapPin className="w-3 h-3" />
                                            <span>{building.lat}, {building.lng}</span>
                                            <span className="text-slate-300">•</span>
                                            <span>{departments.length} หน่วยงาน</span>
                                            <span className="text-slate-300">•</span>
                                            <span>{buildingRooms.length} ห้อง</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <button
                                            className="p-2 rounded-lg hover:bg-emerald-100 text-slate-400 hover:text-emerald-600 transition-colors"
                                            onClick={(e) => { e.stopPropagation(); openDepartmentModal(null, building.id); }}
                                            title="เพิ่มหน่วยงาน"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="p-2 rounded-lg hover:bg-amber-100 text-slate-400 hover:text-amber-600 transition-colors"
                                            onClick={(e) => { e.stopPropagation(); openBuildingModal(building); }}
                                            title="แก้ไข"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="p-2 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                                            onClick={(e) => { e.stopPropagation(); handleDeleteBuilding(building.id); }}
                                            title="ลบ"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Building Content */}
                                {isExpanded && (
                                    <div className="border-t border-slate-100 bg-slate-50/50 py-2 px-4">
                                        {/* Departments */}
                                        {departments.map((dept) => {
                                            const isDeptExpanded = expandedDepartments.has(dept.id);
                                            const deptRooms = buildingRooms.filter(r => r.departmentId === dept.id);

                                            return (
                                                <div key={dept.id} className="my-2">
                                                    {/* Department Node */}
                                                    <div
                                                        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
                                                        onClick={() => toggleDepartment(dept.id)}
                                                    >
                                                        <button
                                                            className="w-5 h-5 flex items-center justify-center text-slate-500 hover:bg-emerald-200 rounded transition-colors"
                                                            onClick={(e) => { e.stopPropagation(); toggleDepartment(dept.id); }}
                                                        >
                                                            {isDeptExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                                        </button>
                                                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                                                            <Users className="w-4 h-4 text-emerald-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="font-medium text-slate-700">{dept.name}</span>
                                                            <span className="text-xs text-slate-400 ml-2">({deptRooms.length} ห้อง)</span>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <button
                                                                className="p-1.5 rounded hover:bg-blue-100 text-slate-400 hover:text-blue-600 transition-colors"
                                                                onClick={(e) => { e.stopPropagation(); openRoomModal(null, building.id, dept.id); }}
                                                                title="เพิ่มห้อง"
                                                            >
                                                                <Plus className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                className="p-1.5 rounded hover:bg-amber-100 text-slate-400 hover:text-amber-600 transition-colors"
                                                                onClick={(e) => { e.stopPropagation(); openDepartmentModal(dept); }}
                                                                title="แก้ไข"
                                                            >
                                                                <Edit className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                className="p-1.5 rounded hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                                                                onClick={(e) => { e.stopPropagation(); handleDeleteDepartment(dept.id); }}
                                                                title="ลบ"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Department Rooms */}
                                                    {isDeptExpanded && (
                                                        <div className="ml-6 mt-2 space-y-1.5">
                                                            {deptRooms.map((room) => (
                                                                <div
                                                                    key={room.id}
                                                                    className="flex items-center gap-3 p-2.5 bg-white border border-slate-100 rounded-lg hover:border-amber-200 hover:bg-amber-50/30 transition-all"
                                                                >
                                                                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                                                                        <DoorOpen className="w-3.5 h-3.5 text-amber-600" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <span className="font-medium text-slate-600 text-sm">{room.name}</span>
                                                                        <span className="text-xs text-slate-400 ml-2">ชั้น {room.floor} • {room.number || 'N/A'}</span>
                                                                    </div>
                                                                    <div className="flex gap-1">
                                                                        <button
                                                                            className="p-1.5 rounded hover:bg-amber-100 text-slate-400 hover:text-amber-600 transition-colors"
                                                                            onClick={() => openRoomModal(room)}
                                                                            title="แก้ไข"
                                                                        >
                                                                            <Edit className="w-3.5 h-3.5" />
                                                                        </button>
                                                                        <button
                                                                            className="p-1.5 rounded hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                                                                            onClick={() => handleDeleteRoom(room.id)}
                                                                            title="ลบ"
                                                                        >
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {deptRooms.length === 0 && (
                                                                <p className="text-sm text-slate-400 italic py-2 px-3">ยังไม่มีห้องในหน่วยงานนี้</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        {/* Rooms without department (direct under building) */}
                                        {buildingRooms.filter(r => !r.departmentId).length > 0 && (
                                            <div className="my-3 p-3 bg-slate-100/50 rounded-lg">
                                                <p className="text-xs font-medium text-slate-500 mb-2">ห้องอื่นๆ (ไม่สังกัดหน่วยงาน)</p>
                                                <div className="space-y-1.5">
                                                    {buildingRooms.filter(r => !r.departmentId).map((room) => (
                                                        <div
                                                            key={room.id}
                                                            className="flex items-center gap-3 p-2.5 bg-white border border-slate-100 rounded-lg hover:border-amber-200 hover:bg-amber-50/30 transition-all"
                                                        >
                                                            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                                                                <DoorOpen className="w-3.5 h-3.5 text-amber-600" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <span className="font-medium text-slate-600 text-sm">{room.name}</span>
                                                                <span className="text-xs text-slate-400 ml-2">ชั้น {room.floor} • {room.number || 'N/A'}</span>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <button
                                                                    className="p-1.5 rounded hover:bg-amber-100 text-slate-400 hover:text-amber-600 transition-colors"
                                                                    onClick={() => openRoomModal(room)}
                                                                    title="แก้ไข"
                                                                >
                                                                    <Edit className="w-3.5 h-3.5" />
                                                                </button>
                                                                <button
                                                                    className="p-1.5 rounded hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                                                                    onClick={() => handleDeleteRoom(room.id)}
                                                                    title="ลบ"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {departments.length === 0 && buildingRooms.length === 0 && (
                                            <p className="text-sm text-slate-400 italic py-3 px-2">ยังไม่มีหน่วยงานหรือห้องในอาคารนี้</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {data.buildings.length === 0 && (
                        <div className="text-center py-16 text-slate-400">
                            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                                <Building2 className="w-8 h-8 opacity-50" />
                            </div>
                            <p className="font-medium text-slate-500">ยังไม่มีข้อมูลอาคาร</p>
                            <p className="text-sm mt-1">เริ่มต้นด้วยการเพิ่มอาคารแรกของคุณ</p>
                            <Button className="mt-4" onClick={() => openBuildingModal()}>
                                <Plus className="w-4 h-4" />
                                เพิ่มอาคาร
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Building Modal */}
            <Modal
                isOpen={buildingModalOpen}
                onClose={() => setBuildingModalOpen(false)}
                title={editingBuilding ? 'แก้ไขอาคาร' : 'เพิ่มอาคาร'}
            >
                <form className="space-y-4" onSubmit={saveBuilding}>
                    <Input
                        label="ชื่ออาคาร *"
                        placeholder="เช่น อาคาร A"
                        value={buildingForm.name}
                        onChange={(e) => setBuildingForm({ ...buildingForm, name: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="พิกัดละติจูด *"
                            placeholder="เช่น 13.7563"
                            value={buildingForm.lat}
                            onChange={(e) => setBuildingForm({ ...buildingForm, lat: e.target.value })}
                        />
                        <Input
                            label="พิกัดลองจิจูด *"
                            placeholder="เช่น 100.5018"
                            value={buildingForm.lng}
                            onChange={(e) => setBuildingForm({ ...buildingForm, lng: e.target.value })}
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setBuildingModalOpen(false)}>
                            ยกเลิก
                        </Button>
                        <Button type="submit" className="flex-1">
                            {editingBuilding ? 'บันทึก' : 'เพิ่ม'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Department Modal */}
            <Modal
                isOpen={departmentModalOpen}
                onClose={() => setDepartmentModalOpen(false)}
                title={editingDepartment ? 'แก้ไขหน่วยงาน' : 'เพิ่มหน่วยงาน'}
            >
                <form className="space-y-4" onSubmit={saveDepartment}>
                    <Input
                        label="ชื่อหน่วยงาน *"
                        placeholder="เช่น คณะวิศวกรรมศาสตร์"
                        value={departmentForm.name}
                        onChange={(e) => setDepartmentForm({ ...departmentForm, name: e.target.value })}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">เลือกอาคาร *</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={departmentForm.buildingId}
                            onChange={(e) => setDepartmentForm({ ...departmentForm, buildingId: e.target.value })}
                        >
                            <option value="">-- เลือกอาคาร --</option>
                            {data.buildings.map(b => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setDepartmentModalOpen(false)}>
                            ยกเลิก
                        </Button>
                        <Button type="submit" className="flex-1">
                            {editingDepartment ? 'บันทึก' : 'เพิ่ม'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Room Modal */}
            <Modal
                isOpen={roomModalOpen}
                onClose={() => setRoomModalOpen(false)}
                title={editingRoom ? 'แก้ไขห้อง' : 'เพิ่มห้อง'}
            >
                <form className="space-y-4" onSubmit={saveRoom}>
                    <Input
                        label="ชื่อห้อง/สำนักงาน *"
                        placeholder="เช่น ห้องประชุม A"
                        value={roomForm.name}
                        onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">เลือกอาคาร *</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                value={roomForm.buildingId}
                                onChange={(e) => setRoomForm({ ...roomForm, buildingId: e.target.value, departmentId: '' })}
                            >
                                <option value="">-- เลือกอาคาร --</option>
                                {data.buildings.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">เลือกหน่วยงาน (ถ้ามี)</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                value={roomForm.departmentId}
                                onChange={(e) => setRoomForm({ ...roomForm, departmentId: e.target.value })}
                                disabled={!roomForm.buildingId}
                            >
                                <option value="">-- ไม่สังกัดหน่วยงาน --</option>
                                {getDepartmentsForBuilding(roomForm.buildingId).map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="ชั้น *"
                            type="number"
                            placeholder="1"
                            value={roomForm.floor}
                            onChange={(e) => setRoomForm({ ...roomForm, floor: e.target.value })}
                        />
                        <Input
                            label="หมายเลขห้อง"
                            placeholder="เช่น 101"
                            value={roomForm.number}
                            onChange={(e) => setRoomForm({ ...roomForm, number: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">E-mail ผู้รับผิดชอบห้อง</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                            rows={2}
                            placeholder="example@email.com"
                            value={roomForm.email}
                            onChange={(e) => setRoomForm({ ...roomForm, email: e.target.value })}
                        />
                    </div>

                    {/* Floor Plan Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">รูปแผนผังชั้น</label>
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                            onClick={() => document.getElementById('roomFloorPlan')?.click()}
                        >
                            {floorPlanImage ? (
                                <div className="relative inline-block">
                                    <img src={floorPlanImage.preview} alt="Floor Plan" className="max-h-32 rounded-lg mx-auto" />
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setFloorPlanImage(null); }}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-gray-500">คลิกเพื่ออัพโหลด หรือ ลากไฟล์มาปล่อย</p>
                                    <p className="text-sm text-gray-400 mt-1">(JPG, PNG ไม่เกิน 5MB)</p>
                                </>
                            )}
                        </div>
                        <input type="file" id="roomFloorPlan" accept="image/jpeg,image/png" className="hidden" onChange={handleFloorPlanChange} />
                    </div>

                    {/* Room Images Upload (Multiple) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">รูปห้อง (ไม่เกิน 4 รูป)</label>
                        <div
                            className={`border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all ${roomImages.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => roomImages.length < 4 && document.getElementById('roomImages')?.click()}
                        >
                            <p className="text-gray-500">คลิกเพื่ออัพโหลด ({roomImages.length}/4 รูป)</p>
                            <p className="text-sm text-gray-400 mt-1">(JPG, PNG ไม่เกิน 5MB ต่อรูป)</p>
                        </div>
                        <input type="file" id="roomImages" accept="image/jpeg,image/png" multiple className="hidden" onChange={handleRoomImagesChange} />

                        {/* Image Previews */}
                        {roomImages.length > 0 && (
                            <div className="flex gap-3 flex-wrap mt-3">
                                {roomImages.map((img) => (
                                    <div key={img.id} className="relative">
                                        <img src={img.preview} alt="Room" className="w-20 h-20 object-cover rounded-lg border" />
                                        <button
                                            type="button"
                                            onClick={() => removeRoomImage(img.id)}
                                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setRoomModalOpen(false)}>
                            ยกเลิก
                        </Button>
                        <Button type="submit" className="flex-1">
                            {editingRoom ? 'บันทึก' : 'เพิ่ม'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
