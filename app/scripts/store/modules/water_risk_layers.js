/* eslint-disable */
import {
  SET_BASINS_ERROR,
  SET_BASINS_LOADING,
  SET_BASINS_SUCCESS,
  SET_WATER_LAYER_ERROR,
  SET_WATER_LAYER_LOADING,
  SET_WATER_LAYER_SUCCESS,
  SET_WATER_LAYERS_ACTIVE
} from '../mutation-types';

const BASE_URL = global.API_BASE_URL;

const DEFAULT_LAYERS = [{
  'id': '1c56e5c4-f617-4570-90dd-20724ea674b1',//dataset id
  'name': 'Water transitions',
  'slug': 'water-transitions',
  'dataset': '1c56e5c4-f617-4570-90dd-20724ea674b1',
  'description': 'Water transitions',
  'application': ['data4sdgs'],
  'iso': [],
  'provider': 'cartodb',
  'userId': '57a0aa1071e394dd32ffe137',
  'default': true,
  'protected': false,
  'env': 'production',
  'layerConfig': {
    'account': 'simbiotica',
    'params_config': [],
    'sql_config': [],
    'body': {
      'maxzoom': 18,
      'minzoom': 3,
      'layers': [{
        'type': 'cartodb',
        'options': {
          'sql': 'Select * from water_final',
          'cartocss': '#year1 {raster-opacity:1; raster-scaling:near; raster-colorizer-default-mode:exact; raster-colorizer-default-color:  transparent; raster-colorizer-epsilon:0.11; raster-colorizer-stops: stop(1, #334285) stop(2, #22b14c) stop(3, #d12d3e) stop(4, #99d9ea) stop(5, #b5e61d) stop(6, #e6a1aa) stop(7, #ff7f27) stop(8, #ffc90e) stop(9, #7f7f7f) stop(10, #c3c3c3)}',
          'cartocss_version': '2.3.0',
          'geom_column': 'the_raster_webmercator',
          'geom_type': 'raster',
          'raster_band': 1
        }
      }]
    }
  },
  'legendConfig': {
    'type': 'basic',
    'items': [{
      'name': 'Permanent water body',
      'color': '#0000dd'
    }, {
      'name': 'New permanent',
      'color': '#22b14c'
    }, {
      'name': 'Lost permanent',
      'color': '#d12d3e'
    }, {
      'name': 'Seasonal',
      'color': '#99d9ea'
    }, {
      'name': 'New seasonal',
      'color': '#b5e61d'
    }, {
      'name': 'Lost seasonal',
      'color': '#e6a1aa'
    }, {
      'name': 'Seasonal to permanent',
      'color': '#ff7f27'
    }, {
      'name': 'Permanent to seasonal',
      'color': '#ffc90e'
    }, {
      'name': 'Ephemeral permanent',
      'color': '#7f7f7f'
    }, {
      'name': 'Ephemeral seasonal',
      'color': '#c3c3c3'
    }]
  },
  'interactionConfig': {},
  'applicationConfig': {},
  'staticImageConfig': {},
  'updatedAt': '2017-01-12T15:40:02.963Z'
}, {
  'id': 'bd47397c-b714-4ced-9fe9-d20b0b353e3f', //dataset id
  'name': 'Population in South Africa',
  'slug': 'population-in-south-africa',
  'dataset': 'bd47397c-b714-4ced-9fe9-d20b0b353e3f',
  'description': 'Population in South Africa',
  'application': ['data4sdgs'],
  'iso': [],
  'provider': 'cartodb',
  'userId': '57a0aa1071e394dd32ffe137',
  'default': true,
  'protected': false,
  'env': 'production',
  'layerConfig': {
    'account': 'simbiotica',
    'params_config': [],
    'sql_config': [],
    'body': {
      'maxzoom': 18,
      'minzoom': 3,
      'layers': [{
        'type': 'cartodb',
        'options': {
          'sql': 'Select * from pop_well',
          'cartocss': '#pop_well {raster-opacity:1; raster-scaling:near; raster-colorizer-default-mode: linear; raster-colorizer-default-color:  transparent; raster-colorizer-epsilon:0.11; raster-colorizer-stops: stop(1, #f3b641) stop(20, #FFEE99) stop(70, #E5CC4C) stop(150, #E5C319) stop(300, #B29919) stop(500, #998319) }',
          'cartocss_version': '2.3.0',
          'geom_column': 'the_raster_webmercator',
          'geom_type': 'raster',
          'raster_band': 1
        }
      }]
    }
  },
  'legendConfig': {
    'type': 'basic',
    'items': []
  },
  'interactionConfig': {},
  'applicationConfig': {},
  'staticImageConfig': {},
  'updatedAt': '2017-01-12T17:12:12.626Z'
}, {
  'id': 'ee2c5877-f212-4eb4-a63a-a82ba7e4e168', // dataset id
  'name': 'Water basins from South Africa',
  'slug': 'water-basins-from-south-africa',
  'dataset': 'ee2c5877-f212-4eb4-a63a-a82ba7e4e168',
  'description': 'water basins  from south africa',
  'application': ['data4sdgs'],
  'iso': [],
  'provider': 'cartodb',
  'userId': '57a0aa1071e394dd32ffe137',
  'default': false,
  'protected': false,
  'env': 'production',
  'layerConfig': {
    'account': 'simbiotica',
    'params_config': [],
    'sql_config': [],
    'body': {
      'maxzoom': 18,
      'minzoom': 3,
      'layers': [{
        'type': 'cartodb',
        'options': {
          'sql': 'SELECT min(cartodb_id) cartodb_id, st_union(the_geom_webmercator) the_geom_webmercator, basinid, basin_name  FROM water_basin_sa group by basinid, basin_name',
          'cartocss': '#water_basin_sa {    polygon-opacity: 0;    line-color: #007fae;    line-width: 1;    line-opacity: 1; }',
          'cartocss_version': '2.3.0'
        }
      }]
    }
  },
  'legendConfig': {
    'type': 'basic',
    'items': [{
      'name': 'Extremely high (>80%)',
      'color': '#D4155B'
    }]
  },
  'interactionConfig': {},
  'applicationConfig': {},
  'staticImageConfig': {},
  'updatedAt': '2017-01-12T15:12:11.760Z'
}];

export default {
  /*
    INITIAL STATE
  */
  state: {
    layers: {
      list: [],
      active: [],
      loading: false,
      error: null,
    },
    basins: {
      list: [],
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
    },
    [SET_BASINS_SUCCESS](state, basins) {
      state.basins.list = basins;
      state.basins.loading = false;
      state.basins.error = null;
    },
    [SET_BASINS_ERROR](state, error) {
      state.basins.error = error;
    },
    [SET_BASINS_LOADING](state, loading) {
      state.basins.loading = loading;
    }
  },
  /*
    ACTIONS
  */
  actions: {

    // Fetch layers from api
    getWaterRiskLayers({
      commit
    }) {

      commit(SET_WATER_LAYER_LOADING, true);
      fetch(new Request(`${BASE_URL}/v1/dataset?application=data4sdgs&published=true&includes=vocabulary&vocabulary[legacy]=data4sdgs-vizz2&cache=expire`))
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error(response.statusText);
        })
        .then((datasets) => {
          const layers = [];
          const lsActives = [];
          DEFAULT_LAYERS.forEach(layer => {
            layers.push(layer);
            lsActives.push(layer.id);
          })

          // Fetch from server ok -> Commit layers
          commit(SET_WATER_LAYER_SUCCESS, layers);
          commit(SET_WATER_LAYERS_ACTIVE, lsActives);
          commit(SET_WATER_LAYER_LOADING, false);
        })
        .catch((err) => {
          // Fetch from server ko -> Dispatch error
          commit(SET_WATER_LAYER_ERROR, err);
          commit(SET_WATER_LAYER_LOADING, false);
        });
    },

    setActiveLayers({
      commit
    }, layers) {
      commit(SET_WATER_LAYERS_ACTIVE, layers);
    },

    getWaterBasins({
      commit
    }) {
      // TODO: this should be a dataset instead of a requests to carto
      const url = `https://simbiotica.carto.com/api/v2/sql?q=with r as (SELECT sum(population) pop, basin_name, basinid,
      sum((transition_types::json->>'3')::numeric*pixel_area/10000) water_area_ha FROM water_basin_sa group by basin_name,
      basinid  order by 4 desc) select round(sum(pop)) as pop, round(sum(water_area_ha)) water,
      basin_name from r where water_area_ha is not null and basin_name != '' group by basin_name order by water desc`;

      commit(SET_BASINS_LOADING, true);
      fetch(new Request(url))
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error(response.statusText);
        })
        .then((basins) => {
          commit(SET_BASINS_SUCCESS, basins.rows);
          commit(SET_BASINS_LOADING, false);
        })
        .catch((err) => {
          // Fetch from server ko -> Dispatch error
          commit(SET_BASINS_ERROR, err);
          commit(SET_BASINS_LOADING, false);
        });
    }
  },

  /*
    GETTERS
  */
  getters: {
    getActiveLayers({
      layers
    }) {
      return layers.list.filter(layer => layers.active.includes(layer.id));
    }
  }
};
