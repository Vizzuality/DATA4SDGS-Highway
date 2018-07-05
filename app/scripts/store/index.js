import Vue from 'vue';
import Vuex from 'vuex';

import searchDatasets from './modules/search_datasets';
import featuredDatasets from './modules/featured_datasets';
import selectedDataset from './modules/selected_dataset';
import modal from './modules/modal';
import token from './modules/token';
import twitterSlides from './modules/twitter_slides';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    searchDatasets,
    featuredDatasets,
    selectedDataset,
    modal,
    token,
    twitterSlides,
  },
  strict: debug,
});
