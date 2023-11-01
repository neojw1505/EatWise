import { createStore } from 'vuex';

export default createStore({
  state: {
    sharedData: null,
  },
  mutations: {
    setSharedData(state, data) {
      state.sharedData = data;
    },
  },
  actions: {
    setSharedData(context, data) {
      context.commit('setSharedData', data);
    },
  },
  getters: {
    getSharedData: (state) => state.sharedData,
  },
});