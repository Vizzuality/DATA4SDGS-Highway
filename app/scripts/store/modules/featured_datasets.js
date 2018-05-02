import { Deserializer as JSONAPIDeserializer } from 'jsonapi-serializer';
import {
  SET_FEATURED_DATASETS_SUCCESS,
  SET_FEATURED_DATASETS_ERROR,
  SET_FEATURED_DATASETS_LOADING,
  SET_DATASETS_SUCCESS,
  SET_DATASETS_ERROR,
  SET_DATASETS_LOADING,
} from '../mutation-types';

const Deserializer = new JSONAPIDeserializer({ keyForAttribute: 'camelCase' });

const BASE_URL = global.API_BASE_URL;

const featuredDatasets = {
  state: {
    featured: {
      list: [],
      loading: false,
      error: false,
    },
  },
  mutations: {
    [SET_FEATURED_DATASETS_SUCCESS](state, data) {
      state.featured.list = data;
    },
    [SET_FEATURED_DATASETS_LOADING](state, loading) {
      state.featured.loading = loading;
    },
    [SET_FEATURED_DATASETS_ERROR](state, error) {
      state.featured.error = error.message;
    },
    [SET_DATASETS_SUCCESS](state, data) {
      state.featured.list = data;
    },
    [SET_DATASETS_LOADING](state, loading) {
      state.featured.loading = loading;
    },
    [SET_DATASETS_ERROR](state, error) {
      state.featured.error = error.message;
    },
  },
  actions: {
    getDataSets({ commit }) {
      return new Promise((resolve, reject) => {
        commit(SET_DATASETS_LOADING, true);
        commit(SET_DATASETS_ERROR, false);
        fetch(`${BASE_URL}/v1/dataset?app=data4sdgs&page[size]=12&published=true&includes=vocabulary,metadata&cache=expire`)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error(response.status);
            }
            return response.json();
          }).then((data) => {
            Deserializer.deserialize(data, (err, list) => {
              if (err) throw new Error('Error deserializing json api');
              commit(SET_DATASETS_LOADING, false);
              commit(SET_DATASETS_SUCCESS, list);
              resolve(list);
            });
          }).catch((error) => {
            commit(SET_DATASETS_LOADING, false);
            commit(SET_DATASETS_ERROR, error);
            reject(error);
          });
      });
    },
    getFeaturedDatasets({ commit }) {
      return new Promise((resolve, reject) => {
        commit(SET_FEATURED_DATASETS_LOADING, true);
        commit(SET_FEATURED_DATASETS_ERROR, false);
        fetch(`${BASE_URL}/v1/dataset?app=data4sdgs&tags=data4sdgs-featured&published=true&page[size]=12&includes=vocabulary,metadata&cache=expire`)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error(response.status);
            }
            return response.json();
          }).then((data) => {
            Deserializer.deserialize(data, (err, list) => {
              if (err) throw new Error('Error deserializing json api');
              commit(SET_FEATURED_DATASETS_LOADING, false);
              commit(SET_FEATURED_DATASETS_SUCCESS, list);
              resolve(list);
            });
          }).catch((error) => {
            commit(SET_FEATURED_DATASETS_LOADING, false);
            commit(SET_FEATURED_DATASETS_ERROR, error);
            reject(error);
          });
      });
    },
  },
  getters: {
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

export default featuredDatasets;
