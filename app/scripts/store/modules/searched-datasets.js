import {
  SEARCH_DATASETS_SUCCESS,
  SEARCH_DATASETS_ERROR,
  SEARCH_DATASETS_LOADING
} from '../types/searched-datasets';

const BASE_URL = process.env.API_URL;

const searchedDatasets = {
  state: {
    filters: null,
    query: null,
    list: [],
    loading: false,
    error: false,
  },
  mutations: {
    [SEARCH_DATASETS_SUCCESS](state, { datasets }) {
      state.list = datasets;
    },
    [SEARCH_DATASETS_LOADING](state, loading) {
      state.loading = loading;
    },
    [SEARCH_DATASETS_ERROR](state, error) {
      state.error = error;
    },
  },
  actions: {
    search({ commit }) {
      return new Promise(() => {
        commit('SEARCH_DATASETS_LOADING', true);
        fetch(`${BASE_URL}/dataset?app=data4sdgs`)
          .then((response) => {
            commit('SEARCH_DATASETS_LOADING', false);
            if (!response.ok) {
              commit('SEARCH_DATASETS_ERROR', true);
            }
            return response.json();
          }).then((data) => {
            commit(SEARCH_DATASETS_SUCCESS, data);
          });
      });
    },
  },
  getters: {},
};

export default searchedDatasets;
