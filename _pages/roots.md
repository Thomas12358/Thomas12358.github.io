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
</style>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<div class="roots-controls">
  <button class="roots-btn" id="add-gpx-btn" title="Load a GPX file from your device">+ Add GPX</button>
  <input type="file" id="gpx-file-input" accept=".gpx" multiple style="display:none;">
  <span id="route-toggles"></span>
  <button class="roots-btn" id="fit-bounds-btn" title="Zoom to fit all routes">Fit All</button>
</div>

<div id="map"></div>
<div id="route-stats"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function() {
  const ROUTE_COLORS = ['#ff6b6b','#4ecdc4','#ffe66d','#a29bfe','#fd79a8','#00b894','#e17055','#0984e3','#6c5ce7','#fdcb6e'];
  const routes = [];
  let colorIdx = 0;

  // Initialise map
  const map = L.map('map').setView([49.25, -123.1], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  // GPX parser — plain XML, no extra dependencies
  function parseGPX(xmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'application/xml');
    const points = [];
    // Support both <trkpt> (tracks) and <rtept> (routes)
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
    // Try to get a name
    const nameEl = doc.querySelector('trk > name, rte > name, metadata > name');
    const name = nameEl ? nameEl.textContent : null;
    return { points, name };
  }

  function computeStats(points) {
    let distance = 0;
    let elevGain = 0;
    let elevLoss = 0;
    let minEle = Infinity;
    let maxEle = -Infinity;

    for (let i = 0; i < points.length; i++) {
      if (points[i].ele !== null) {
        minEle = Math.min(minEle, points[i].ele);
        maxEle = Math.max(maxEle, points[i].ele);
      }
      if (i === 0) continue;
      // Haversine
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

  function addRoute(gpxText, fileName) {
    const { points, name } = parseGPX(gpxText);
    if (points.length === 0) { alert('No track points found in ' + fileName); return; }

    const color = ROUTE_COLORS[colorIdx % ROUTE_COLORS.length];
    colorIdx++;
    const latlngs = points.map(p => [p.lat, p.lon]);
    const polyline = L.polyline(latlngs, { color, weight: 4, opacity: 0.85 }).addTo(map);

    // Start / end markers
    const startMarker = L.circleMarker(latlngs[0], { radius: 6, color, fillColor: '#fff', fillOpacity: 1, weight: 2 }).addTo(map);
    const endMarker = L.circleMarker(latlngs[latlngs.length - 1], { radius: 6, color, fillColor: color, fillOpacity: 1, weight: 2 }).addTo(map);

    const routeName = name || fileName.replace(/\.gpx$/i, '');
    const stats = computeStats(points);
    const route = { routeName, color, polyline, startMarker, endMarker, stats, visible: true };
    routes.push(route);

    polyline.bindPopup('<b>' + routeName + '</b><br>' + stats.distanceKm + ' km');
    startMarker.bindTooltip('Start: ' + routeName);
    endMarker.bindTooltip('End: ' + routeName);

    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
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
      .catch(() => { /* no bundled routes yet — that's fine */ });
  }

  // File input for local GPX
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

  loadBundledRoutes();
})();
</script>

---

Drop your `.gpx` files onto the **+ Add GPX** button to visualise bike routes on the map. Toggle routes on/off with the checkboxes and view distance & elevation stats below the map.

To permanently add routes to this page, place `.gpx` files in `assets/gpx/` and list them in `assets/gpx/routes.json`.
