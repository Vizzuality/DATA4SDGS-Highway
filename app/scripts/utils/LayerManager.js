/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import L from 'leaflet';

export default class LayerManager {

  // Constructor
  constructor(map, options = {}) {
    this.map = map;
    this.mapLayers = {};
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

  addCartoLayer(layerSpec) {
    const layer = Object.assign({}, layerSpec.layerConfig, {
      id: layerSpec.id
    });
    const request = new Request(`https://${layer.account}.carto.com/api/v1/map`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(layer.body)
    });

    fetch(request)
      .then((res) => {
        if (!res.ok) {
          const error = new Error(res.statusText);
          error.response = res;
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        // we can switch off the layer while it is loading
        const tileUrl = `https://${layer.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;

        this.mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this.map).setZIndex(999);

        this.mapLayers[layer.id].on('load', () => {
          this.onLayerAddedSuccess && this.onLayerAddedSuccess(layer);
        });
        this.mapLayers[layer.id].on('tileerror', () => {
          this.onLayerAddedError && this.onLayerAddedError(layer);
        });
      })
      .catch((err) => {
        this.onLayerAddedError && this.onLayerAddedError(layer, err);
      });
  }
}
