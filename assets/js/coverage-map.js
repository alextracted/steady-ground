// Field service area map for coverage.html.
// AREA traces a ~3-hour drive from Blacksburg: OSRM drive times sampled every 7.5° out to 240 mi,
// scaled to match Google-style drive-time estimates, then widened where needed to keep every listed city inside.
(function () {
  var el = document.getElementById('serviceMap');
  if (!el || !window.L) return;

  var BLUE = '#008CE4';
  var HQ = [37.2296, -80.4139];
  var AREA = [[38.3657,-80.4139],[38.3021,-80.234],[38.3404,-80.0342],[38.3847,-79.8027],[38.414,-79.5389],[38.5374,-79.1243],[38.5982,-78.6462],[38.4455,-78.3614],[38.2288,-78.164],[37.9749,-78.0601],[37.6919,-78.1303],[37.4439,-78.1591],[37.209,-78.2012],[37.0021,-78.4104],[36.8251,-78.5931],[36.6481,-78.7014],[36.4864,-78.8354],[36.304,-78.9321],[36.0853,-79.0083],[35.888,-79.1498],[35.7427,-79.3597],[35.6256,-79.598],[35.5227,-79.8525],[35.4679,-80.1292],[35.0816,-80.4139],[35.0995,-80.7565],[35.1528,-81.0937],[35.2408,-81.4202],[35.6292,-81.5467],[35.8503,-81.7128],[36.0307,-81.885],[36.0946,-82.2221],[36.1532,-82.6765],[36.3549,-82.9543],[36.6688,-82.9021],[36.9717,-82.6637],[37.2117,-82.4767],[37.4184,-82.3743],[37.5981,-82.2137],[37.737,-81.9948],[37.8759,-81.851],[38.1169,-81.8989],[38.4273,-81.9554],[38.5942,-81.7609],[38.6102,-81.4371],[38.6279,-81.1565],[38.6441,-80.8995],[38.5352,-80.6337]];
  var CITIES = [
    ['Christiansburg, VA', 37.1299, -80.4089], ['Radford, VA', 37.1318, -80.5764],
    ['Roanoke, VA', 37.2710, -79.9414], ['Salem, VA', 37.2935, -80.0548],
    ['Pulaski, VA', 37.0485, -80.7798], ['Floyd, VA', 36.9112, -80.3200],
    ['Wytheville, VA', 36.9485, -81.0848], ['Charlottesville, VA', 38.0293, -78.4767],
    ['Winston-Salem, NC', 36.0999, -80.2442], ['Greensboro, NC', 36.0726, -79.7920],
    ['Charlotte, NC', 35.2271, -80.8431], ['Charleston, WV', 38.3498, -81.6326],
    ['Johnson City, TN', 36.3134, -82.3534]
  ];

  var touch = L.Browser.mobile;
  var map = L.map(el, { scrollWheelZoom: false, dragging: !touch, tap: !touch, zoomSnap: 0.25 });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 5, maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var area = L.polygon(AREA, { color: BLUE, weight: 3, opacity: 0.95, fillColor: BLUE, fillOpacity: 0.14, smoothFactor: 1.5 }).addTo(map);

  CITIES.forEach(function (c) {
    L.marker([c[1], c[2]], {
      keyboard: false,
      icon: L.divIcon({ className: '', html: '<div class="sg-map-dot"></div>', iconSize: [15, 15], iconAnchor: [7.5, 7.5] })
    }).bindTooltip(c[0], { direction: 'top', offset: [0, -8] }).addTo(map);
  });

  L.marker(HQ, {
    zIndexOffset: 1000,
    title: 'Steady Ground Coffee Service — Blacksburg, VA',
    icon: L.divIcon({ className: '', html: '<div class="sg-map-pin"><img src="assets/img/favicon-192.png" alt=""></div>', iconSize: [44, 44], iconAnchor: [22, 53] })
  }).bindTooltip('Steady Ground · Blacksburg, VA', { direction: 'top', offset: [0, -56] }).addTo(map);

  var legend = L.control({ position: 'topright' });
  legend.onAdd = function () {
    var d = L.DomUtil.create('div', 'sg-map-legend');
    d.innerHTML = '<i></i>3-hour drive from Blacksburg';
    return d;
  };
  legend.addTo(map);

  map.fitBounds(area.getBounds(), { padding: [24, 24] });
})();
