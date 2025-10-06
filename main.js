import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

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
