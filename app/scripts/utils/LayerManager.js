/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import L from 'leaflet';

export default class LayerManager {

  // Constructor
  constructor(map, options = {}) {
    this.map = map;
    this.mapLayers = {};
    this.mapRequests = {};
    this.onLayerAddedSuccess = options.onLayerAddedSuccess;
    this.onLayerAddedError = options.onLayerAddedError;
  }

  /*
    Public methods
  */
  addLayer(layer, opts = {}) {
    const method = {
      leaflet: this.addLeafletLayer,
      arcgis: this.addEsriLayer,
      cartodb: this.addCartoLayer
    }[layer.provider];

    return method && method.call(this, layer, opts);
  }

  removeLayer(layerId) {
    this.abortRequest(layerId);
    if (this.mapLayers[layerId]) {
      this.map.removeLayer(this.mapLayers[layerId]);
      delete this.mapLayers[layerId];
    }
  }

  removeLayers() {
    Object.keys(this.mapLayers).forEach((id) => {
      this.removeLayer(id);
    });
  }

  abortRequest(id) {
    if (this.mapRequests[id]) {
      if (this.mapRequests[id].readyState !== 4) {
        this.mapRequests[id].abort();
        delete this.mapRequests[id];
      }
    }
  }

  addCartoLayer(layerSpec) {
    const layer = Object.assign({}, layerSpec.layerConfig, {
      id: layerSpec.id
    });

    this.abortRequest(layer.id);
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', `https://${layer.account}.carto.com/api/v1/map`);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(layer.body));

    this.mapRequests[layer.id] = xmlhttp;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          const data = JSON.parse(xmlhttp.responseText);
          // we can switch off the layer while it is loading
          const tileUrl = `https://${layer.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;

          this.mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this.map).setZIndex(999);

          this.mapLayers[layer.id].on('load', () => {
            this.onLayerAddedSuccess && this.onLayerAddedSuccess(layer);
          });
          this.mapLayers[layer.id].on('tileerror', () => {
            this.onLayerAddedError && this.onLayerAddedError(layer);
          });
        } else {
          this.onLayerAddedError && this.onLayerAddedError(layer);
        }
      }
    };
  }
}
