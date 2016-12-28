import {
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR,
  SET_SELECTED_COUNTRY
} from '../mutation-types';

import countryData from '../../../data/countries.json';

const countries = {

  // STATE
  state: {
    list: [],
    selected: null,
    error: null
  },

  // MUTATIONS
  mutations: {
    [GET_COUNTRIES_SUCCESS](state, data) {
      state.list = data;
    },
    [GET_COUNTRIES_ERROR](state, error) {
      state.error = error.message;
    },
    [SET_SELECTED_COUNTRY](state, country) {
      state.selected = country;
    }
  },

  // ACTIONS
  actions: {
    getCountries({ commit }) {
      commit(GET_COUNTRIES_SUCCESS, countryData.features);
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
    }
  }
};

export default countries;
