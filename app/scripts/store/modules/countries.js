import countryData from 'data/countries_2.json';

import {
  SET_COUNTRIES_SUCCESS,
  SET_COUNTRIES_ERROR,
  SET_SELECTED_COUNTRY
} from '../mutation-types';

const countries = {

  // STATE
  state: {
    list: [],
    selected: null,
    error: null
  },

  // MUTATIONS
  mutations: {
    [SET_COUNTRIES_SUCCESS](state, data) {
      state.list = data;
    },
    [SET_COUNTRIES_ERROR](state, error) {
      state.error = error.message;
    },
    [SET_SELECTED_COUNTRY](state, country) {
      state.selected = country;
    }
  },

  // ACTIONS
  actions: {
    setCountries({ commit }) {
      commit(SET_COUNTRIES_SUCCESS, countryData.features);
    },
    setSelectedCountry({ commit }, country) {
      commit(SET_SELECTED_COUNTRY, country);
    }
  },

  // GETTERS
  getters: {
    getCountriesForSelect(state) {
      return state.list.map(country => country.properties.name);
    },
    getSelectedCountryName(state) {
      return state.selected ? state.selected.properties.name : null;
    },
    getCountries(state) {
      return state.list;
    },
  }
};

export default countries;
