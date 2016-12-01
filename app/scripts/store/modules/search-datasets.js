import {
  SEARCH_DATASETS_SUCCESS,
  SEARCH_DATASETS_ERROR,
  SEARCH_DATASETS_LOADING,
  SET_SEARCH_DATASETS_QUERY,
} from '../types/search-datasets';

const BASE_URL = 'https://staging-api.globalforestwatch.org'; // process.env.API_URL;

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
    [SET_SEARCH_DATASETS_QUERY](state, query) {
      state.query = query;
    },
  },
  actions: {
    searchDatasets({ commit, state }) {
      return new Promise(() => {
        commit(SEARCH_DATASETS_LOADING, true);
        commit(SEARCH_DATASETS_ERROR, false);
        fetch(`${BASE_URL}/dataset?app=data4sdgs&page[size]=10000&name=${state.query}`)
          .then((response) => {
            if (response.status >= 400) {
              commit(SEARCH_DATASETS_LOADING, false);
              throw new Error(response.status);
            }
            return response.json();
          }).then((data) => {
            commit(SEARCH_DATASETS_SUCCESS, { ...data });
            commit(SEARCH_DATASETS_LOADING, false);
          }).catch((error) => {
            commit(SEARCH_DATASETS_ERROR, error);
          });
      });
    },
    updateQuery({ commit, dispatch }, query) {
      commit(SET_SEARCH_DATASETS_QUERY, query);
      dispatch('searchDatasets');
    },
  },
  getters: {
    getNotFound(state) {
      return state.query && !state.error && !state.list.length && !state.loading;
    },
    getListData(state) {
      return state.list;
    },
    getQuery(state) {
      return state.query;
    },
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error && state.query;
    },
  },
};

export default searchedDatasets;
