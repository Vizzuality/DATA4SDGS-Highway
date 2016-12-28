// import L from 'leaflet';
import {
  SET_CARTO_LAYER_SUCCESS,
  SET_CARTO_LAYER_ERROR,
  SET_CARTO_LAYER_LOADING,
} from '../mutation-types';

const baseUrl = 'https://wri-01.cartodb.com/api/v1/map';
const cartocss = '#layer{polygon-fill: #FF6600; polygon-opacity: 0.7; line-color: #FFF; line-width: 0; line-opacity: 1;}';
const sql = 'SELECT * FROM ptw_grid_only_scoreover0';


const cartoLayer = {
  state: {
    layer: {
      cartoLayerId: null,
      loading: false,
      error: false,
    },
  },
  mutations: {
    [SET_CARTO_LAYER_LOADING](state, loading) {
      state.layer.loading = loading;
    },
    [SET_CARTO_LAYER_SUCCESS](state, cartoLayerId) {
      state.layer.cartoLayerId = cartoLayerId;
    },
    [SET_CARTO_LAYER_ERROR](state, error) {
      state.layer.error = error;
    },
  },
  actions: {
    cartoLayer({ commit }) {
      return new Promise(() => {
        const mapconfig = {
          version: '1.0.1',
          layers: [{
            user_name: 'wri-01',
            type: 'cartodb',
            options: {
              sql,
              cartocss,
              cartocss_version: '2.3.0',
              interactivity: ['cartodb_id', 'grid_id']
            }
          }]
        };

        const config = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mapconfig)
        };

        commit(SET_CARTO_LAYER_LOADING, true);
        fetch(baseUrl, config)
          .then(response =>
            response.json()
          ).then((data) => {
            commit(SET_CARTO_LAYER_LOADING, false);
            commit(SET_CARTO_LAYER_SUCCESS, data.layergroupid);
          }).catch((error) => {
            commit(SET_CARTO_LAYER_LOADING, false);
            commit(SET_CARTO_LAYER_ERROR, error);
          });
      });
    },
  },
  getters: {
    getCartoLayerIdData(state) {
      return state.layer.cartoLayerId;
    },
    getLayerLoading(state) {
      return state.layer.loading;
    },
    getLayerError(state) {
      return state.layer.error;
    },
  },
};

export default cartoLayer;
