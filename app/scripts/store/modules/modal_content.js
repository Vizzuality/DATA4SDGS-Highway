import {
  SET_MODAL_CONTENT_TYPE,
} from '../mutation-types';

const modal = {
  state: {
    modalContentType: '',
  },
  mutations: {
    [SET_MODAL_CONTENT_TYPE](state, type) {
      state.modalContentType = type;
    },
  },
  actions: {
    setModalContentType({ commit }, type) {
      commit(SET_MODAL_CONTENT_TYPE, type);
    },
  },
  getters: {
    getModalContentType(state) {
      return state.modalContentType;
    },
  },
};

export default modal;
