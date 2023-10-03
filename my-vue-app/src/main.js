import { createApp } from 'vue'
import App from './App.vue'
import * as supermarketAPI  from './firebaseService';

const app = createApp(App);

// Attach the imported object to global properties
app.config.globalProperties.$smAPI = supermarketAPI;

createApp(App).mount('#app')
