import Vue from 'vue';
import Vuex from 'vuex';
import searchedDatasets from './modules/search-datasets';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    searchedDatasets
  },
  strict: debug,
});
