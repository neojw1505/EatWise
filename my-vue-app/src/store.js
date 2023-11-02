import { createStore } from 'vuex';

export default createStore({
  state: {
    sharedData: null,
    queryMarketItem: "",
  },
  mutations: {
    setSharedData(state, data) {
      state.sharedData = data;
    },
    setQueryMarketItem(state, data) {
      state.queryMarketItem = data;
    },
  },
  actions: {
    setSharedData(context, data) {
      context.commit('setSharedData', data);
    },
    setqueryMarketItem(context, data) {
      context.commit('setQueryMarketItem', data);
    },
  },
  getters: {
    getSharedData: (state) => state.sharedData,
    getqueryMarketItem: (state) => state.queryMarketItem,
  },
});