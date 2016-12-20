import { Deserializer as JSONAPIDeserializer } from 'jsonapi-serializer';
import {
  SEARCH_DATASETS_SUCCESS,
  SEARCH_DATASETS_ERROR,
  SEARCH_DATASETS_LOADING,
  SET_SEARCH_DATASETS_QUERY,
  SET_SEARCH_DATASETS_FILTERS,
  GET_FEATURED_DATASETS_SUCCESS,
  GET_FEATURED_DATASETS_ERROR,
  GET_FEATURED_DATASETS_LOADING,
  SET_SELECTED_DATASET,
  ADD_RECENT_DATASETS,
} from '../types/datasets';

const Deserializer = new JSONAPIDeserializer({ keyForAttribute: 'camelCase' });

const BASE_URL = 'https://staging-api.globalforestwatch.org'; // process.env.API_URL;
const restoredDatasets = JSON.parse(localStorage.getItem('recentDatasets'));
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
    },
    selectedDataset: null,
    recentDatasets: restoredDatasets || Set,
  },
  mutations: {
    [SET_SEARCH_DATASETS_FILTERS](state, filters) {
      state.search.filters = filters;
    },
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
    [SET_SELECTED_DATASET](state, dataset) {
      state.selectedDataset = dataset;
    },
    [ADD_RECENT_DATASETS](state, dataset) {
      const list = [dataset, ...state.recentDatasets];
      if (list.length > 6) list.pop();

      state.recentDatasets = new Set(list);
      localStorage.setItem('recentDatasets', JSON.stringify(state.recentDatasets));
    },
  },
  actions: {
    setSearchDatasetsFilters({ commit, dispatch, state }, filters) {
      return new Promise(() => {
        commit(SET_SEARCH_DATASETS_FILTERS, filters);
        if (state.search.query) {
          dispatch('searchDatasets', state.search.query);
        }
      });
    },
    searchDatasets({ commit, state }, query) {
      return new Promise(() => {
        commit(SET_SEARCH_DATASETS_QUERY, query);
        if (state.search.query !== '') {
          commit(SEARCH_DATASETS_LOADING, true);
          commit(SEARCH_DATASETS_ERROR, false);
          const tags = state.search.filters ? `&tags=${state.search.filters}` : '';
          fetch(`${BASE_URL}/dataset?app=data4sdgs&page[size]=10000&includes=metadata&name=${state.search.query}${tags}`)
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
    setSelectedDataset({ commit }, dataset) {
      commit(SET_SELECTED_DATASET, dataset);
    },
    addRecentDataset({ commit }, dataset) {
      commit(ADD_RECENT_DATASETS, dataset);
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
    getSearchFilters(state) {
      return state.search.filters;
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
    getSelectedDataset(state) {
      return state.selectedDataset;
    },
    getRecentDatasets(state) {
      return Array.from(state.recentDatasets);
    },
  },
};

export default datasets;
