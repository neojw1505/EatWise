import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/Home.vue';
import FindRecipes from './components/Recipes/FindRecipesPage/FindRecipes.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/find-recipes', component: FindRecipes },
    // { path: '/view-promotions', component: ViewPromos },
    // { path: '/market', component: Market },
    // { path: '/saved-recipes', component:  },
    // { path: '/profile', component:  },
    // { path: '/insights', component: }
    // { path: '/consumption', component: }
    // Add more routes as needed
  ];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;