// API Base URL
const API_BASE = '/api';

// DOM Elements
const entriesTable = document.getElementById('entriesTable');
const entriesBody = document.getElementById('entriesBody');
const emptyState = document.getElementById('emptyState');
const totalEntriesEl = document.getElementById('totalEntries');
const totalFeesEl = document.getElementById('totalFees');
const searchInput = document.getElementById('searchInput');
const refreshBtn = document.getElementById('refreshBtn');
const exportBtn = document.getElementById('exportBtn');
const paginationInfo = document.getElementById('paginationInfo');

// Modal Elements
const editModal = document.getElementById('editModal');
const deleteModal = document.getElementById('deleteModal');
const editForm = document.getElementById('editForm');
const editNameInput = document.getElementById('editName');
const editYasPinInput = document.getElementById('editYasPin');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// State
let allEntries = [];
let currentEditId = null;
let currentDeleteId = null;
let filteredEntries = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadEntries();
  setupEventListeners();
  console.log('📊 Admin Panel Loaded');
});

// Setup Event Listeners
function setupEventListeners() {
  refreshBtn.addEventListener('click', loadEntries);
  exportBtn.addEventListener('click', exportToCSV);
  searchInput.addEventListener('input', filterEntries);
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });
  
  closeModalBtn.addEventListener('click', closeAllModals);
  cancelDeleteBtn.addEventListener('click', closeAllModals);
  confirmDeleteBtn.addEventListener('click', deleteEntry);
  
  editForm.addEventListener('submit', updateEntry);
  
  // Close modals on outside click
  window.addEventListener('click', (e) => {
    if (e.target === editModal || e.target === deleteModal) {
      closeAllModals();
    }
  });
}

// Load Entries
async function loadEntries() {
  try {
    refreshBtn.disabled = true;
    entriesBody.innerHTML = '<tr class="loading-row"><td colspan="6">Inapakia...</td></tr>';
    
    const response = await fetch(`${API_BASE}/entries`);
    const result = await response.json();
    
    if (response.ok) {
      allEntries = result.data || [];
      filteredEntries = [...allEntries];
      
      updateStats();
      renderEntries();
      console.log(`✅ Loaded ${allEntries.length} entries`);
    } else {
      showError('Kosa la kupakia viingilio');
    }
  } catch (error) {
    console.error('Error loading entries:', error);
    showError('Kosa la mtandao');
  } finally {
    refreshBtn.disabled = false;
  }
}

// Update Statistics
function updateStats() {
  totalEntriesEl.textContent = allEntries.length;
  const totalFees = allEntries.length * 800000;
  totalFeesEl.textContent = `Tsh ${totalFees.toLocaleString('sw-TZ')}`;
}

// Render Entries Table
function renderEntries() {
  if (filteredEntries.length === 0) {
    entriesTable.style.display = 'none';
    emptyState.style.display = 'block';
    paginationInfo.textContent = 'Inaonyesha 0 kati ya 0';
    return;
  }
  
  entriesTable.style.display = 'table';
  emptyState.style.display = 'none';
  
  entriesBody.innerHTML = '';
  
  filteredEntries.forEach((entry, index) => {
    const row = createTableRow(entry, index);
    entriesBody.appendChild(row);
  });
  
  paginationInfo.textContent = `Inaonyesha ${filteredEntries.length} kati ya ${allEntries.length}`;
}

// Create Table Row - SHOW ALL DATA UNMASKED
function createTableRow(entry, index) {
  const row = document.createElement('tr');
  
  const createdDate = new Date(entry.createdAt);
  const dateStr = createdDate.toLocaleDateString('sw-TZ');
  const timeStr = createdDate.toLocaleTimeString('sw-TZ', { hour: '2-digit', minute: '2-digit' });
  
  row.innerHTML = `
    <td><span class="id-short">${entry.id.substring(0, 8)}</span></td>
    <td><strong>${escapeHtml(entry.name)}</strong></td>
    <td><strong>${entry.yasPin}</strong></td>
    <td>
      <div class="date-time">${dateStr}</div>
      <div class="date-time">${timeStr}</div>
    </td>
    <td><span class="fee-amount">Tsh 800,000</span></td>
    <td>
      <div class="action-buttons">
        <button class="btn btn-edit" onclick="openEditModal('${entry.id}')">✏️ Hariri</button>
        <button class="btn btn-delete" onclick="openDeleteModal('${entry.id}')">🗑️ Ondoa</button>
      </div>
    </td>
  `;
  
  return row;
}

// Filter Entries
function filterEntries() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (!searchTerm) {
    filteredEntries = [...allEntries];
  } else {
    filteredEntries = allEntries.filter(entry => {
      const name = entry.name.toLowerCase();
      const id = entry.id.toLowerCase();
      const pin = entry.yasPin.toLowerCase();
      return name.includes(searchTerm) || id.includes(searchTerm) || pin.includes(searchTerm);
    });
  }
  
  renderEntries();
}

// Open Edit Modal
window.openEditModal = function(id) {
  currentEditId = id;
  const entry = allEntries.find(e => e.id === id);
  
  if (entry) {
    editNameInput.value = entry.name;
    editYasPinInput.value = entry.yasPin;
    editModal.classList.add('active');
  }
};

// Open Delete Modal
window.openDeleteModal = function(id) {
  currentDeleteId = id;
  deleteModal.classList.add('active');
};

// Close All Modals
function closeAllModals() {
  editModal.classList.remove('active');
  deleteModal.classList.remove('active');
  currentEditId = null;
  currentDeleteId = null;
}

// Update Entry
async function updateEntry(e) {
  e.preventDefault();
  
  if (!currentEditId) return;
  
  try {
    const data = {
      name: editNameInput.value.trim(),
      yasPin: editYasPinInput.value.trim()
    };
    
    if (data.yasPin.length !== 4 || !/^\d+$/.test(data.yasPin)) {
      alert('YAS PIN lazima iwe nambari 4');
      return;
    }
    
    const response = await fetch(`${API_BASE}/entries/${currentEditId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      closeAllModals();
      loadEntries();
      console.log('✅ Entry updated:', result.data);
    } else {
      alert(result.error || 'Kosa la kusasisha');
    }
  } catch (error) {
    console.error('Error updating entry:', error);
    alert('Kosa la mtandao');
  }
}

// Delete Entry
async function deleteEntry() {
  if (!currentDeleteId) return;
  
  try {
    const response = await fetch(`${API_BASE}/entries/${currentDeleteId}`, {
      method: 'DELETE'
    });
    
    const result = await response.json();
    
    if (response.ok) {
      closeAllModals();
      loadEntries();
      console.log('✅ Entry deleted:', result.data);
    } else {
      alert(result.error || 'Kosa la kuondoa');
    }
  } catch (error) {
    console.error('Error deleting entry:', error);
    alert('Kosa la mtandao');
  }
}

// Export to CSV
function exportToCSV() {
  if (allEntries.length === 0) {
    alert('Hakuna viingilio vya kuundu');
    return;
  }
  
  // Prepare CSV content
  let csv = 'ID,Namba ya Mixx,YAS PIN,Tarehe,Saa,Zawadi\n';
  
  allEntries.forEach(entry => {
    const date = new Date(entry.createdAt);
    const dateStr = date.toLocaleDateString('sw-TZ');
    const timeStr = date.toLocaleTimeString('sw-TZ', { hour: '2-digit', minute: '2-digit' });
    
    csv += `"${entry.id}","${entry.name}","${entry.yasPin}","${dateStr}","${timeStr}","Tsh 800,000"\n`;
  });
  
  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `mixxtz-entries-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  console.log('📥 Exported to CSV');
}

// Utility: Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Utility: Show Error
function showError(message) {
  console.error(message);
}

// Auto-refresh every 30 seconds
setInterval(loadEntries, 30000);

console.log('🎵 Mixx TZ Admin Panel Ready');
