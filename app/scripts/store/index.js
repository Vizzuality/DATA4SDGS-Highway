import Vue from 'vue';
import Vuex from 'vuex';
import datasets from './modules/datasets';
import modal from './modules/modal';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    datasets,
    modal,
  },
  strict: debug,
});
