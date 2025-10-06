import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Custom Globe Control for toggling between globe and mercator projections
class GlobeControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    
    this._button = document.createElement('button');
    this._button.type = 'button';
    this._button.setAttribute('aria-label', 'Toggle Globe');
    this._button.title = 'Toggle Globe';
    
    // Use MapLibre's built-in globe icon classes
    this._button.className = 'maplibregl-ctrl-globe';
    const icon = document.createElement('span');
    icon.className = 'maplibregl-ctrl-icon';
    icon.setAttribute('aria-hidden', 'true');
    this._button.appendChild(icon);
    
    // Keep track of current projection state - start in globe mode
    this._isGlobe = true;
    
    this._button.onclick = () => {
      // Toggle between globe and mercator
      this._isGlobe = !this._isGlobe;
      const newProjection = this._isGlobe ? 'globe' : 'mercator';
      this._map.setProjection({ type: newProjection });
      
      // Update button class to reflect state
      this._button.className = this._isGlobe ? 'maplibregl-ctrl-globe-enabled' : 'maplibregl-ctrl-globe';
    };
    
    this._container.appendChild(this._button);
    return this._container;
  }
  
  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

// Custom Turn Control for rotating to random locations
class TurnControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    
    this._button = document.createElement('button');
    this._button.type = 'button';
    this._button.setAttribute('aria-label', 'Turn Globe');
    this._button.title = 'Turn Globe';
    
    // Use MapLibre's compass icon class
    this._button.className = 'maplibregl-ctrl-compass';
    const icon = document.createElement('span');
    icon.className = 'maplibregl-ctrl-icon';
    icon.setAttribute('aria-hidden', 'true');
    this._button.appendChild(icon);
    
    this._button.onclick = () => {
      // Generate random location
      const randomLng = Math.random() * 360 - 180; // -180 to 180
      const randomLat = Math.random() * 140 - 70;  // -70 to 70 (avoid extreme poles)
      const randomZoom = Math.random() * 3 + 1.5;  // 1.5 to 4.5
      
      // Fly to random location
      this._map.easeTo({
        center: [randomLng, randomLat],
        zoom: randomZoom,
        duration: 2000,
        easing: (t) => t * (2 - t) // ease-out quad
      });
    };
    
    this._container.appendChild(this._button);
    return this._container;
  }
  
  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

const map = new maplibregl.Map({
  container: 'map',
  projection: 'globe',
  style: {
    version: 8,
    sources: {
      'planet_bmng': {
        type: 'raster',
        tiles: ['https://tunnel.optgeo.org/martin/planet_bmng/{z}/{x}/{y}'],
        tileSize: 256,
        attribution: 'Blue Marble Next Generation'
      }
    },
    layers: [
      {
        id: 'planet_bmng',
        type: 'raster',
        source: 'planet_bmng',
        minzoom: 0,
        maxzoom: 22
      }
    ]
  },
  center: [139.7, 35.7],
  zoom: 2
});

// Add the controls to the map
map.addControl(new GlobeControl(), 'top-right');
map.addControl(new TurnControl(), 'top-right');
