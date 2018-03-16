import qs from 'query-string';
import {
  SET_TOKEN,
} from '../mutation-types';

const BASE_URL = global.API_BASE_URL;

const token = {
  state: {
    token: ''
  },
  mutations: {
    [SET_TOKEN](state, payload) {
      state.token = payload.token;
    },
  },
  actions: {
    setToken({ commit }) {
      return new Promise(() => {
        fetch(`${BASE_URL}/auth/generate-token`, {
          headers: {
            Authorization: `Bearer ${qs.parse(window.location.search).token}`
          }
        })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error(response.status);
          }
          return response.json();
        }).then((data) => {
          commit(SET_TOKEN, data);
        }).catch((error) => {
          console.error(error);
        });
      });
    },
  },
};

export default token;
