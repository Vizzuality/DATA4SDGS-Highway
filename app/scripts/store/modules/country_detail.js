import countryData from 'data/countries_2.json';

import {
  SET_COUNTRY_DETAIL_SUCCESS,
  SET_COUNTRY_DETAIL_ERROR,
  SET_COUNTRY_DETAIL_LOADING
} from '../mutation-types';

const countryDetail = {

  // STATE
  state: {
    country: null,
    loading: null,
    error: null
  },

  // MUTATIONS
  mutations: {
    [SET_COUNTRY_DETAIL_SUCCESS](state, data) {
      state.country = data;
    },
    [SET_COUNTRY_DETAIL_ERROR](state, error) {
      state.error = error;
    },
    [SET_COUNTRY_DETAIL_LOADING](state, loading) {
      state.loading = loading;
    }
  },

  // ACTIONS
  actions: {
    setCountryDetail({ commit }, name) {
      const countries = countryData.features;
      commit(SET_COUNTRY_DETAIL_LOADING, true);
      const country = countries.find(
        () => countries.properties.name.toLowerCase() === name.toLowerCase()
      );
      commit(SET_COUNTRY_DETAIL_LOADING, false);
      commit(SET_COUNTRY_DETAIL_SUCCESS, country);
    },
  },

  // GETTERS
  getters: {
    getCountry(state) {
      return state.country;
    },
  }
};

export default countryDetail;
