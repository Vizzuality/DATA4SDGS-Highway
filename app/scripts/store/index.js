import Vue from 'vue';
import Vuex from 'vuex';

import searchDatasets from './modules/search_datasets';
import featuredDatasets from './modules/featured_datasets';
import selectedDataset from './modules/selected_dataset';
import cartoLayer from './modules/carto_layer';
import modal from './modules/modal';
import waterRiskLayers from './modules/water_risk_layers';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    searchDatasets,
    featuredDatasets,
    selectedDataset,
    cartoLayer,
    modal,
    waterRiskLayers
  },
  strict: debug,
});
