import {
  SET_CONSOLE_MODAL,
} from '../types/modal';


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
    },
  },
  getters: {
    getConsoleModal(state) {
      return state.consoleModal;
    },
  },
};

export default modal;
