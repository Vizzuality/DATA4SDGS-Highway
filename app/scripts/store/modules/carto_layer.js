// import L from 'leaflet';
import {
  SET_CARTO_LAYER_SLUG_SUCCESS,
  SET_CARTO_LAYER_SUCCESS,
  SET_CARTO_LAYER_ERROR,
  SET_CARTO_LAYER_LOADING,
  SET_CARTO_MARKERS_LAYER_SUCCESS,
  SET_CARTO_MARKERS_LAYER_ERROR,
  SET_CARTO_MARKERS_LAYER_LOADING
} from '../mutation-types';

const baseUrl = 'https://wri-01.cartodb.com/api/v1/map';
const cartoDic = {
  forests: {
    cartocss: '#layer{polygon-fill: #FF6600; polygon-opacity: 0.7; line-color: #FFF; line-width: 0; line-opacity: 1;}',
    sql: 'SELECT * FROM ptw_grid_only_scoreover0',
    interactivity: ['cartodb_id', 'grid_id']
  },
  protected: {
    cartocss: '#layer{polygon-fill: #0078ff; polygon-opacity: 0.7; line-color: #FFF; line-width: 0; line-opacity: 1;}',
    sql: 'SELECT * FROM ptw_grid_only_scoreover0',
    interactivity: ['cartodb_id', 'grid_id']
  },
};


const cartoLayer = {
  state: {
    layer: {
      specs: {
        slug: null,
        addLayer: false
      },
      cartoLayerId: null,
      loading: false,
      error: false
    },
    markerLayer: {
      layer: null,
      loading: false,
      error: false
    }
  },
  mutations: {
    [SET_CARTO_LAYER_SLUG_SUCCESS](state, layer) {
      state.layer.specs = {
        slug: layer.slug,
        addLayer: layer.addLayer
      };
    },
    [SET_CARTO_LAYER_LOADING](state, loading) {
      state.layer.loading = loading;
    },
    [SET_CARTO_LAYER_SUCCESS](state, cartoLayerId) {
      state.layer.cartoLayerId = cartoLayerId;
    },
    [SET_CARTO_LAYER_ERROR](state, error) {
      state.layer.error = error;
    },
    [SET_CARTO_MARKERS_LAYER_SUCCESS](state, layer) {
      state.markerLayer.layer = layer;
    },
    [SET_CARTO_MARKERS_LAYER_ERROR](state, error) {
      state.markerLayer.error = error;
    },
    [SET_CARTO_MARKERS_LAYER_LOADING](state, loading) {
      state.markerLayer.loading = loading;
    }
  },
  actions: {
    markerLayer({ commit }) {
      // TODO: make real request to API
      const url = "https://wri-01.carto.com/api/v2/sql?q=with s as (SELECT iso, region, value, commodity FROM combined01_prepared WHERE year = 2005 and impactparameter='Food Demand' and scenario='SSP2-GFDL' and iso is not null ), r as (SELECT iso, region, sum(value) as value FROM s group by iso, region), d as (SELECT st_asgeojson(st_centroid(the_geom)) as geometry, value, region FROM impact_regions_159 t inner join r on new_region=iso) select json_build_object('type','FeatureCollection','features',json_agg(json_build_object('geometry',cast(geometry as json),'properties', json_build_object('value',value,'country',region),'type','Feature'))) as data from d"; // eslint-disable-line
      commit(SET_CARTO_MARKERS_LAYER_SUCCESS, { url });
    },

    setCartoLayerSlug({ commit }, layer) {
      commit(SET_CARTO_LAYER_SLUG_SUCCESS, layer);
    },

    resetCartoLayerId({ commit }) {
      commit(SET_CARTO_LAYER_SUCCESS, null);
    },

    cartoLayer({ commit, state }) {
      const slug = state.layer.specs.slug;
      const layer = cartoDic[slug];

      return new Promise(() => {
        const mapconfig = {
          version: '1.0.1',
          layers: [{
            user_name: 'wri-01',
            type: 'cartodb',
            options: {
              sql: layer.sql,
              cartocss: layer.cartocss,
              cartocss_version: '2.3.0',
              interactivity: layer.interactivity
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
    getCartoLayerSpecs(state) {
      return state.layer.specs;
    },
    getCartoLayerIdData(state) {
      return state.layer.cartoLayerId;
    },
    getLayerLoading(state) {
      return state.layer.loading;
    },
    getLayerError(state) {
      return state.layer.error;
    },
    getMarkerLayer(state) {
      return state.markerLayer.layer;
    }
  },
};

export default cartoLayer;
