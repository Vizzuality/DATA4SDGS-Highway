import {
  SET_MODAL,
} from '../mutation-types';

const modal = {
  state: {
    open: false,
    onClose: null,
    type: null,
  },
  mutations: {
    [SET_MODAL](state, { isOpen, onClose, type }) {
      state.open = isOpen;
      state.onClose = onClose;
      state.type = type;
    },
  },
  actions: {
    setModal({ commit }, payload) {
      commit(SET_MODAL, payload);
    },
  },
};

export default modal;
