---
title: "Roots Admin"
permalink: /roots/admin/
layout: single
author_profile: false
classes: wide
---

<style>
  /* ── Auth gate ─────────────────────────────────────────── */
  #admin-auth-gate {
    text-align: center;
    padding: 3em 1em;
    color: #888;
  }

  #admin-auth-gate .roots-btn {
    font-size: 1.1em;
    padding: 0.6em 1.5em;
    margin-top: 1em;
  }

  #admin-content { display: none; }

  /* ── Layout ────────────────────────────────────────────── */
  .admin-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-bottom: 1em;
    align-items: center;
  }

  .roots-btn {
    padding: 0.4em 0.8em;
    background: #252a34;
    border: 1px solid #444;
    border-radius: 4px;
    color: #e0e0e0;
    cursor: pointer;
    font-size: 0.85em;
  }

  .roots-btn:hover { border-color: #58a6ff; }
  .roots-btn.active { border-color: #58a6ff; background: #1a1f2e; }
  .roots-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .roots-btn.primary {
    background: #1a3a5c;
    border-color: #58a6ff;
  }

  .roots-btn.danger {
    border-color: #ff6b6b;
    color: #ff6b6b;
  }

  .roots-btn.danger:hover {
    background: rgba(255, 107, 107, 0.15);
  }

  /* ── Collection tabs ───────────────────────────────────── */
  .collection-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 1em;
    border-bottom: 2px solid #333;
  }

  .collection-tab {
    padding: 0.6em 1.2em;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: #888;
    cursor: pointer;
    font-size: 0.95em;
    margin-bottom: -2px;
  }

  .collection-tab:hover { color: #e0e0e0; }
  .collection-tab.active {
    color: #58a6ff;
    border-bottom-color: #58a6ff;
  }

  /* ── Filter bar ────────────────────────────────────────── */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-bottom: 1em;
    align-items: center;
  }

  .filter-bar select, .filter-bar input[type="text"] {
    padding: 0.4em 0.6em;
    background: #252a34;
    border: 1px solid #444;
    border-radius: 4px;
    color: #e0e0e0;
    font-size: 0.85em;
  }

  .filter-bar select:focus, .filter-bar input[type="text"]:focus {
    outline: none;
    border-color: #58a6ff;
  }

  /* ── Table ─────────────────────────────────────────────── */
  .admin-table-wrap {
    overflow-x: auto;
    margin-bottom: 1em;
    border: 1px solid #333;
    border-radius: 6px;
  }

  #admin-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85em;
    min-width: 600px;
  }

  #admin-table th {
    background: #1a1f2e;
    color: #58a6ff;
    padding: 0.5em 0.6em;
    text-align: left;
    border-bottom: 2px solid #444;
    position: sticky;
    top: 0;
    white-space: nowrap;
    user-select: none;
  }

  #admin-table th.sortable { cursor: pointer; }
  #admin-table th.sortable:hover { color: #7cc4ff; }

  #admin-table td {
    padding: 0.35em 0.6em;
    border-bottom: 1px solid #333;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #admin-table tr:hover { background: rgba(88, 166, 255, 0.04); }
  #admin-table tr.selected { background: rgba(88, 166, 255, 0.1); }

  #admin-table td[contenteditable="true"] {
    cursor: text;
    outline: none;
    white-space: normal;
    word-break: break-word;
  }

  #admin-table td[contenteditable="true"]:focus {
    background: rgba(88, 166, 255, 0.08);
    outline: 1px solid #58a6ff;
    outline-offset: -1px;
  }

  #admin-table td.changed {
    background: rgba(255, 214, 102, 0.1);
    border-left: 2px solid #ffe66d;
  }

  #admin-table .row-checkbox {
    accent-color: #58a6ff;
  }

  /* ── Bulk edit bar ─────────────────────────────────────── */
  .bulk-bar {
    display: none;
    background: #1a1f2e;
    border: 1px solid #58a6ff;
    border-radius: 6px;
    padding: 0.8em 1em;
    margin-bottom: 1em;
    align-items: center;
    gap: 0.5em;
    flex-wrap: wrap;
  }

  .bulk-bar.visible { display: flex; }

  .bulk-bar select, .bulk-bar input[type="text"] {
    padding: 0.4em 0.6em;
    background: #252a34;
    border: 1px solid #444;
    border-radius: 4px;
    color: #e0e0e0;
    font-size: 0.85em;
  }

  .bulk-bar label {
    color: #aaa;
    font-size: 0.85em;
  }

  /* ── Paste modal ───────────────────────────────────────── */
  .paste-overlay {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 9999;
    align-items: center;
    justify-content: center;
  }

  .paste-overlay.open { display: flex; }

  .paste-modal {
    background: #1e2330;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 1.5em;
    width: 90%;
    max-width: 700px;
    max-height: 80vh;
    overflow-y: auto;
    color: #e0e0e0;
  }

  .paste-modal h3 {
    margin: 0 0 0.5em 0;
    color: #58a6ff;
    font-size: 1.1em;
  }

  .paste-modal p {
    font-size: 0.85em;
    color: #aaa;
    margin: 0 0 1em 0;
  }

  .paste-modal textarea {
    width: 100%;
    min-height: 200px;
    padding: 0.6em;
    background: #252a34;
    border: 1px solid #444;
    border-radius: 4px;
    color: #e0e0e0;
    font-family: monospace;
    font-size: 0.85em;
    resize: vertical;
    box-sizing: border-box;
  }

  .paste-modal textarea:focus {
    outline: none;
    border-color: #58a6ff;
  }

  .paste-modal .paste-actions {
    display: flex;
    gap: 0.5em;
    justify-content: flex-end;
    margin-top: 1em;
  }

  .paste-preview {
    margin-top: 1em;
    font-size: 0.8em;
    color: #aaa;
    max-height: 150px;
    overflow-y: auto;
  }

  .paste-preview table {
    width: 100%;
    border-collapse: collapse;
  }

  .paste-preview th, .paste-preview td {
    padding: 0.3em 0.5em;
    border: 1px solid #333;
    text-align: left;
  }

  .paste-preview th { color: #58a6ff; background: #1a1f2e; }

  /* ── Status bar ────────────────────────────────────────── */
  .status-bar {
    font-size: 0.8em;
    color: #888;
    padding: 0.5em 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .status-bar .unsaved {
    color: #ffe66d;
  }

  /* ── Add column modal ──────────────────────────────────── */
  .add-col-overlay {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 9999;
    align-items: center;
    justify-content: center;
  }

  .add-col-overlay.open { display: flex; }

  .add-col-modal {
    background: #1e2330;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 1.5em;
    width: 90%;
    max-width: 400px;
    color: #e0e0e0;
  }

  .add-col-modal h3 {
    margin: 0 0 1em 0;
    color: #58a6ff;
    font-size: 1.1em;
  }

  .add-col-modal input[type="text"] {
    width: 100%;
    padding: 0.5em;
    background: #252a34;
    border: 1px solid #444;
    border-radius: 4px;
    color: #e0e0e0;
    font-size: 0.9em;
    box-sizing: border-box;
  }

  .add-col-modal input[type="text"]:focus {
    outline: none;
    border-color: #58a6ff;
  }

  .add-col-modal .add-col-actions {
    display: flex;
    gap: 0.5em;
    justify-content: flex-end;
    margin-top: 1em;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 1em;
    color: #58a6ff;
    text-decoration: none;
    font-size: 0.9em;
  }

  .back-link:hover { text-decoration: underline; }
</style>

<!-- Auth gate -->
<div id="admin-auth-gate">
  <h2>Roots Admin</h2>
  <p>Sign in with your admin account to manage Firestore data.</p>
  <button class="roots-btn" id="admin-auth-btn">Sign In with Google</button>
  <div id="admin-auth-status" style="margin-top:1em; font-size:0.85em;"></div>
</div>

<!-- Main admin content (hidden until auth) -->
<div id="admin-content">
  <a href="{{ '/roots/' | relative_url }}" class="back-link">&larr; Back to Roots</a>

  <!-- Collection tabs -->
  <div class="collection-tabs">
    <button class="collection-tab active" data-collection="points">Points</button>
    <button class="collection-tab" data-collection="routes">Routes</button>
  </div>

  <!-- Filter & actions bar -->
  <div class="filter-bar">
    <select id="group-filter">
      <option value="">All groups</option>
    </select>
    <input type="text" id="search-input" placeholder="Search by name..." style="min-width:200px;">
    <span style="flex:1;"></span>
    <button class="roots-btn" id="add-col-btn" title="Add a new metadata column">+ Column</button>
    <button class="roots-btn" id="paste-btn" title="Paste data from Excel/Sheets">Paste from Excel</button>
  </div>

  <!-- Bulk edit bar (visible when rows selected) -->
  <div class="bulk-bar" id="bulk-bar">
    <label><span id="selected-count">0</span> selected</label>
    <select id="bulk-field"></select>
    <input type="text" id="bulk-value" placeholder="New value...">
    <button class="roots-btn primary" id="bulk-apply-btn">Apply</button>
    <button class="roots-btn" id="bulk-clear-btn">Clear Selection</button>
  </div>

  <!-- Data table -->
  <div class="admin-table-wrap">
    <table id="admin-table">
      <thead><tr id="admin-thead-row"></tr></thead>
      <tbody id="admin-tbody"></tbody>
    </table>
  </div>

  <!-- Status bar -->
  <div class="status-bar">
    <span id="table-status">Loading...</span>
    <span>
      <button class="roots-btn primary" id="save-btn" disabled>Save Changes</button>
      <button class="roots-btn" id="discard-btn" disabled>Discard</button>
    </span>
  </div>
</div>

<!-- Paste from Excel modal -->
<div class="paste-overlay" id="paste-overlay">
  <div class="paste-modal">
    <h3>Paste from Excel / Google Sheets</h3>
    <p>Copy cells from a spreadsheet and paste below. First row should be headers. Tab-separated values are auto-detected.</p>
    <textarea id="paste-textarea" placeholder="Paste your data here (Ctrl+V / Cmd+V)..."></textarea>
    <div class="paste-preview" id="paste-preview"></div>
    <div class="paste-actions">
      <button class="roots-btn" id="paste-cancel-btn">Cancel</button>
      <button class="roots-btn primary" id="paste-apply-btn" disabled>Apply to Selected</button>
    </div>
  </div>
</div>

<!-- Add column modal -->
<div class="add-col-overlay" id="add-col-overlay">
  <div class="add-col-modal">
    <h3>Add Metadata Column</h3>
    <label style="display:block; font-size:0.85em; color:#aaa; margin-bottom:0.5em;">Column name (will be stored in metadata)</label>
    <input type="text" id="add-col-name" placeholder="e.g. type, rating, notes...">
    <div class="add-col-actions">
      <button class="roots-btn" id="add-col-cancel-btn">Cancel</button>
      <button class="roots-btn primary" id="add-col-confirm-btn">Add Column</button>
    </div>
  </div>
</div>

<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-storage-compat.js"></script>
<script src="{{ '/assets/js/firebase-config.js' | relative_url }}"></script>

<script>
(function() {
  // ── State ───────────────────────────────────────────────
  let db = null;
  let currentUser = null;
  let currentCollection = 'points';  // 'points' or 'routes'
  let allDocs = [];         // raw Firestore docs: { id, data }
  let filteredDocs = [];    // after filter/search
  let columns = [];         // ordered column names to display
  let changes = {};         // docId -> { field: newValue, ... }
  let selectedIds = new Set();

  // Fixed (non-editable) fields per collection
  const FIXED_FIELDS = {
    points: ['name', 'lat', 'lon', 'url', 'fileName'],
    routes: ['fileName', 'storagePath']
  };

  // Fields we never show in the table
  const HIDDEN_FIELDS = ['gpxContent', 'uploadedAt', 'storagePath'];

  // ── Firebase Init ─────────────────────────────────────
  function initFirebase() {
    if (typeof FIREBASE_CONFIG === 'undefined' || !FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') {
      document.getElementById('admin-auth-status').textContent = 'Firebase not configured.';
      return;
    }

    firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();

    const authBtn = document.getElementById('admin-auth-btn');
    authBtn.addEventListener('click', () => {
      if (currentUser) {
        firebase.auth().signOut();
      } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(err => {
          document.getElementById('admin-auth-status').textContent = 'Sign-in failed: ' + err.message;
        });
      }
    });

    firebase.auth().onAuthStateChanged(user => {
      currentUser = user;
      if (user && user.email === ADMIN_EMAIL) {
        document.getElementById('admin-auth-gate').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
        loadCollection();
      } else if (user) {
        document.getElementById('admin-auth-status').textContent = 'Access denied. This account is not an admin.';
        document.getElementById('admin-auth-btn').textContent = 'Sign Out';
        document.getElementById('admin-auth-btn').onclick = () => firebase.auth().signOut();
      } else {
        document.getElementById('admin-auth-gate').style.display = 'block';
        document.getElementById('admin-content').style.display = 'none';
        document.getElementById('admin-auth-btn').textContent = 'Sign In with Google';
        document.getElementById('admin-auth-status').textContent = '';
      }
    });
  }

  // ── Load Collection ───────────────────────────────────
  function loadCollection() {
    allDocs = [];
    changes = {};
    selectedIds.clear();
    updateBulkBar();
    updateSaveButtons();
    document.getElementById('table-status').textContent = 'Loading...';

    db.collection(currentCollection).orderBy('uploadedAt', 'desc').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          allDocs.push({ id: doc.id, data: doc.data() });
        });
        detectColumns();
        populateGroupFilter();
        applyFilters();
        document.getElementById('table-status').textContent = allDocs.length + ' documents loaded';
      })
      .catch(err => {
        console.error('Load error:', err);
        document.getElementById('table-status').textContent = 'Error loading data: ' + err.message;
      });
  }

  // ── Detect columns from all docs ──────────────────────
  function detectColumns() {
    const colSet = new Set();
    const fixed = FIXED_FIELDS[currentCollection] || [];

    allDocs.forEach(doc => {
      const d = doc.data;
      // Top-level fields
      Object.keys(d).forEach(key => {
        if (!HIDDEN_FIELDS.includes(key) && key !== 'metadata') {
          colSet.add(key);
        }
      });
      // Metadata fields (flattened with metadata. prefix for display)
      if (d.metadata && typeof d.metadata === 'object') {
        Object.keys(d.metadata).forEach(key => {
          colSet.add('metadata.' + key);
        });
      }
    });

    // Order: fixed fields first, then metadata fields alphabetically
    const metaCols = [];
    const otherCols = [];
    colSet.forEach(col => {
      if (fixed.includes(col)) return; // handled separately
      if (col.startsWith('metadata.')) metaCols.push(col);
      else otherCols.push(col);
    });

    metaCols.sort();
    otherCols.sort();
    columns = [...fixed.filter(f => colSet.has(f)), ...otherCols, ...metaCols];
  }

  // ── Populate group filter ─────────────────────────────
  function populateGroupFilter() {
    const select = document.getElementById('group-filter');
    select.innerHTML = '<option value="">All groups</option>';

    const groups = new Set();
    allDocs.forEach(doc => {
      const fn = doc.data.fileName;
      if (fn) groups.add(fn);
    });

    Array.from(groups).sort().forEach(g => {
      const opt = document.createElement('option');
      opt.value = g;
      opt.textContent = g;
      select.appendChild(opt);
    });
  }

  // ── Apply filters & render ────────────────────────────
  function applyFilters() {
    const groupVal = document.getElementById('group-filter').value;
    const searchVal = document.getElementById('search-input').value.toLowerCase().trim();

    filteredDocs = allDocs.filter(doc => {
      if (groupVal && doc.data.fileName !== groupVal) return false;
      if (searchVal) {
        const name = (doc.data.name || doc.data.fileName || '').toLowerCase();
        if (!name.includes(searchVal)) return false;
      }
      return true;
    });

    renderTable();
  }

  // ── Render table ──────────────────────────────────────
  function renderTable() {
    const thead = document.getElementById('admin-thead-row');
    const tbody = document.getElementById('admin-tbody');
    const fixed = FIXED_FIELDS[currentCollection] || [];

    // Header
    let headerHtml = '<th><input type="checkbox" id="select-all"></th>';
    columns.forEach(col => {
      const label = col.startsWith('metadata.') ? col.slice(9) : col;
      headerHtml += '<th class="sortable" data-col="' + escapeAttr(col) + '">' + escapeHtml(label) + '</th>';
    });
    thead.innerHTML = headerHtml;

    // Body
    let bodyHtml = '';
    filteredDocs.forEach(doc => {
      const isSelected = selectedIds.has(doc.id);
      bodyHtml += '<tr data-id="' + escapeAttr(doc.id) + '"' + (isSelected ? ' class="selected"' : '') + '>';
      bodyHtml += '<td><input type="checkbox" class="row-checkbox" data-id="' + escapeAttr(doc.id) + '"' + (isSelected ? ' checked' : '') + '></td>';

      columns.forEach(col => {
        const val = getDocValue(doc, col);
        const displayVal = val != null ? String(val) : '';
        const isEditable = !fixed.includes(col);
        const changeKey = col;
        const isChanged = changes[doc.id] && changes[doc.id][changeKey] !== undefined;

        if (isEditable) {
          bodyHtml += '<td contenteditable="true" data-id="' + escapeAttr(doc.id) + '" data-col="' + escapeAttr(col) + '"' + (isChanged ? ' class="changed"' : '') + '>' + escapeHtml(isChanged ? String(changes[doc.id][changeKey]) : displayVal) + '</td>';
        } else {
          bodyHtml += '<td>' + escapeHtml(displayVal) + '</td>';
        }
      });

      bodyHtml += '</tr>';
    });
    tbody.innerHTML = bodyHtml;

    // Populate bulk field dropdown
    populateBulkFieldDropdown();
    bindTableEvents();
  }

  // ── Get value from doc by column name ─────────────────
  function getDocValue(doc, col) {
    if (col.startsWith('metadata.')) {
      const key = col.slice(9);
      return doc.data.metadata ? doc.data.metadata[key] : undefined;
    }
    return doc.data[col];
  }

  // ── Bind table events ─────────────────────────────────
  function bindTableEvents() {
    // Select all checkbox
    const selectAll = document.getElementById('select-all');
    if (selectAll) {
      selectAll.checked = filteredDocs.length > 0 && filteredDocs.every(d => selectedIds.has(d.id));
      selectAll.addEventListener('change', () => {
        filteredDocs.forEach(doc => {
          if (selectAll.checked) selectedIds.add(doc.id);
          else selectedIds.delete(doc.id);
        });
        renderTable();
        updateBulkBar();
      });
    }

    // Individual checkboxes
    document.querySelectorAll('.row-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.dataset.id;
        if (cb.checked) selectedIds.add(id);
        else selectedIds.delete(id);
        cb.closest('tr').classList.toggle('selected', cb.checked);
        updateBulkBar();
        // Update select-all state
        const sa = document.getElementById('select-all');
        if (sa) sa.checked = filteredDocs.length > 0 && filteredDocs.every(d => selectedIds.has(d.id));
      });
    });

    // Inline cell editing
    document.querySelectorAll('#admin-table td[contenteditable="true"]').forEach(td => {
      // Store original for comparison
      const docId = td.dataset.id;
      const col = td.dataset.col;
      const originalDoc = allDocs.find(d => d.id === docId);
      const originalVal = originalDoc ? String(getDocValue(originalDoc, col) || '') : '';

      td.addEventListener('blur', () => {
        const newVal = td.textContent.trim();
        if (newVal !== originalVal) {
          if (!changes[docId]) changes[docId] = {};
          changes[docId][col] = newVal;
          td.classList.add('changed');
        } else {
          if (changes[docId]) {
            delete changes[docId][col];
            if (Object.keys(changes[docId]).length === 0) delete changes[docId];
          }
          td.classList.remove('changed');
        }
        updateSaveButtons();
      });

      // Prevent Enter from creating new lines, just blur
      td.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          td.blur();
        }
        // Tab to next editable cell
        if (e.key === 'Tab') {
          e.preventDefault();
          const allEditable = Array.from(document.querySelectorAll('#admin-table td[contenteditable="true"]'));
          const idx = allEditable.indexOf(td);
          const next = e.shiftKey ? allEditable[idx - 1] : allEditable[idx + 1];
          if (next) {
            td.blur();
            next.focus();
          }
        }
      });
    });
  }

  // ── Bulk edit bar ─────────────────────────────────────
  function updateBulkBar() {
    const bar = document.getElementById('bulk-bar');
    const count = selectedIds.size;
    document.getElementById('selected-count').textContent = count;
    bar.classList.toggle('visible', count > 0);
  }

  function populateBulkFieldDropdown() {
    const select = document.getElementById('bulk-field');
    const fixed = FIXED_FIELDS[currentCollection] || [];
    select.innerHTML = '';

    columns.forEach(col => {
      if (fixed.includes(col)) return;
      const opt = document.createElement('option');
      opt.value = col;
      opt.textContent = col.startsWith('metadata.') ? col.slice(9) : col;
      select.appendChild(opt);
    });
  }

  function applyBulkEdit() {
    const field = document.getElementById('bulk-field').value;
    const value = document.getElementById('bulk-value').value.trim();
    if (!field) return;

    selectedIds.forEach(docId => {
      const originalDoc = allDocs.find(d => d.id === docId);
      const originalVal = originalDoc ? String(getDocValue(originalDoc, field) || '') : '';

      if (value !== originalVal) {
        if (!changes[docId]) changes[docId] = {};
        changes[docId][field] = value;
      } else {
        if (changes[docId]) {
          delete changes[docId][field];
          if (Object.keys(changes[docId]).length === 0) delete changes[docId];
        }
      }
    });

    renderTable();
    updateSaveButtons();
    document.getElementById('bulk-value').value = '';
  }

  // ── Save changes to Firestore ─────────────────────────
  function saveChanges() {
    const docIds = Object.keys(changes);
    if (docIds.length === 0) return;

    const saveBtn = document.getElementById('save-btn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    // Firestore batch limit is 500; chunk if needed
    const chunks = [];
    for (let i = 0; i < docIds.length; i += 400) {
      chunks.push(docIds.slice(i, i + 400));
    }

    let promise = Promise.resolve();
    chunks.forEach(chunk => {
      promise = promise.then(() => {
        const batch = db.batch();
        chunk.forEach(docId => {
          const docRef = db.collection(currentCollection).doc(docId);
          const docChanges = changes[docId];
          const update = {};

          Object.entries(docChanges).forEach(([col, val]) => {
            if (col.startsWith('metadata.')) {
              const key = col.slice(9);
              update['metadata.' + key] = val;
            } else {
              update[col] = val;
            }
          });

          batch.update(docRef, update);
        });
        return batch.commit();
      });
    });

    promise
      .then(() => {
        // Update local data
        Object.entries(changes).forEach(([docId, docChanges]) => {
          const doc = allDocs.find(d => d.id === docId);
          if (!doc) return;
          Object.entries(docChanges).forEach(([col, val]) => {
            if (col.startsWith('metadata.')) {
              const key = col.slice(9);
              if (!doc.data.metadata) doc.data.metadata = {};
              doc.data.metadata[key] = val;
            } else {
              doc.data[col] = val;
            }
          });
        });

        changes = {};
        renderTable();
        updateSaveButtons();
        saveBtn.textContent = 'Saved!';
        document.getElementById('table-status').textContent = allDocs.length + ' documents loaded — changes saved';
        setTimeout(() => { saveBtn.textContent = 'Save Changes'; }, 2000);
      })
      .catch(err => {
        console.error('Save error:', err);
        alert('Save failed: ' + err.message);
        saveBtn.textContent = 'Save Changes';
        saveBtn.disabled = false;
      });
  }

  function discardChanges() {
    if (!confirm('Discard all unsaved changes?')) return;
    changes = {};
    renderTable();
    updateSaveButtons();
  }

  function updateSaveButtons() {
    const count = Object.keys(changes).length;
    document.getElementById('save-btn').disabled = count === 0;
    document.getElementById('discard-btn').disabled = count === 0;

    const status = document.getElementById('table-status');
    if (count > 0) {
      status.innerHTML = allDocs.length + ' documents loaded — <span class="unsaved">' + count + ' document' + (count > 1 ? 's' : '') + ' with unsaved changes</span>';
    } else {
      status.textContent = allDocs.length + ' documents loaded';
    }
  }

  // ── Paste from Excel ──────────────────────────────────
  function openPasteModal() {
    document.getElementById('paste-textarea').value = '';
    document.getElementById('paste-preview').innerHTML = '';
    document.getElementById('paste-apply-btn').disabled = true;
    document.getElementById('paste-overlay').classList.add('open');
    document.getElementById('paste-textarea').focus();
  }

  function closePasteModal() {
    document.getElementById('paste-overlay').classList.remove('open');
  }

  function parsePastedData(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return null;

    const headers = lines[0].split('\t').map(h => h.trim());
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split('\t').map(v => v.trim());
      if (values.length === 0 || (values.length === 1 && !values[0])) continue;
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });
      rows.push(row);
    }

    return { headers, rows };
  }

  function previewPaste() {
    const text = document.getElementById('paste-textarea').value;
    const parsed = parsePastedData(text);
    const previewEl = document.getElementById('paste-preview');
    const applyBtn = document.getElementById('paste-apply-btn');

    if (!parsed || parsed.rows.length === 0) {
      previewEl.innerHTML = '<em>No valid data detected. Make sure first row is headers and data is tab-separated.</em>';
      applyBtn.disabled = true;
      return;
    }

    // Check for a match key (name, or lat+lon)
    const hasName = parsed.headers.some(h => h.toLowerCase() === 'name');
    const matchInfo = hasName ? 'Matching by <strong>name</strong>' : 'Will update selected rows in order';

    let html = '<p>' + matchInfo + ' &mdash; ' + parsed.rows.length + ' row(s) detected</p>';
    html += '<table><tr>';
    parsed.headers.forEach(h => { html += '<th>' + escapeHtml(h) + '</th>'; });
    html += '</tr>';
    parsed.rows.slice(0, 5).forEach(row => {
      html += '<tr>';
      parsed.headers.forEach(h => { html += '<td>' + escapeHtml(row[h] || '') + '</td>'; });
      html += '</tr>';
    });
    if (parsed.rows.length > 5) {
      html += '<tr><td colspan="' + parsed.headers.length + '" style="text-align:center;color:#666;">... and ' + (parsed.rows.length - 5) + ' more rows</td></tr>';
    }
    html += '</table>';

    previewEl.innerHTML = html;
    applyBtn.disabled = false;
  }

  function applyPaste() {
    const text = document.getElementById('paste-textarea').value;
    const parsed = parsePastedData(text);
    if (!parsed) return;

    const hasName = parsed.headers.some(h => h.toLowerCase() === 'name');
    const nameHeader = parsed.headers.find(h => h.toLowerCase() === 'name');

    // Determine which columns are being updated (exclude 'name' as it's the match key)
    const updateHeaders = parsed.headers.filter(h => h.toLowerCase() !== 'name');

    // Ensure columns exist for any new metadata fields
    updateHeaders.forEach(h => {
      // Check if it's a known top-level field or needs metadata. prefix
      const col = resolveColumnName(h);
      if (!columns.includes(col)) {
        columns.push(col);
      }
    });

    if (hasName) {
      // Match by name
      parsed.rows.forEach(row => {
        const nameVal = row[nameHeader];
        const doc = allDocs.find(d => (d.data.name || d.data.fileName || '') === nameVal);
        if (!doc) return;

        updateHeaders.forEach(h => {
          const col = resolveColumnName(h);
          const originalVal = String(getDocValue(doc, col) || '');
          const newVal = row[h] || '';
          if (newVal !== originalVal) {
            if (!changes[doc.id]) changes[doc.id] = {};
            changes[doc.id][col] = newVal;
          }
        });
      });
    } else {
      // Apply to selected rows in order
      const selectedDocs = filteredDocs.filter(d => selectedIds.has(d.id));
      parsed.rows.forEach((row, idx) => {
        if (idx >= selectedDocs.length) return;
        const doc = selectedDocs[idx];

        updateHeaders.forEach(h => {
          const col = resolveColumnName(h);
          const originalVal = String(getDocValue(doc, col) || '');
          const newVal = row[h] || '';
          if (newVal !== originalVal) {
            if (!changes[doc.id]) changes[doc.id] = {};
            changes[doc.id][col] = newVal;
          }
        });
      });
    }

    closePasteModal();
    renderTable();
    updateSaveButtons();
  }

  // Resolve a pasted header name to an internal column name
  function resolveColumnName(header) {
    // If it already matches a column, use it
    if (columns.includes(header)) return header;
    if (columns.includes('metadata.' + header)) return 'metadata.' + header;
    // Check top-level fields
    const topLevel = ['name', 'lat', 'lon', 'url', 'fileName'];
    if (topLevel.includes(header)) return header;
    // Default to metadata
    return 'metadata.' + header;
  }

  // ── Add column ────────────────────────────────────────
  function openAddColumnModal() {
    document.getElementById('add-col-name').value = '';
    document.getElementById('add-col-overlay').classList.add('open');
    document.getElementById('add-col-name').focus();
  }

  function closeAddColumnModal() {
    document.getElementById('add-col-overlay').classList.remove('open');
  }

  function addColumn() {
    const name = document.getElementById('add-col-name').value.trim();
    if (!name) return;

    const col = 'metadata.' + name;
    if (columns.includes(col)) {
      alert('Column "' + name + '" already exists.');
      return;
    }

    columns.push(col);
    closeAddColumnModal();
    renderTable();
  }

  // ── Utility ───────────────────────────────────────────
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── Event Binding ─────────────────────────────────────
  // Collection tabs
  document.querySelectorAll('.collection-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (Object.keys(changes).length > 0) {
        if (!confirm('You have unsaved changes. Switch collection and discard them?')) return;
      }
      document.querySelectorAll('.collection-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCollection = tab.dataset.collection;
      loadCollection();
    });
  });

  // Filters
  document.getElementById('group-filter').addEventListener('change', applyFilters);
  document.getElementById('search-input').addEventListener('input', applyFilters);

  // Bulk edit
  document.getElementById('bulk-apply-btn').addEventListener('click', applyBulkEdit);
  document.getElementById('bulk-clear-btn').addEventListener('click', () => {
    selectedIds.clear();
    updateBulkBar();
    renderTable();
  });

  // Save / Discard
  document.getElementById('save-btn').addEventListener('click', saveChanges);
  document.getElementById('discard-btn').addEventListener('click', discardChanges);

  // Paste modal
  document.getElementById('paste-btn').addEventListener('click', openPasteModal);
  document.getElementById('paste-cancel-btn').addEventListener('click', closePasteModal);
  document.getElementById('paste-apply-btn').addEventListener('click', applyPaste);
  document.getElementById('paste-textarea').addEventListener('input', previewPaste);
  document.getElementById('paste-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('paste-overlay')) closePasteModal();
  });

  // Add column modal
  document.getElementById('add-col-btn').addEventListener('click', openAddColumnModal);
  document.getElementById('add-col-cancel-btn').addEventListener('click', closeAddColumnModal);
  document.getElementById('add-col-confirm-btn').addEventListener('click', addColumn);
  document.getElementById('add-col-name').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addColumn();
  });
  document.getElementById('add-col-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('add-col-overlay')) closeAddColumnModal();
  });

  // ── Init ──────────────────────────────────────────────
  initFirebase();
})();
</script>
