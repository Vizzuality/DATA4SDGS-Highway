import {
  SET_WATER_LAYER_SUCCESS,
  SET_WATER_LAYER_ERROR,
  SET_WATER_LAYER_LOADING,
  SET_WATER_LAYERS_ACTIVE
} from '../mutation-types';

export default {
  /*
    INITIAL STATE
  */
  state: {
    layers: {
      list: [],
      active: [],
      loading: false,
      error: null
    }
  },
  /*
    MUTATIONS
  */
  mutations: {
    [SET_WATER_LAYER_SUCCESS](state, layers) {
      state.layers.list = layers;
      state.layers.loading = false;
      state.layers.error = null;
    },
    [SET_WATER_LAYER_ERROR](state, error) {
      state.layers.error = error;
    },
    [SET_WATER_LAYER_LOADING](state, loading) {
      state.layers.loading = loading;
    },
    [SET_WATER_LAYERS_ACTIVE](state, activeLayers) {
      state.layers.active = activeLayers.slice(0);
    }
  },
  /*
    ACTIONS
  */
  actions: {
    // Fetch layers from api
    getWaterRiskLayers({ commit }) {
      commit(SET_WATER_LAYER_LOADING, true);
      fetch(new Request('http://api.resourcewatch.org/layer?app=sdg'))
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((layers) => {
        // Parse data from json-api format
        const ls = [];
        const lsActives = [];
        layers.data.forEach((layer) => {
          ls.push(Object.assign({}, layer.attributes, { id: layer.id }));
          lsActives.push(layer.id);
        });
        // Fetch from server ok -> Commit layers
        commit(SET_WATER_LAYER_SUCCESS, ls);
        commit(SET_WATER_LAYERS_ACTIVE, lsActives);
        commit(SET_WATER_LAYER_LOADING, false);
      })
      .catch((err) => {
        // Fetch from server ko -> Dispatch error
        commit(SET_WATER_LAYER_ERROR, err);
        commit(SET_WATER_LAYER_LOADING, false);
      });
    },

    setActiveLayers({ commit }, layers) {
      commit(SET_WATER_LAYERS_ACTIVE, layers);
    }
  },
  /*
    GETTERS
  */
  getters: {
    getActiveLayers({ layers }) {
      return layers.list.filter(layer => layers.active.includes(layer.id));
    }
  }
};
