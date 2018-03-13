import { Deserializer as JSONAPIDeserializer } from 'jsonapi-serializer';
import {
  SET_SEARCH_DATASETS_SUCCESS,
  SET_SEARCH_DATASETS_ERROR,
  SET_SEARCH_DATASETS_LOADING,
  SET_SEARCH_DATASETS_QUERY,
  SET_SEARCH_DATASETS_FILTERS,
} from '../mutation-types';

const Deserializer = new JSONAPIDeserializer({ keyForAttribute: 'camelCase' });

const BASE_URL = global.API_BASE_URL;

const searchDatasets = {
  state: {
    search: {
      list: [],
      filters: null,
      query: null,
      loading: false,
      error: false,
    },
  },
  mutations: {
    [SET_SEARCH_DATASETS_FILTERS](state, filters) {
      state.search.filters = filters;
    },
    [SET_SEARCH_DATASETS_SUCCESS](state, data) {
      state.search.list = data;
    },
    [SET_SEARCH_DATASETS_LOADING](state, loading) {
      state.search.loading = loading;
    },
    [SET_SEARCH_DATASETS_ERROR](state, error) {
      state.search.error = error.message;
    },
    [SET_SEARCH_DATASETS_QUERY](state, query) {
      state.search.query = query;
    },
  },
  actions: {
    setSearchDatasetsFilters({ commit, dispatch, state }, filters) {
      return new Promise(() => {
        commit(SET_SEARCH_DATASETS_FILTERS, filters);
        dispatch('searchDatasets', state.search.query);
      });
    },
    searchDatasets({ commit, state }, query) {
      return new Promise(() => {
        commit(SET_SEARCH_DATASETS_QUERY, query);
        commit(SET_SEARCH_DATASETS_LOADING, true);
        commit(SET_SEARCH_DATASETS_ERROR, false);
        const tags = state.search.filters ? `&includes=vocabulary&vocabulary[legacy]=${state.search.filters}` : '';
        fetch(`${BASE_URL}/dataset?application=data4sdgs&includes=vocabulary,metadata&page[size]=12${state.search.query !== '' ? `&name=${state.search.query}` : ''}${tags}`)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error(response.status);
            }
            return response.json();
          }).then((data) => {
            Deserializer.deserialize(data, (err, list) => {
              if (err) throw new Error('Error deserializing json api');
              commit(SET_SEARCH_DATASETS_LOADING, false);
              commit(SET_SEARCH_DATASETS_SUCCESS, list);
            });
          }).catch((error) => {
            commit(SET_SEARCH_DATASETS_LOADING, false);
            commit(SET_SEARCH_DATASETS_ERROR, error);
          });
      });
    },
  },
  getters: {
    getSearchNotFound(state) {
      return state.search.query && !state.search.error
        && !state.search.list.length && !state.search.loading;
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
  },
};

export default searchDatasets;
