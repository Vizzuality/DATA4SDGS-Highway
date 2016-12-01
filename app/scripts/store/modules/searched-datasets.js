import {
  SEARCH_DATASETS_SUCCESS,
  SEARCH_DATASETS_ERROR,
  SEARCH_DATASETS_LOADING
} from '../types/searched-datasets';

const BASE_URL = 'http://staging-api.globalforestwatch.org'; // process.env.API_URL;

const searchedDatasets = {
  state: {
    filters: null,
    query: null,
    list: [],
    loading: false,
    error: false,
  },
  mutations: {
    [SEARCH_DATASETS_SUCCESS](state, { data }) {
      state.list = data;
    },
    [SEARCH_DATASETS_LOADING](state, loading) {
      state.loading = loading;
    },
    [SEARCH_DATASETS_ERROR](state, error) {
      state.error = error;
    },
  },
  actions: {
    searchDatasets({ commit }) {
      return new Promise(() => {
        commit(SEARCH_DATASETS_LOADING, true);
        fetch(`${BASE_URL}/dataset?app=data4sdgs`)
          .then((response) => {
            commit(SEARCH_DATASETS_LOADING, false);
            if (!response.status >= 300) {
              commit(SEARCH_DATASETS_ERROR, true);
            }
            return response.json();
          }).then((data) => {
            commit(SEARCH_DATASETS_SUCCESS, { data });
          }).catch(() => {
            commit(SEARCH_DATASETS_ERROR, true);
          });
      });
    },
  },
  getters: {
    getNotFound(state) {
      return state.query && !state.list.length;
    },
    getListData(state) {
      return state.list.data;
    },
  },
};

export default searchedDatasets;
