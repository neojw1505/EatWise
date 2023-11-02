import { createStore } from 'vuex';

export default createStore({
  state: {
    sharedData: null,
    Ingredientquery:null,
    viewPromo: false,
  },
  mutations: {
    setSharedData(state, data) {
      state.sharedData = data;
    },
    setIngredientquery(state, data) {
      state.Ingredientquery = data;
    },
    setviewPromo(state, data) {
      state.viewPromo = data;
    },
  },
  actions: {
    setSharedData(context, data) {
      context.commit('setSharedData', data);
    },
    setIngredientquery(context, data) {
      context.commit('setIngredientquery', data);
    },
    setviewPromo(context, data) {
      context.commit('setviewPromo', data);
    },
  },
  getters: {
    getSharedData: (state) => state.sharedData,
    getIngredientquery: (state) => state.Ingredientquery,
    getviewPromo: (state) => state.viewPromo,
  },
});