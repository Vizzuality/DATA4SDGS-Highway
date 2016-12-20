import {
  SET_CONSOLE_MODAL,
} from '../types/modal';

import {
  SET_SEARCH_DATASETS_QUERY,
} from '../types/datasets';


const modal = {
  state: {
    consoleModal: false,
  },
  mutations: {
    [SET_CONSOLE_MODAL](state, isOpen) {
      state.consoleModal = isOpen;
    },
  },
  actions: {
    openConsoleModal({ commit }) {
      commit(SET_CONSOLE_MODAL, true);
    },
    closeConsoleModal({ commit }) {
      commit(SET_CONSOLE_MODAL, false);
      commit(SET_SEARCH_DATASETS_QUERY, null);
    },
  },
  getters: {
    getConsoleModal(state) {
      return state.consoleModal;
    },
  },
};

export default modal;
