import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';


export default createStore({
  plugins: [createPersistedState()],
  state: {
    sharedData: null,
    Ingredientquery: null,
    viewPromo: false,
    loginNotificationShown: false, // Add a flag for the notification
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
    setLoginNotificationShown(state, value) {
      state.loginNotificationShown = value;
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
    setShowLoginNotification(context, value) {
      context.commit('setLoginNotificationShown', value);
    },
  },
  getters: {
    getSharedData: (state) => state.sharedData,
    getIngredientquery: (state) => state.Ingredientquery,
    getviewPromo: (state) => state.viewPromo,
    isLoginNotificationShown: (state) => state.loginNotificationShown,
  },
  plugins: [createPersistedState({ paths: ['loginNotificationShown'] })],
});
