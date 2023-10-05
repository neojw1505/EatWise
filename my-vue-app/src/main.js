import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import * as supermarketAPI  from './firebaseService';
import spoonacularObj from './api/spoonacular';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// Initialise app
const app = createApp(App);

// Attach the imported object to global properties
app.config.globalProperties.$smAPI = supermarketAPI;
app.config.globalProperties.$spoonAPI = spoonacularObj;

// Function to register a Vue component
function registerComponent(context, app) {
    for (const path in context) {
      const component = context[path].default;
      const componentName = path
        .replace(/^.+\/([^/]+)\.vue$/, '$1')
        .replace(/\//g, '-');
  
      app.component(componentName, component);
    }
  }
  
// Dynamically import and register all components from the 'components' directory and its subfolders
const componentContext = import.meta.globEager('./components/**/*.vue');
registerComponent(componentContext, app);
app.use(router)
app.mount('#app')
