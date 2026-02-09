---
title: "Roots - Bike Route Planner"
permalink: /roots/
layout: single
author_profile: false
classes: wide
---

<style>
  #map {
    height: 70vh;
    width: 100%;
    border-radius: 6px;
    margin-bottom: 1em;
    z-index: 1;
  }

  .roots-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-bottom: 1em;
    align-items: center;
  }

  .roots-controls label {
    padding: 0.4em 0.8em;
    background: #252a34;
    border: 1px solid #444;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85em;
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
  }

  .roots-controls label:hover {
    border-color: #58a6ff;
  }

  .roots-controls input[type="checkbox"] {
    accent-color: #58a6ff;
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

  .roots-btn:hover {
    border-color: #58a6ff;
  }

  .roots-btn.active {
    border-color: #58a6ff;
    background: #1a1f2e;
  }

  .roots-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  #route-stats {
    background: #252a34;
    padding: 1em;
    border-radius: 6px;
    margin-bottom: 1em;
    font-size: 0.9em;
    display: none;
  }

  #route-stats table {
    width: 100%;
    border-collapse: collapse;
  }

  #route-stats th, #route-stats td {
    text-align: left;
    padding: 0.3em 0.6em;
    border-bottom: 1px solid #444;
  }

  #route-stats th {
    color: #58a6ff;
  }

  .route-color-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 0.3em;
  }

  /* Firebase admin UI */
  #admin-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-bottom: 1em;
    align-items: center;
    min-height: 2em;
  }

  #upload-area {
    display: none;
    border: 2px dashed #444;
    border-radius: 6px;
    padding: 1.5em;
    margin-bottom: 1em;
    text-align: center;
    color: #888;
    transition: border-color 0.2s, background 0.2s;
  }

  #upload-area.drag-over {
    border-color: #58a6ff;
    background: rgba(88, 166, 255, 0.05);
    color: #58a6ff;
  }

  #upload-status {
    font-size: 0.85em;
    margin-top: 0.5em;
    color: #58a6ff;
  }

  .delete-btn {
    background: none;
    border: none;
    color: #ff6b6b;
    cursor: pointer;
    font-size: 0.8em;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    margin-left: 0.5em;
  }

  .delete-btn:hover {
    background: rgba(255, 107, 107, 0.15);
  }

  .info-btn {
    background: none;
    border: none;
    color: #58a6ff;
    cursor: pointer;
    font-size: 0.8em;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    margin-left: 0.3em;
  }

  .info-btn:hover {
    background: rgba(88, 166, 255, 0.15);
  }

  /* Metadata modal */
  .meta-overlay {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 9999;
    align-items: center;
    justify-content: center;
  }

  .meta-overlay.open {
    display: flex;
  }

  .meta-modal {
    background: #1e2330;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 1.5em;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    color: #e0e0e0;
  }

  .meta-modal h3 {
    margin: 0 0 1em 0;
    color: #58a6ff;
    font-size: 1.1em;
  }

  .meta-modal label {
    display: block;
    font-size: 0.85em;
    color: #aaa;
    margin-bottom: 0.3em;
    margin-top: 0.8em;
  }

  .meta-modal input[type="text"],
  .meta-modal textarea {
    width: 100%;
    padding: 0.5em;
    background: #252a34;
    border: 1px solid #444;
    border-radius: 4px;
    color: #e0e0e0;
    font-size: 0.9em;
    font-family: inherit;
    box-sizing: border-box;
  }

  .meta-modal input[type="text"]:focus,
  .meta-modal textarea:focus {
    outline: none;
    border-color: #58a6ff;
  }

  .meta-modal textarea {
    resize: vertical;
    min-height: 60px;
  }

  .meta-modal .meta-actions {
    margin-top: 1.2em;
    display: flex;
    gap: 0.5em;
    justify-content: flex-end;
  }

  .meta-modal .meta-link {
    color: #58a6ff;
    text-decoration: none;
    word-break: break-all;
  }

  .meta-modal .meta-link:hover {
    text-decoration: underline;
  }

  .meta-modal .meta-view-value {
    font-size: 0.95em;
    margin-bottom: 0.2em;
    color: #e0e0e0;
  }

  .meta-modal .meta-view-value.empty {
    color: #666;
    font-style: italic;
  }
</style>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<!-- Admin bar: login/logout + upload -->
<div id="admin-bar">
  <button class="roots-btn" id="auth-btn" style="display:none;">Sign In</button>
  <span id="auth-status" style="font-size:0.8em; color:#888;"></span>
</div>

<div id="upload-area">
  <strong>Drop GPX or CSV files here</strong> or click to select<br>
  <input type="file" id="firebase-file-input" accept=".gpx,.csv" multiple style="display:none;">
  <div id="upload-status"></div>
</div>

<div class="roots-controls">
  <button class="roots-btn" id="add-gpx-btn" title="Load a GPX file from your device">+ Add GPX</button>
  <input type="file" id="gpx-file-input" accept=".gpx" multiple style="display:none;">
  <button class="roots-btn" id="add-csv-btn" title="Load a CSV file with GPS points">+ Add CSV Points</button>
  <input type="file" id="csv-file-input" accept=".csv" multiple style="display:none;">
  <span id="route-toggles"></span>
  <span id="point-toggles"></span>
  <button class="roots-btn" id="fit-bounds-btn" title="Zoom to fit all routes">Fit All</button>
</div>

<!-- Metadata modal -->
<div class="meta-overlay" id="meta-overlay">
  <div class="meta-modal" id="meta-modal">
    <h3 id="meta-title">Route Info</h3>
    <div id="meta-body"></div>
    <div class="meta-actions">
      <button class="roots-btn" id="meta-save-btn" style="display:none;">Save</button>
      <button class="roots-btn" id="meta-close-btn">Close</button>
    </div>
  </div>
</div>

<div id="map"></div>
<div id="route-stats"></div>

<!-- Firebase SDK (compat builds for straightforward inline usage) -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-storage-compat.js"></script>

<!-- Firebase config (edit assets/js/firebase-config.js with your values) -->
<script src="{{ '/assets/js/firebase-config.js' | relative_url }}"></script>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function() {
  // ── Map & Route Logic (unchanged) ──────────────────────────
  const ROUTE_COLORS = ['#ff6b6b','#4ecdc4','#ffe66d','#a29bfe','#fd79a8','#00b894','#e17055','#0984e3','#6c5ce7','#fdcb6e'];
  const routes = [];
  const points = []; // Array for CSV points
  let colorIdx = 0;

  const map = L.map('map').setView([49.25, -123.1], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  function parseGPX(xmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'application/xml');
    const points = [];
    const trkpts = doc.querySelectorAll('trkpt, rtept');
    trkpts.forEach(pt => {
      const lat = parseFloat(pt.getAttribute('lat'));
      const lon = parseFloat(pt.getAttribute('lon'));
      const eleEl = pt.querySelector('ele');
      const ele = eleEl ? parseFloat(eleEl.textContent) : null;
      if (!isNaN(lat) && !isNaN(lon)) {
        points.push({ lat, lon, ele });
      }
    });
    const nameEl = doc.querySelector('trk > name, rte > name, metadata > name');
    const name = nameEl ? nameEl.textContent : null;
    return { points, name };
  }

  function computeStats(points) {
    let distance = 0, elevGain = 0, elevLoss = 0;
    let minEle = Infinity, maxEle = -Infinity;

    for (let i = 0; i < points.length; i++) {
      if (points[i].ele !== null) {
        minEle = Math.min(minEle, points[i].ele);
        maxEle = Math.max(maxEle, points[i].ele);
      }
      if (i === 0) continue;
      const R = 6371000;
      const dLat = (points[i].lat - points[i-1].lat) * Math.PI / 180;
      const dLon = (points[i].lon - points[i-1].lon) * Math.PI / 180;
      const a = Math.sin(dLat/2)**2 +
                Math.cos(points[i-1].lat * Math.PI/180) *
                Math.cos(points[i].lat * Math.PI/180) *
                Math.sin(dLon/2)**2;
      distance += R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      if (points[i].ele !== null && points[i-1].ele !== null) {
        const diff = points[i].ele - points[i-1].ele;
        if (diff > 0) elevGain += diff;
        else elevLoss += Math.abs(diff);
      }
    }

    return {
      distanceKm: (distance / 1000).toFixed(1),
      elevGain: Math.round(elevGain),
      elevLoss: Math.round(elevLoss),
      minEle: minEle === Infinity ? '—' : Math.round(minEle),
      maxEle: maxEle === -Infinity ? '—' : Math.round(maxEle)
    };
  }

  // Extended addRoute to optionally track Firebase doc ID for deletion
  function addRoute(gpxText, fileName, firebaseDocId) {
    const { points, name } = parseGPX(gpxText);
    if (points.length === 0) { alert('No track points found in ' + fileName); return; }

    const color = ROUTE_COLORS[colorIdx % ROUTE_COLORS.length];
    colorIdx++;
    const latlngs = points.map(p => [p.lat, p.lon]);
    const polyline = L.polyline(latlngs, { color, weight: 4, opacity: 0.85 }).addTo(map);

    const startMarker = L.circleMarker(latlngs[0], { radius: 6, color, fillColor: '#fff', fillOpacity: 1, weight: 2 }).addTo(map);
    const endMarker = L.circleMarker(latlngs[latlngs.length - 1], { radius: 6, color, fillColor: color, fillOpacity: 1, weight: 2 }).addTo(map);

    const routeName = name || fileName.replace(/\.gpx$/i, '');
    const stats = computeStats(points);
    const route = { routeName, color, polyline, startMarker, endMarker, stats, visible: true, firebaseDocId: firebaseDocId || null };
    routes.push(route);

    polyline.bindPopup('<b>' + routeName + '</b><br>' + stats.distanceKm + ' km');
    startMarker.bindTooltip('Start: ' + routeName);
    endMarker.bindTooltip('End: ' + routeName);

    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
    renderToggles();
    renderStats();
  }

  function removeRouteFromMap(idx) {
    const r = routes[idx];
    map.removeLayer(r.polyline);
    map.removeLayer(r.startMarker);
    map.removeLayer(r.endMarker);
    routes.splice(idx, 1);
    renderToggles();
    renderStats();
  }

  function renderToggles() {
    const container = document.getElementById('route-toggles');
    container.innerHTML = '';
    routes.forEach((r, i) => {
      const lbl = document.createElement('label');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = r.visible;
      cb.addEventListener('change', () => toggleRoute(i));
      const dot = document.createElement('span');
      dot.className = 'route-color-dot';
      dot.style.background = r.color;
      lbl.appendChild(cb);
      lbl.appendChild(dot);
      lbl.appendChild(document.createTextNode(r.routeName));

      // Show info button for Firebase routes (viewable by anyone)
      if (r.firebaseDocId) {
        const info = document.createElement('button');
        info.className = 'info-btn';
        info.textContent = 'ℹ';
        info.title = 'Route info';
        info.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openMetadataModal(i); });
        lbl.appendChild(info);
      }

      // Show delete button for Firebase routes when admin is logged in
      if (r.firebaseDocId && isAdmin()) {
        const del = document.createElement('button');
        del.className = 'delete-btn';
        del.textContent = '✕';
        del.title = 'Delete from Firebase';
        del.addEventListener('click', (e) => { e.preventDefault(); deleteFirebaseRoute(i); });
        lbl.appendChild(del);
      }

      container.appendChild(lbl);
    });
  }

  function toggleRoute(idx) {
    const r = routes[idx];
    r.visible = !r.visible;
    if (r.visible) {
      r.polyline.addTo(map);
      r.startMarker.addTo(map);
      r.endMarker.addTo(map);
    } else {
      map.removeLayer(r.polyline);
      map.removeLayer(r.startMarker);
      map.removeLayer(r.endMarker);
    }
    renderStats();
  }

  function renderStats() {
    const statsDiv = document.getElementById('route-stats');
    const visible = routes.filter(r => r.visible);
    if (visible.length === 0) { statsDiv.style.display = 'none'; return; }

    statsDiv.style.display = 'block';
    let html = '<table><tr><th>Route</th><th>Distance</th><th>Elev Gain</th><th>Elev Loss</th><th>Min Elev</th><th>Max Elev</th></tr>';
    visible.forEach(r => {
      html += '<tr>';
      html += '<td><span class="route-color-dot" style="background:' + r.color + '"></span>' + r.routeName + '</td>';
      html += '<td>' + r.stats.distanceKm + ' km</td>';
      html += '<td>' + r.stats.elevGain + ' m</td>';
      html += '<td>' + r.stats.elevLoss + ' m</td>';
      html += '<td>' + r.stats.minEle + ' m</td>';
      html += '<td>' + r.stats.maxEle + ' m</td>';
      html += '</tr>';
    });
    html += '</table>';
    statsDiv.innerHTML = html;
  }

  // Load bundled GPX files from assets/gpx/
  function loadBundledRoutes() {
    fetch('{{ "/assets/gpx/routes.json" | relative_url }}')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(files => {
        files.forEach(f => {
          fetch('{{ "/assets/gpx/" | relative_url }}' + f)
            .then(r => r.text())
            .then(txt => addRoute(txt, f));
        });
      })
      .catch(() => { /* no bundled routes yet */ });
  }

  // Local file input
  const fileInput = document.getElementById('gpx-file-input');
  document.getElementById('add-gpx-btn').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => addRoute(ev.target.result, file.name);
      reader.readAsText(file);
    });
    fileInput.value = '';
  });

  document.getElementById('fit-bounds-btn').addEventListener('click', () => {
    const visible = routes.filter(r => r.visible);
    if (visible.length === 0) return;
    const group = L.featureGroup(visible.map(r => r.polyline));
    map.fitBounds(group.getBounds(), { padding: [30, 30] });
  });

  // ── CSV Point Logic ─────────────────────────────────────────
  function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];
    
    // Simple CSV parser that handles quoted fields
    function parseCSVLine(line) {
      const result = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    }
    
    const headers = parseCSVLine(lines[0]);
    const nameIdx = headers.findIndex(h => h.toLowerCase() === 'name');
    const latIdx = headers.findIndex(h => h.toLowerCase() === 'latitude' || h.toLowerCase() === 'lat');
    const lonIdx = headers.findIndex(h => h.toLowerCase() === 'longitude' || h.toLowerCase() === 'lon' || h.toLowerCase() === 'lng');
    const urlIdx = headers.findIndex(h => h.toLowerCase() === 'url' || h.toLowerCase() === 'link' || h.toLowerCase() === 'page');
    
    if (latIdx === -1 || lonIdx === -1) {
      alert('CSV must have latitude and longitude columns');
      return [];
    }
    
    const parsedPoints = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length < 2) continue;
      
      const lat = parseFloat(values[latIdx]);
      const lon = parseFloat(values[lonIdx]);
      if (isNaN(lat) || isNaN(lon)) continue;
      
      const metadata = {};
      headers.forEach((header, idx) => {
        // Exclude lat, lon, name, and url from metadata
        if (idx !== latIdx && idx !== lonIdx && idx !== nameIdx && idx !== urlIdx && values[idx]) {
          metadata[header] = values[idx];
        }
      });
      
      parsedPoints.push({
        name: nameIdx !== -1 ? values[nameIdx] : `Point ${i}`,
        lat,
        lon,
        url: urlIdx !== -1 ? values[urlIdx] : null,
        metadata
      });
    }
    
    return parsedPoints;
  }

  function addPoint(pointData, fileName, firebaseDocId) {
    const marker = L.marker([pointData.lat, pointData.lon], {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }).addTo(map);
    
    let popupContent = '<b>' + escapeHtml(pointData.name) + '</b>';
    if (pointData.url) {
      popupContent += '<br><a href="' + escapeAttr(pointData.url) + '" target="_blank" rel="noopener" aria-label="View details for ' + escapeAttr(pointData.name) + '">View Details</a>';
    }
    marker.bindPopup(popupContent);
    
    const point = {
      name: pointData.name,
      lat: pointData.lat,
      lon: pointData.lon,
      url: pointData.url,
      metadata: pointData.metadata,
      marker,
      visible: true,
      fileName,
      firebaseDocId: firebaseDocId || null
    };
    points.push(point);
    
    renderPointToggles();
  }

  function addPointsFromCSV(csvText, fileName, docIdMap) {
    const parsedPoints = parseCSV(csvText);
    if (parsedPoints.length === 0) {
      alert('No valid points found in ' + fileName);
      return;
    }
    
    parsedPoints.forEach((p, idx) => {
      const docId = docIdMap ? docIdMap[idx] : null;
      addPoint(p, fileName, docId);
    });
    
    // Fit map to show newly added points
    if (parsedPoints.length > 0) {
      const newMarkers = points.slice(-parsedPoints.length).map(p => p.marker);
      const group = L.featureGroup(newMarkers);
      map.fitBounds(group.getBounds(), { padding: [30, 30] });
    }
  }

  function removePointFromMap(idx) {
    const p = points[idx];
    map.removeLayer(p.marker);
    points.splice(idx, 1);
    renderPointToggles();
  }

  function renderPointToggles() {
    const container = document.getElementById('point-toggles');
    container.innerHTML = '';
    
    // Group points by fileName
    const groupedPoints = {};
    points.forEach((p, idx) => {
      const key = p.fileName || 'Unnamed';
      if (!groupedPoints[key]) groupedPoints[key] = [];
      groupedPoints[key].push({ point: p, idx });
    });
    
    Object.entries(groupedPoints).forEach(([fileName, pointGroup]) => {
      const lbl = document.createElement('label');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = pointGroup[0].point.visible;
      cb.addEventListener('change', () => togglePointGroup(fileName));
      
      lbl.appendChild(cb);
      lbl.appendChild(document.createTextNode('📍 ' + fileName + ' (' + pointGroup.length + ')'));
      
      // Show info button for Firebase points
      if (pointGroup[0].point.firebaseDocId) {
        const info = document.createElement('button');
        info.className = 'info-btn';
        info.textContent = 'ℹ';
        info.title = 'Point group info';
        info.addEventListener('click', (e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
          openPointMetadataModal(pointGroup[0].idx); 
        });
        lbl.appendChild(info);
      }
      
      // Show delete button for Firebase points when admin is logged in
      if (pointGroup[0].point.firebaseDocId && isAdmin()) {
        const del = document.createElement('button');
        del.className = 'delete-btn';
        del.textContent = '✕';
        del.title = 'Delete from Firebase';
        del.addEventListener('click', (e) => { 
          e.preventDefault(); 
          deleteFirebasePoints(fileName); 
        });
        lbl.appendChild(del);
      }
      
      container.appendChild(lbl);
    });
  }

  function togglePointGroup(fileName) {
    points.forEach(p => {
      if (p.fileName === fileName) {
        p.visible = !p.visible;
        if (p.visible) {
          p.marker.addTo(map);
        } else {
          map.removeLayer(p.marker);
        }
      }
    });
  }

  function openPointMetadataModal(idx) {
    const point = points[idx];
    if (!point.firebaseDocId) return;
    metaRouteIdx = null; // Not a route
    metaPointIdx = idx;
    metaTitle.textContent = point.name;
    
    metaBody.innerHTML = '<span style="color:#888;">Loading...</span>';
    metaSaveBtn.style.display = 'none';
    metaOverlay.classList.add('open');
    
    db.collection('points').doc(point.firebaseDocId).get()
      .then(doc => {
        const data = doc.data() || {};
        renderPointMetadataView(data);
      })
      .catch(err => {
        metaBody.innerHTML = '<span style="color:#ff6b6b;">Failed to load metadata.</span>';
        console.error('Metadata load error:', err);
      });
  }

  function renderPointMetadataView(data) {
    let html = '';
    
    if (data.url) {
      html += '<label>Source Link</label>';
      html += '<div class="meta-view-value"><a class="meta-link" href="' + escapeAttr(data.url) + '" target="_blank" rel="noopener">' + escapeHtml(data.url) + '</a></div>';
    }
    
    html += '<label>Location</label>';
    html += '<div class="meta-view-value">Lat: ' + data.lat + ', Lon: ' + data.lon + '</div>';
    
    if (data.metadata) {
      html += '<label>Additional Data</label>';
      Object.entries(data.metadata).forEach(([key, value]) => {
        html += '<div class="meta-view-value"><strong>' + escapeHtml(key) + ':</strong> ' + escapeHtml(value) + '</div>';
      });
    }
    
    metaBody.innerHTML = html;
    metaSaveBtn.style.display = 'none';
  }

  // Local CSV file input
  const csvFileInput = document.getElementById('csv-file-input');
  document.getElementById('add-csv-btn').addEventListener('click', () => csvFileInput.click());
  csvFileInput.addEventListener('change', (e) => {
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => addPointsFromCSV(ev.target.result, file.name);
      reader.readAsText(file);
    });
    csvFileInput.value = '';
  });

  // ── Firebase Integration ───────────────────────────────────
  let currentUser = null;
  let db = null;
  let storage = null;
  let firebaseReady = false;
  const loadedFirebaseIds = new Set();
  const loadedFirebasePointIds = new Set();
  let metaPointIdx = null; // Track point index for metadata modal

  function initFirebase() {
    // Check if config is set (not placeholder values)
    if (typeof FIREBASE_CONFIG === 'undefined' ||
        !FIREBASE_CONFIG.apiKey ||
        FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') {
      console.log('Roots: Firebase not configured — running in local-only mode.');
      document.getElementById('auth-btn').style.display = 'none';
      return;
    }

    try {
      firebase.initializeApp(FIREBASE_CONFIG);
      db = firebase.firestore();
      storage = firebase.storage();
      firebaseReady = true;

      const authBtn = document.getElementById('auth-btn');
      authBtn.style.display = '';

      firebase.auth().onAuthStateChanged(user => {
        currentUser = user;
        updateAuthUI();
        loadFirebaseRoutes();
        loadFirebasePoints();
      });

      // Load routes and points immediately — don't wait for auth state
      loadFirebaseRoutes();
      loadFirebasePoints();

      authBtn.addEventListener('click', () => {
        if (currentUser) {
          firebase.auth().signOut();
        } else {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider).catch(err => {
            console.error('Auth error:', err);
            alert('Sign-in failed: ' + err.message);
          });
        }
      });
    } catch (err) {
      console.error('Firebase init error:', err);
    }
  }

  function isAdmin() {
    return currentUser && typeof ADMIN_EMAIL !== 'undefined' && currentUser.email === ADMIN_EMAIL;
  }

  function updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    const authStatus = document.getElementById('auth-status');
    const uploadArea = document.getElementById('upload-area');

    if (currentUser) {
      authBtn.textContent = 'Sign Out';
      if (isAdmin()) {
        authStatus.textContent = 'Signed in as ' + currentUser.email + ' (admin)';
        uploadArea.style.display = 'block';
      } else {
        authStatus.textContent = 'Signed in as ' + currentUser.email;
        uploadArea.style.display = 'none';
      }
    } else {
      authBtn.textContent = 'Sign In';
      authStatus.textContent = '';
      uploadArea.style.display = 'none';
    }
    renderToggles(); // refresh delete buttons
  }

  // ── Load routes from Firestore ─────────────────────────────
  function loadFirebaseRoutes() {
    if (!firebaseReady) return;

    db.collection('routes').orderBy('uploadedAt', 'desc').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (loadedFirebaseIds.has(doc.id)) return;
          loadedFirebaseIds.add(doc.id);
          const data = doc.data();
          if (data.gpxContent) {
            // Read GPX directly from Firestore (no CORS issues)
            addRoute(data.gpxContent, data.fileName, doc.id);
          } else {
            // Fallback for old docs without gpxContent: fetch from Storage
            storage.ref(data.storagePath).getDownloadURL()
              .then(url => fetch(url))
              .then(res => {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.text();
              })
              .then(gpxText => {
                addRoute(gpxText, data.fileName, doc.id);
                // Backfill gpxContent so future loads avoid CORS
                doc.ref.update({ gpxContent: gpxText }).catch(() => {});
              })
              .catch(err => console.error('Error loading route ' + data.fileName + ':', err));
          }
        });
      })
      .catch(err => console.error('Firestore read error:', err));
  }

  // ── Load points from Firestore ──────────────────────────────
  function loadFirebasePoints() {
    if (!firebaseReady) return;

    db.collection('points').orderBy('uploadedAt', 'desc').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (loadedFirebasePointIds.has(doc.id)) return;
          loadedFirebasePointIds.add(doc.id);
          const data = doc.data();
          addPoint({
            name: data.name,
            lat: data.lat,
            lon: data.lon,
            url: data.url,
            metadata: data.metadata || {}
          }, data.fileName, doc.id);
        });
      })
      .catch(err => console.error('Firestore points read error:', err));
  }

  // ── Upload GPX to Firebase ─────────────────────────────────
  function uploadToFirebase(file) {
    if (!isAdmin()) return;

    const statusEl = document.getElementById('upload-status');
    statusEl.textContent = 'Uploading ' + file.name + '...';

    const isCSV = file.name.toLowerCase().endsWith('.csv');
    const storagePath = (isCSV ? 'csv/' : 'gpx/') + Date.now() + '_' + file.name;
    const storageRef = storage.ref(storagePath);

    // Read file text first, then upload both to Storage and Firestore
    const reader = new FileReader();
    reader.onload = (ev) => {
      const fileText = ev.target.result;
      storageRef.put(file)
        .then(() => {
          if (isCSV) {
            return uploadCSVToFirestore(file.name, storagePath, fileText);
          } else {
            // Save GPX metadata + content to Firestore (avoids CORS on Storage fetch)
            return db.collection('routes').add({
              fileName: file.name,
              storagePath: storagePath,
              gpxContent: fileText,
              uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(docRef => {
              addRoute(fileText, file.name, docRef.id);
            });
          }
        })
        .then(() => {
          statusEl.textContent = 'Uploaded ' + file.name + ' ✓';
          setTimeout(() => { statusEl.textContent = ''; }, 3000);
        })
        .catch(err => {
          console.error('Upload error:', err);
          statusEl.textContent = 'Upload failed: ' + err.message;
        });
    };
    reader.readAsText(file);
  }

  function uploadCSVToFirestore(fileName, storagePath, csvText) {
    const parsedPoints = parseCSV(csvText);
    if (parsedPoints.length === 0) {
      throw new Error('No valid points found in CSV');
    }

    // Create a batch write for all points
    const batch = db.batch();
    const docIds = [];
    
    parsedPoints.forEach(p => {
      const docRef = db.collection('points').doc();
      batch.set(docRef, {
        name: p.name,
        lat: p.lat,
        lon: p.lon,
        url: p.url,
        metadata: p.metadata,
        fileName: fileName,
        storagePath: storagePath,
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      docIds.push(docRef.id);
    });

    return batch.commit().then(() => {
      addPointsFromCSV(csvText, fileName, docIds);
    });
  }

  // ── Delete route from Firebase ─────────────────────────────
  function deleteFirebaseRoute(routeIdx) {
    const route = routes[routeIdx];
    if (!route.firebaseDocId || !isAdmin()) return;
    if (!confirm('Delete "' + route.routeName + '" from Firebase?')) return;

    // Get the storage path from Firestore, then delete both
    db.collection('routes').doc(route.firebaseDocId).get()
      .then(doc => {
        const data = doc.data();
        // Delete from Storage
        return storage.ref(data.storagePath).delete().then(() => {
          // Delete Firestore doc
          return db.collection('routes').doc(route.firebaseDocId).delete();
        });
      })
      .then(() => {
        removeRouteFromMap(routeIdx);
      })
      .catch(err => {
        console.error('Delete error:', err);
        alert('Delete failed: ' + err.message);
      });
  }

  // ── Delete points from Firebase ────────────────────────────
  function deleteFirebasePoints(fileName) {
    if (!isAdmin()) return;
    if (!confirm('Delete all points from "' + fileName + '" from Firebase?')) return;

    const pointsToDelete = points.filter(p => p.fileName === fileName && p.firebaseDocId);
    if (pointsToDelete.length === 0) return;

    // Get storage path from first point before deleting
    db.collection('points').doc(pointsToDelete[0].firebaseDocId).get()
      .then(doc => {
        const data = doc.data();
        const storagePath = data.storagePath;
        
        // Create batch to delete all point documents
        const batch = db.batch();
        pointsToDelete.forEach(p => {
          const docRef = db.collection('points').doc(p.firebaseDocId);
          batch.delete(docRef);
        });
        
        return batch.commit().then(() => storagePath);
      })
      .then((storagePath) => {
        // Delete CSV from Storage
        if (storagePath) {
          return storage.ref(storagePath).delete();
        }
      })
      .then(() => {
        // Remove points from map
        const indicesToRemove = [];
        points.forEach((p, idx) => {
          if (p.fileName === fileName) {
            indicesToRemove.push(idx);
          }
        });
        // Remove in reverse order to maintain indices
        indicesToRemove.reverse().forEach(idx => removePointFromMap(idx));
      })
      .catch(err => {
        console.error('Delete error:', err);
        alert('Delete failed: ' + err.message);
      });
  }

  // ── Metadata modal ──────────────────────────────────────────
  let metaRouteIdx = null;

  const metaOverlay = document.getElementById('meta-overlay');
  const metaTitle = document.getElementById('meta-title');
  const metaBody = document.getElementById('meta-body');
  const metaSaveBtn = document.getElementById('meta-save-btn');
  const metaCloseBtn = document.getElementById('meta-close-btn');

  metaCloseBtn.addEventListener('click', closeMetadataModal);
  metaOverlay.addEventListener('click', (e) => {
    if (e.target === metaOverlay) closeMetadataModal();
  });

  function closeMetadataModal() {
    metaOverlay.classList.remove('open');
    metaRouteIdx = null;
    metaPointIdx = null;
  }

  function openMetadataModal(idx) {
    const route = routes[idx];
    if (!route.firebaseDocId) return;
    metaRouteIdx = idx;
    metaTitle.textContent = route.routeName;

    // Load current metadata from Firestore
    metaBody.innerHTML = '<span style="color:#888;">Loading...</span>';
    metaSaveBtn.style.display = 'none';
    metaOverlay.classList.add('open');

    db.collection('routes').doc(route.firebaseDocId).get()
      .then(doc => {
        const data = doc.data() || {};
        const meta = data.metadata || {};
        if (isAdmin()) {
          renderMetadataEdit(meta);
        } else {
          renderMetadataView(meta);
        }
      })
      .catch(err => {
        metaBody.innerHTML = '<span style="color:#ff6b6b;">Failed to load metadata.</span>';
        console.error('Metadata load error:', err);
      });
  }

  function renderMetadataView(meta) {
    let html = '';

    html += '<label>Source Link</label>';
    if (meta.sourceUrl) {
      html += '<div class="meta-view-value"><a class="meta-link" href="' + escapeHtml(meta.sourceUrl) + '" target="_blank" rel="noopener">' + escapeHtml(meta.sourceUrl) + '</a></div>';
    } else {
      html += '<div class="meta-view-value empty">Not provided</div>';
    }

    html += '<label>Description</label>';
    html += '<div class="meta-view-value' + (meta.description ? '' : ' empty') + '">' + (meta.description ? escapeHtml(meta.description) : 'No description') + '</div>';

    html += '<label>Notes</label>';
    html += '<div class="meta-view-value' + (meta.notes ? '' : ' empty') + '">' + (meta.notes ? escapeHtml(meta.notes) : 'No notes') + '</div>';

    metaBody.innerHTML = html;
    metaSaveBtn.style.display = 'none';
  }

  function renderMetadataEdit(meta) {
    let html = '';

    html += '<label for="meta-source-url">Source Link</label>';
    html += '<input type="text" id="meta-source-url" placeholder="https://example.com/route-page" value="' + escapeAttr(meta.sourceUrl || '') + '">';

    html += '<label for="meta-description">Description</label>';
    html += '<textarea id="meta-description" placeholder="Brief description of this route">' + escapeHtml(meta.description || '') + '</textarea>';

    html += '<label for="meta-notes">Notes</label>';
    html += '<textarea id="meta-notes" placeholder="Any additional notes">' + escapeHtml(meta.notes || '') + '</textarea>';

    metaBody.innerHTML = html;
    metaSaveBtn.style.display = '';

    // Re-bind save handler
    metaSaveBtn.onclick = saveMetadata;
  }

  function saveMetadata() {
    if (metaRouteIdx === null) return;
    const route = routes[metaRouteIdx];
    if (!route.firebaseDocId || !isAdmin()) return;

    const metadata = {
      sourceUrl: document.getElementById('meta-source-url').value.trim(),
      description: document.getElementById('meta-description').value.trim(),
      notes: document.getElementById('meta-notes').value.trim()
    };

    metaSaveBtn.disabled = true;
    metaSaveBtn.textContent = 'Saving...';

    db.collection('routes').doc(route.firebaseDocId).update({ metadata: metadata })
      .then(() => {
        metaSaveBtn.textContent = 'Saved!';
        setTimeout(() => {
          metaSaveBtn.textContent = 'Save';
          metaSaveBtn.disabled = false;
        }, 1500);
      })
      .catch(err => {
        console.error('Metadata save error:', err);
        metaSaveBtn.textContent = 'Save';
        metaSaveBtn.disabled = false;
        alert('Failed to save metadata: ' + err.message);
      });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── Upload area drag & drop + click ────────────────────────
  const uploadArea = document.getElementById('upload-area');
  const firebaseFileInput = document.getElementById('firebase-file-input');

  uploadArea.addEventListener('click', () => firebaseFileInput.click());

  firebaseFileInput.addEventListener('change', (e) => {
    Array.from(e.target.files).forEach(file => uploadToFirebase(file));
    firebaseFileInput.value = '';
  });

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files).filter(f => {
      const name = f.name.toLowerCase();
      return name.endsWith('.gpx') || name.endsWith('.csv');
    });
    if (files.length === 0) {
      alert('Please drop .gpx or .csv files only.');
      return;
    }
    files.forEach(file => uploadToFirebase(file));
  });

  // ── Initialise ─────────────────────────────────────────────
  loadBundledRoutes();
  initFirebase();
})();
</script>

---

Drop your `.gpx` files onto the **+ Add GPX** button to visualize bike routes on the map, or use **+ Add CSV Points** to add individual GPS points from a CSV file. Toggle routes and points on/off with the checkboxes and view distance & elevation stats below the map.

**CSV Format:** Your CSV file should have columns for `name`, `latitude`, `longitude`, and optionally `url` (for a link to more details). All other columns will be stored as metadata and displayed when you click the info button.

**Firebase mode:** Sign in with Google to upload GPX and CSV files directly to Firebase Storage. Uploaded routes and points are persisted and will load automatically for all visitors. See `assets/js/firebase-config.js` to connect your Firebase project.
