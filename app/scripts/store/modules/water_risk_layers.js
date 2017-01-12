import {
  SET_WATER_LAYER_SUCCESS,
  SET_WATER_LAYER_ERROR,
  SET_WATER_LAYER_LOADING,
  SET_WATER_LAYERS_ACTIVE
} from '../mutation-types';

const baseUrl = 'http://api.resourcewatch.org/layer/';
const layerIds = [
  'd21541f4-ef0b-48bb-8e3c-ea88a9d35c13',   // Raster - Water transition
  // '17f877b8-8273-4db0-9a5b-7c581cc1795f'    // Geom - Water basins
];

export default {
  /*
    INITIAL STATE
  */
  state: {
    layers: {
      list: [],
      filters: [],
      loading: false,
      error: null
    }
  },
  /*
    MUTATIONS
  */
  mutations: {
    [SET_WATER_LAYER_SUCCESS](state, layer) {
      const l = Object.assign({}, layer.data.attributes, { id: layer.id });
      const arr = state.layers.list.slice(0);
      arr.push(l);
      state.layers = {
        list: arr,
        loading: false,
        error: null
      };
    },
    [SET_WATER_LAYER_ERROR](state, error) {
      state.layers.error = error;
    },
    [SET_WATER_LAYER_LOADING](state, loading) {
      state.layers.loading = loading;
    },
    [SET_WATER_LAYERS_ACTIVE](state, activeLayers) {
      state.layers.active = activeLayers;
    }
  },
  /*
    ACTIONS
  */
  actions: {
    // Fetch layers from api
    getWaterRiskLayers({ commit }) {
      const promises = [];
      layerIds.forEach((id) => {
        promises.push(
          new Promise((resolve, reject) => {
            fetch(`${baseUrl}${id}`)
              .then(response => (
                response.ok ? response.json() : reject(new Error('error fetching layers'))
              )).then((data) => {
                commit(SET_WATER_LAYER_SUCCESS, data);
                resolve(data);
              }).catch((error) => {
                commit(SET_WATER_LAYER_ERROR, error);
                reject(error);
              });
          })
        );
      });
      commit(SET_WATER_LAYER_LOADING, true);
      Promise.all(promises).then(() => {
        commit(SET_WATER_LAYER_LOADING, false);
      });
    }
  },
  /*
    GETTERS
  */
  getters: {
    getActiveLayers({ layers }) {
      // TODO: Return active layers
      return layers.list;
    }
  }
};
