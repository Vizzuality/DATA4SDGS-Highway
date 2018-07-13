import { Deserializer as JSONAPIDeserializer } from 'jsonapi-serializer';
import {
  SET_SEARCH_DATASETS_ERROR,
  SET_SEARCH_DATASETS_FILTERS,
  SET_SEARCH_DATASETS_LOADING,
  SET_SEARCH_DATASETS_QUERY,
  SET_SEARCH_DATASETS_SUCCESS
} from '../mutation-types';
import filterSettings from '../../../data/search-filters.json';


const Deserializer = new JSONAPIDeserializer({ keyForAttribute: 'camelCase' });

const BASE_URL = global.API_BASE_URL;
let xhr;

const searchDatasets = {
  state: {
    search: {
      list: [],
      filters: null,
      query: null,
      loading: false,
      error: false,
      page: 1
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
    searchDatasets({ commit, state }, value) {
      return new Promise(() => {
        commit(SET_SEARCH_DATASETS_QUERY, value);
        commit(SET_SEARCH_DATASETS_LOADING, true);
        commit(SET_SEARCH_DATASETS_ERROR, false);

        let taxnomyFilter = '';
        if (state.search.filters.dataSources && state.search.filters.dataSources.length > 0) {
          taxnomyFilter = `&vocabulary[legacy]=${state.search.filters.dataSources.join(',')}`;
        }

        const graphFilter = Object.assign({}, state.search.filters);
        delete graphFilter.dataSources;
        const graphFilterArray = [].concat(...Object.values(graphFilter));
        const tags = graphFilterArray.length > 0 ? `&${graphFilterArray.map((elem, index) => `concepts[0][${index}]=${elem}`).join('&')}` : '';

        const queryEncoded = encodeURI(state.search.query);
        const search = state.search.query && state.search.query !== '' ? `&name=${queryEncoded}` : '';

        // Using XMLHttpRequest to be able to cancel request
        const url = `${BASE_URL}/v1/dataset?published=true&includes=metadata&page[size]=500${search}${tags}${taxnomyFilter}`;
        if (xhr) {
          xhr.abort();
        }
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 200 && xhr.status < 400) {
            const data = JSON.parse(xhr.response);
            Deserializer.deserialize(data, (err, list) => {
              if (err) throw new Error('Error deserializing json api');
              commit(SET_SEARCH_DATASETS_LOADING, false);
              commit(SET_SEARCH_DATASETS_SUCCESS, list);
              xhr = null;
            });
          }
        };
        xhr.onerror = () => {
          commit(SET_SEARCH_DATASETS_LOADING, false);
          commit(SET_SEARCH_DATASETS_ERROR, xhr.responseText);
        };

        xhr.send();
        return xhr;
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
      if (!state.search.filters) {
        const result = {};
        Object.keys(filterSettings).forEach((key) => {
          result[key] = [];
        });
        return result;
      }
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
