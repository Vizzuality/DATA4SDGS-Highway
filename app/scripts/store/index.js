import Vue from 'vue';
import Vuex from 'vuex';
import datasets from './modules/datasets';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    datasets
  },
  strict: debug,
});
