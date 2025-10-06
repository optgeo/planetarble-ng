import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Custom Globe Control for toggling between globe and mercator projections
class GlobeControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    
    this._button = document.createElement('button');
    this._button.className = 'maplibregl-ctrl-icon';
    this._button.type = 'button';
    this._button.setAttribute('aria-label', 'Toggle Globe');
    this._button.title = 'Toggle Globe';
    
    // SVG icon for globe
    this._button.innerHTML = `
      <svg width="29" height="29" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 3.5C8.7 3.5 4 8.2 4 14s4.7 10.5 10.5 10.5S25 19.8 25 14 20.3 3.5 14.5 3.5zm0 1.5c1.5 0 2.9.4 4.2 1.1-.4.3-.9.5-1.4.7-.8.3-1.7.5-2.8.5-1 0-2-.2-2.8-.5-.5-.2-1-.4-1.4-.7C11.6 5.4 13 5 14.5 5zm-6.3 2c.5.4 1.2.7 1.9 1 1 .4 2.2.6 3.4.6s2.4-.2 3.4-.6c.7-.3 1.4-.6 1.9-1 1.6 1.3 2.8 3.1 3.3 5.2-.8-.3-1.7-.5-2.6-.5-2 0-3.8.7-5.5 1.9-1.7-1.2-3.5-1.9-5.5-1.9-.9 0-1.8.2-2.6.5.5-2.1 1.7-3.9 3.3-5.2zM5.5 14c0-.5 0-1 .1-1.4.7-.2 1.4-.4 2.2-.4 1.7 0 3.2.6 4.7 1.7v.1c0 1.2.3 2.3.8 3.3-.9.7-1.8 1.5-2.6 2.5-.4.5-.8 1-1.2 1.5-2.2-1.8-3.6-4.5-4-7.3zm8.5 8.5c-1.2 0-2.3-.2-3.4-.6.3-.4.6-.8.9-1.2.8-1 1.7-1.9 2.7-2.6.5.8 1.2 1.5 2 2 .4.3.9.5 1.4.7-1.1.9-2.3 1.5-3.6 1.7zm.5-5.2c-.7 0-1.3-.3-1.8-.7-.5-.5-.8-1.1-.8-1.8s.3-1.3.8-1.8c.5-.5 1.1-.8 1.8-.8s1.3.3 1.8.8c.5.5.8 1.1.8 1.8s-.3 1.3-.8 1.8c-.5.4-1.1.7-1.8.7zm4.7 2.8c-.4-.2-.8-.4-1.2-.7-.7-.5-1.3-1.1-1.7-1.8.9-.7 1.9-1.5 2.8-2.5.4-.4.8-.9 1.2-1.4 1.5 1.1 3 1.8 4.7 1.8.8 0 1.5-.1 2.2-.3-.4 2.8-1.8 5.3-4 7.1-.4-.5-.8-1-1.2-1.5-.8-.9-1.7-1.7-2.6-2.4z" fill="#333"/>
      </svg>
    `;
    
    // Keep track of current projection state
    this._isGlobe = true; // Start in globe mode
    
    this._button.onclick = () => {
      // Toggle between globe and mercator
      this._isGlobe = !this._isGlobe;
      const newProjection = this._isGlobe ? 'globe' : 'mercator';
      this._map.setProjection({ type: newProjection });
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

// Add the GlobeControl to the map
map.addControl(new GlobeControl(), 'top-right');
