import { Deserializer as JSONAPIDeserializer } from 'jsonapi-serializer';
import {
  SEARCH_DATASETS_SUCCESS,
  SEARCH_DATASETS_ERROR,
  SEARCH_DATASETS_LOADING,
  SET_SEARCH_DATASETS_QUERY,
  GET_FEATURED_DATASETS_SUCCESS,
  GET_FEATURED_DATASETS_ERROR,
  GET_FEATURED_DATASETS_LOADING,
} from '../types/datasets';

const Deserializer = new JSONAPIDeserializer({ keyForAttribute: 'camelCase' });

const BASE_URL = 'https://staging-api.globalforestwatch.org'; // process.env.API_URL;

const datasets = {
  state: {
    search: {
      list: [],
      filters: null,
      query: null,
      loading: false,
      error: false,
    },
    featured: {
      list: [],
      loading: false,
      error: false,
    }
  },
  mutations: {
    [SEARCH_DATASETS_SUCCESS](state, data) {
      state.search.list = data;
    },
    [SEARCH_DATASETS_LOADING](state, loading) {
      state.search.loading = loading;
    },
    [SEARCH_DATASETS_ERROR](state, error) {
      state.search.error = error.message;
    },
    [SET_SEARCH_DATASETS_QUERY](state, query) {
      state.search.query = query;
    },
    [GET_FEATURED_DATASETS_SUCCESS](state, data) {
      state.featured.list = data;
    },
    [GET_FEATURED_DATASETS_LOADING](state, loading) {
      state.featured.loading = loading;
    },
    [GET_FEATURED_DATASETS_ERROR](state, error) {
      state.featured.error = error.message;
    },
  },
  actions: {
    searchDatasets({ commit, state }, query) {
      return new Promise(() => {
        commit(SET_SEARCH_DATASETS_QUERY, query);
        if (state.search.query !== '') {
          commit(SEARCH_DATASETS_LOADING, true);
          commit(SEARCH_DATASETS_ERROR, false);
          fetch(`${BASE_URL}/dataset?app=data4sdgs&page[size]=10000&includes=metadata&name=${state.search.query}`)
            .then((response) => {
              if (response.status >= 400) {
                throw new Error(response.status);
              }
              return response.json();
            }).then((data) => {
              Deserializer.deserialize(data, (err, list) => {
                if (err) throw new Error('Error deserializing json api');
                commit(SEARCH_DATASETS_LOADING, false);
                commit(SEARCH_DATASETS_SUCCESS, list);
              });
            }).catch((error) => {
              commit(SEARCH_DATASETS_LOADING, false);
              commit(SEARCH_DATASETS_ERROR, error);
            });
        }
      });
    },
    getFeaturedDatasets({ commit }) {
      return new Promise(() => {
        commit(GET_FEATURED_DATASETS_LOADING, true);
        commit(GET_FEATURED_DATASETS_ERROR, false);
        fetch(`${BASE_URL}/dataset?app=data4sdgs&page[size]=6&includes=metadata`)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error(response.status);
            }
            return response.json();
          }).then((data) => {
            Deserializer.deserialize(data, (err, list) => {
              if (err) throw new Error('Error deserializing json api');
              commit(GET_FEATURED_DATASETS_LOADING, false);
              commit(GET_FEATURED_DATASETS_SUCCESS, list);
            });
          }).catch((error) => {
            commit(GET_FEATURED_DATASETS_LOADING, false);
            commit(GET_FEATURED_DATASETS_ERROR, error);
          });
      });
    },

  },
  getters: {
    getSearchNotFound(state) {
      return state.search.query && !state.search.error
        && !state.search.list && !state.search.loading;
    },
    getSearchListData(state) {
      return state.search.list;
    },
    getSearchQuery(state) {
      return state.search.query;
    },
    getSearchLoading(state) {
      return state.search.loading;
    },
    getSearchError(state) {
      return state.search.error && state.search.query;
    },
    getFeaturedListData(state) {
      return state.featured.list;
    },
    getFeaturedLoading(state) {
      return state.featured.loading;
    },
    getFeaturedError(state) {
      return state.featured.error;
    },
  },
};

export default datasets;
