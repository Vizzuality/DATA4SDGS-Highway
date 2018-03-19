import { Deserializer as JSONAPIDeserializer } from 'jsonapi-serializer';
import uniqBy from 'lodash/uniqBy';
import {
  SET_SELECTED_DATASET_SUCCESS,
  SET_SELECTED_DATASET_LOADING,
  SET_SELECTED_DATASET_ERROR,
  ADD_RECENT_DATASETS,
} from '../mutation-types';

const Deserializer = new JSONAPIDeserializer({ keyForAttribute: 'camelCase' });

const BASE_URL = global.API_BASE_URL;

const restoredDatasets = JSON.parse(localStorage.getItem('recentDatasets'));

const selectedDataset = {
  state: {
    selected: {
      dataset: null,
      loading: false,
      error: false,
    },
    recentDatasets: restoredDatasets || [],
  },
  mutations: {
    [SET_SELECTED_DATASET_SUCCESS](state, data) {
      state.selected.dataset = data;
    },
    [SET_SELECTED_DATASET_LOADING](state, loading) {
      state.selected.loading = loading;
    },
    [SET_SELECTED_DATASET_ERROR](state, error) {
      state.selected.error = error.message;
    },
    [ADD_RECENT_DATASETS](state, dataset) {
      const recentDatasets = uniqBy([dataset, ...state.recentDatasets], 'name');
      if (recentDatasets.length > 6) recentDatasets.pop();
      state.recentDatasets = recentDatasets;
      localStorage.setItem('recentDatasets', JSON.stringify(recentDatasets));
    },
  },
  actions: {
    setSelectedDataset({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit(SET_SELECTED_DATASET_LOADING, true);
        commit(SET_SELECTED_DATASET_ERROR, false);
        fetch(`${BASE_URL}/dataset/${id}?includes=metadata`)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error(response.status);
            }
            return response.json();
          }).then((data) => {
            Deserializer.deserialize(data, (err, dataset) => {
              if (err) throw new Error('Error deserializing json api');
              commit(SET_SELECTED_DATASET_LOADING, false);
              commit(SET_SELECTED_DATASET_SUCCESS, dataset);
              commit(ADD_RECENT_DATASETS, dataset);
              resolve();
            });
          }).catch((error) => {
            commit(SET_SELECTED_DATASET_LOADING, false);
            commit(SET_SELECTED_DATASET_ERROR, error);
            reject(error);
          });
      });
    },
  },
  getters: {
    getSelectedDataset(state) {
      return state.selected.dataset;
    },
    getRecentDatasets(state) {
      return state.recentDatasets;
    },
    getSelectedDatasetURI(state) {
      if (state.selected.dataset) return `${BASE_URL}/query?sql=SELECT * FROM ${state.selected.dataset.id}`;
      return null;
    },
  },
};

export default selectedDataset;
