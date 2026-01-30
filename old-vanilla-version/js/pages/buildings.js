/**
 * Buildings Page Logic
 * Handles building, department, and room management
 * 
 * PERMISSIONS:
 * - Admin: Full access (add, edit, delete buildings/departments/rooms)
 * - Staff: Full access (add, edit, delete buildings/departments/rooms)
 * Both roles have equal permissions for facility management.
 */

// Data store - will be synced with backend when ready
const data = {
    buildings: [],
    departments: [],
    rooms: []
};

// ==================== DATA PERSISTENCE ====================

function loadDataFromStorage() {
    try {
        const stored = localStorage.getItem('facilityData');
        if (stored) {
            const parsed = JSON.parse(stored);
            data.buildings = parsed.buildings || [];
            data.departments = parsed.departments || [];
            data.rooms = parsed.rooms || [];
        }
    } catch (e) {
        console.warn('โหลดข้อมูลจาก storage ไม่สำเร็จ', e);
    }
}

function saveDataToStorage() {
    try {
        localStorage.setItem('facilityData', JSON.stringify(data));
    } catch (e) {
        console.warn('บันทึกข้อมูลลง storage ไม่สำเร็จ', e);
    }
}

// ==================== BUILDING SELECT OPTIONS ====================

function updateBuildingSelects() {
    const selects = ['departmentBuilding', 'roomBuilding'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        const currentValue = select.value;
        select.innerHTML = '<option value="">-- เลือกอาคาร --</option>';
        data.buildings.forEach(building => {
            const option = document.createElement('option');
            option.value = building.id;
            option.textContent = building.name;
            select.appendChild(option);
        });
        select.value = currentValue;
    });
}

// ==================== TREE VIEW ====================

function toggleTree(event) {
    event.stopPropagation();
    const toggle = event.target;
    const nodeDiv = toggle.closest('.tree-node, .tree-node-sub, .tree-leaf');
    const content = nodeDiv.nextElementSibling;

    if (content && content.classList.contains('tree-content')) {
        content.classList.toggle('collapsed');
        toggle.textContent = content.classList.contains('collapsed') ? '▶' : '▼';
    }
}

function updateDepartmentsTable() {
    const container = document.getElementById('departmentsTree');
    if (!container) return;
    container.innerHTML = '';

    data.buildings.forEach(building => {
        const depts = data.departments.filter(d => d.buildingId === building.id);
        const rooms = data.rooms.filter(r => r.buildingId === building.id);

        const buildingDiv = document.createElement('div');
        buildingDiv.className = 'tree-item';

        const header = document.createElement('div');
        header.className = 'tree-node';
        header.innerHTML = `
      <span class="tree-toggle" onclick="toggleTree(event)">▼</span>
      <span class="tree-icon">🏢</span>
      <span class="tree-label">${building.name}</span>
      <span class="tree-info">(${building.lat}, ${building.lng})</span>
      <div class="tree-actions">
        <button class="btn btn-warning btn-tiny" onclick="editBuilding(${building.id})" title="แก้ไข">✎</button>
        <button class="btn btn-danger btn-tiny" onclick="deleteBuildingItem(${building.id})" title="ลบ">🗑</button>
      </div>
    `;

        const content = document.createElement('div');
        content.className = 'tree-content';

        // Rooms without department
        const roomsWithoutDept = rooms.filter(room => {
            return !data.departments.some(dept => dept.buildingId === building.id);
        });
        roomsWithoutDept.forEach(room => {
            const roomDiv = document.createElement('div');
            roomDiv.className = 'tree-leaf';
            roomDiv.innerHTML = `
        <span class="tree-icon">🚪</span>
        <span class="tree-label">${room.name}</span>
        <span class="tree-info">(ชั้น ${room.floor}, ${room.number || 'N/A'})</span>
        <div class="tree-actions">
          <button class="btn btn-warning btn-tiny" onclick="editRoom(${room.id})" title="แก้ไข">✎</button>
          <button class="btn btn-danger btn-tiny" onclick="deleteRoomItem(${room.id})" title="ลบ">🗑</button>
        </div>
      `;
            content.appendChild(roomDiv);
        });

        depts.forEach(dept => {
            const deptDiv = document.createElement('div');
            deptDiv.className = 'tree-subitem';

            const deptHeader = document.createElement('div');
            deptHeader.className = 'tree-node-sub';
            deptHeader.innerHTML = `
        <span class="tree-toggle" onclick="toggleTree(event)">▼</span>
        <span class="tree-icon">📋</span>
        <span class="tree-label">${dept.name}</span>
        <div class="tree-actions">
          <button class="btn btn-warning btn-tiny" onclick="editDepartment(${dept.id})" title="แก้ไข">✎</button>
          <button class="btn btn-danger btn-tiny" onclick="deleteDepartmentItem(${dept.id})" title="ลบ">🗑</button>
        </div>
      `;

            const deptContent = document.createElement('div');
            deptContent.className = 'tree-content';

            const deptRooms = rooms.filter(r => r.buildingId === building.id);
            deptRooms.forEach(room => {
                const roomDiv = document.createElement('div');
                roomDiv.className = 'tree-leaf';
                roomDiv.innerHTML = `
          <span class="tree-icon">🚪</span>
          <span class="tree-label">${room.name}</span>
          <span class="tree-info">(ชั้น ${room.floor}, ${room.number || 'N/A'})</span>
          <div class="tree-actions">
            <button class="btn btn-warning btn-tiny" onclick="editRoom(${room.id})" title="แก้ไข">✎</button>
            <button class="btn btn-danger btn-tiny" onclick="deleteRoomItem(${room.id})" title="ลบ">🗑</button>
          </div>
        `;
                deptContent.appendChild(roomDiv);
            });

            deptDiv.appendChild(deptHeader);
            deptDiv.appendChild(deptContent);
            content.appendChild(deptDiv);
        });

        buildingDiv.appendChild(header);
        buildingDiv.appendChild(content);
        container.appendChild(buildingDiv);
    });
}

// ==================== BUILDING CRUD ====================

function openBuildingModal() {
    document.getElementById('buildingName').value = '';
    document.getElementById('buildingLat').value = '';
    document.getElementById('buildingLng').value = '';
    document.getElementById('buildingModal').classList.add('active');
}

function closeBuildingModal() {
    document.getElementById('buildingModal').classList.remove('active');
}

function saveBuildingModal(event) {
    event.preventDefault();
    const building = {
        id: Math.max(...data.buildings.map(b => b.id), 0) + 1,
        name: document.getElementById('buildingName').value,
        lat: document.getElementById('buildingLat').value,
        lng: document.getElementById('buildingLng').value
    };
    data.buildings.push(building);
    closeBuildingModal();
    updateDepartmentsTable();
    updateBuildingSelects();
    saveDataToStorage();
}

function editBuilding(id) {
    const building = data.buildings.find(b => b.id === id);
    document.getElementById('buildingName').value = building.name;
    document.getElementById('buildingLat').value = building.lat;
    document.getElementById('buildingLng').value = building.lng;
    document.getElementById('buildingModal').classList.add('active');
}

function deleteBuildingItem(id) {
    if (confirm('คุณแน่ใจหรือว่าต้องการลบ?')) {
        data.buildings = data.buildings.filter(b => b.id !== id);
        updateDepartmentsTable();
        updateBuildingSelects();
        saveDataToStorage();
    }
}

// ==================== DEPARTMENT CRUD ====================

function openDepartmentModal() {
    document.getElementById('departmentName').value = '';
    document.getElementById('departmentBuilding').value = '';
    document.getElementById('departmentModal').classList.add('active');
}

function closeDepartmentModal() {
    document.getElementById('departmentModal').classList.remove('active');
}

function saveDepartmentModal(event) {
    event.preventDefault();
    const department = {
        id: Math.max(...data.departments.map(d => d.id), 0) + 1,
        name: document.getElementById('departmentName').value,
        buildingId: parseInt(document.getElementById('departmentBuilding').value)
    };
    data.departments.push(department);
    closeDepartmentModal();
    updateDepartmentsTable();
    saveDataToStorage();
}

function editDepartment(id) {
    const dept = data.departments.find(d => d.id === id);
    document.getElementById('departmentName').value = dept.name;
    document.getElementById('departmentBuilding').value = dept.buildingId;
    document.getElementById('departmentModal').classList.add('active');
    setTimeout(() => {
        document.getElementById('departmentName').focus();
    }, 50);
}

function deleteDepartmentItem(id) {
    if (confirm('คุณแน่ใจหรือว่าต้องการลบ?')) {
        data.departments = data.departments.filter(d => d.id !== id);
        updateDepartmentsTable();
        saveDataToStorage();
    }
}

// ==================== ROOM CRUD ====================

function openRoomModal() {
    document.getElementById('roomName').value = '';
    document.getElementById('roomBuilding').value = '';
    document.getElementById('roomFloor').value = '';
    document.getElementById('roomNumber').value = '';
    document.getElementById('roomDescription').value = '';
    document.getElementById('roomImagePreview').innerHTML = '';
    document.getElementById('roomModal').classList.add('active');
}

function closeRoomModal() {
    document.getElementById('roomModal').classList.remove('active');
}

function saveRoomModal(event) {
    event.preventDefault();
    const room = {
        id: Math.max(...data.rooms.map(r => r.id), 0) + 1,
        name: document.getElementById('roomName').value,
        buildingId: parseInt(document.getElementById('roomBuilding').value),
        floor: parseInt(document.getElementById('roomFloor').value),
        number: document.getElementById('roomNumber').value,
        description: document.getElementById('roomDescription').value
    };
    data.rooms.push(room);
    closeRoomModal();
    updateDepartmentsTable();
    saveDataToStorage();
}

function editRoom(id) {
    const room = data.rooms.find(r => r.id === id);
    document.getElementById('roomName').value = room.name;
    document.getElementById('roomBuilding').value = room.buildingId;
    document.getElementById('roomFloor').value = room.floor;
    document.getElementById('roomNumber').value = room.number;
    document.getElementById('roomDescription').value = room.description;
    document.getElementById('roomModal').classList.add('active');
}

function deleteRoomItem(id) {
    if (confirm('คุณแน่ใจหรือว่าต้องการลบ?')) {
        data.rooms = data.rooms.filter(r => r.id !== id);
        updateDepartmentsTable();
        saveDataToStorage();
    }
}

// ==================== INITIALIZATION ====================

function initBuildings() {
    loadDataFromStorage();
    updateDepartmentsTable();
    updateBuildingSelects();
}

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', initBuildings);
