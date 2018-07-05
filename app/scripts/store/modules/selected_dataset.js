import { Deserializer as JSONAPIDeserializer } from 'jsonapi-serializer';
import uniqBy from 'lodash/uniqBy';
import {
  SET_SELECTED_DATASET_SUCCESS,
  SET_SELECTED_DATASET_LOADING,
  SET_SELECTED_DATASET_ERROR,
  SET_RELATED_DATASETS,
  ADD_RECENT_DATASETS,
} from '../mutation-types';

const Deserializer = new JSONAPIDeserializer({ keyForAttribute: 'camelCase' });

const BASE_URL = global.API_BASE_URL;

const restoredDatasets = JSON.parse(localStorage.getItem('recentDatasets'));

const selectedDataset = {
  state: {
    related: null,
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
    [SET_RELATED_DATASETS](state, datasets) {
      state.related = datasets;
    }
  },
  actions: {
    setSelectedDataset({ commit, dispatch }, id) {
      dispatch('setRelatedDatasets', id);
      return new Promise((resolve, reject) => {
        commit(SET_SELECTED_DATASET_LOADING, true);
        commit(SET_SELECTED_DATASET_ERROR, false);
        fetch(`${BASE_URL}/v1/dataset/${id}?includes=metadata`)
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
    setRelatedDatasets({ commit }, id) {
      return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/graph/query/similar-dataset/${id}`)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error(response.status);
            }
            return response.json();
          }).then((res) => {
            if (res.data.length > 0) {
              const related = res.data.slice(0, 2);
              const fetchRelatedDataset = fetch(`${BASE_URL}/dataset/${id}`)
                .then(r => (r.status >= 400 ? Promise.reject(r.status) : r.json()));
              Promise.all(related.map(fetchRelatedDataset))
                .then(data => Promise.all(data.map(item =>
                    new Promise((reso, rej) => {
                      Deserializer.deserialize(item,
                        (err, dataset) => {
                          if (err) rej(new Error('Error deserializing json api'));
                          return reso(dataset);
                        });
                    }))
                  )
                  .then((datasets) => {
                    commit(SET_RELATED_DATASETS, datasets);
                    resolve();
                  })
                  .catch(err => reject(err))
                );
            } else {
              commit(SET_RELATED_DATASETS, null);
              resolve();
            }
          }).catch((error) => {
            reject(error);
          });
      });
    }
  },
  getters: {
    getSelectedDataset(state) {
      return state.selected.dataset;
    },
    getRecentDatasets(state) {
      return state.recentDatasets;
    },
    getRelatedDatasets(state) {
      const { related } = state;
      if (related) {
        return related.map((dataset) => {
          if (dataset.metadata.length > 0) {
            return {
              ...dataset,
              metadata: dataset.metadata[0].attributes
            };
          }
          return {
            ...dataset,
            metadata: null
          };
        });
      }
      return related;
    }
  },
};

export default selectedDataset;
