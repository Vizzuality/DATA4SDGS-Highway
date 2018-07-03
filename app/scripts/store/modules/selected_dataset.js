import { Deserializer as JSONAPIDeserializer } from 'jsonapi-serializer';
import uniqBy from 'lodash/uniqBy';
import capitalize from 'lodash/capitalize';
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
    /* eslint-disable */
    getRelatedDatasets(state) {
      // const { related } = state;
      const related =  [
        {
          "name": "Population in South Africa",
          "slug": "Population-in-South-Africa-1490086842548",
          "type": null,
          "dataPath": null,
          "attributesPath": null,
          "connectorType": "rest",
          "provider": "cartodb",
          "userId": "57a0aa1071e394dd32ffe137",
          "connectorUrl": "https://simbiotica.carto.com/tables/pop_well/public",
          "tableName": "pop_well",
          "status": "saved",
          "published": true,
          "sandbox": true,
          "overwrite": false,
          "verified": false,
          "blockchain": {},
          "subscribable": {},
          "env": "production",
          "geoInfo": false,
          "protected": false,
          "legend": {
            "date": [],
            "region": [],
            "country": [],
            "nested": []
          },
          "clonedHost": {},
          "errorMessage": null,
          "taskId": null,
          "createdAt": "2017-01-12T13:04:09.777Z",
          "updatedAt": "2018-03-22T23:52:35.804Z",
          "metadata": [
            {
              "id": "588227663d81e10b00e6a5ab",
              "type": "metadata",
              "attributes": {
                "dataset": "bd47397c-b714-4ced-9fe9-d20b0b353e3f",
                "language": "en",
                "name": "Population in South Africa",
                "sourceOrganization": "CIESIN/Facebook",
                "dataSourceUrl": null,
                "dataDownloadUrl": {
                  "csv": "https://api.apihighways.org/v1/download/bd47397c-b714-4ced-9fe9-d20b0b353e3f?sql=select * from pop_well&format=csv",
                  "json": "https://api.apihighways.org/v1/download/bd47397c-b714-4ced-9fe9-d20b0b353e3f?sql=select * from pop_well&format=json"
                },
                "info": {
                  "dataDownload": "",
                  "organization": "CIESIN/Facebook",
                  "source-long": "",
                  "short-description": "",
                  "service": 262,
                  "subtitle": ""
                },
                "units": {},
                "columns": {},
                "userId": "58333dcfd9f39b189ca44c75",
                "createdAt": "2017-01-20T15:06:14.639Z",
                "updatedAt": "2017-01-20T15:06:14.639Z",
                "status": "published"
              }
            }
          ]
        },
        {
          "name": "GLOBAL NRT AIR QUALITY DATA. CONTAINS ONLY THE MOST RECENT MEASURES",
          "slug": "Global-NRT-air-quality-data-Contains-only-the-most-recent-measures",
          "type": null,
          "dataPath": null,
          "attributesPath": null,
          "connectorType": "rest",
          "provider": "bigquery",
          "userId": "5aad5c86a61d3ddd586e5861",
          "connectorUrl": null,
          "tableName": "[bigquery-public-data:openaq.global_air_quality]",
          "status": "saved",
          "published": true,
          "sandbox": true,
          "overwrite": false,
          "verified": false,
          "blockchain": {},
          "subscribable": {},
          "env": "production",
          "geoInfo": false,
          "protected": false,
          "legend": {
            "date": [],
            "region": [],
            "country": [],
            "nested": []
          },
          "clonedHost": {},
          "errorMessage": "",
          "taskId": null,
          "createdAt": "2018-03-17T18:57:22.818Z",
          "updatedAt": "2018-03-21T07:32:29.148Z",
          "metadata": [
            {
              "id": "5ab20d19b3204100108cdc02",
              "type": "metadata",
              "attributes": {
                "dataset": "9b0455e0-ee4b-49fd-92d3-19962e918819",
                "language": "en",
                "name": "Global NRT air quality data. Contains only the most recent measures",
                "description": "Data in 64 different countries. OpenAQ aggregates PM2.5, PM10, ozone (O3), sulfur dioxide (SO2), nitrogen dioxide (NO2), carbon monoxide (CO), and black carbon (BC) from real-time government and research grade sources.",
                "sourceOrganization": "Open Air Quality",
                "dataSourceUrl": "https://openaq.org/#/locations",
                "dataDownloadUrl": {
                  "csv": "https://api.apihighways.org/v1/download/9b0455e0-ee4b-49fd-92d3-19962e918819?sql=select * from [bigquery-public-data:openaq.global_air_quality]&format=csv",
                  "json": "https://api.apihighways.org/v1/download/9b0455e0-ee4b-49fd-92d3-19962e918819?sql=select * from [bigquery-public-data:openaq.global_air_quality]&format=json"
                },
                "info": {},
                "units": {},
                "columns": {},
                "userId": "5a96e21d7cd7f20001d9a6c5",
                "createdAt": "2018-03-21T07:43:21.575Z",
                "updatedAt": "2018-03-21T07:43:21.575Z",
                "status": "published"
              }
            }
          ]
        }
      ];
      if (related) {
        return related.map((dataset) => {
          if (dataset.metadata.length > 0) {
            return {
              ...dataset,
              name: capitalize(dataset.name),
              metadata: dataset.metadata[0].attributes
            };
          }
          return {
            ...dataset,
            name: capitalize(dataset.name),
            metadata: null
          };
        });
      }
      return related;
    }
  },
};

export default selectedDataset;
