import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/Home.vue';
import FindRecipes from './components/Recipes/FindRecipesPage/FindRecipes.vue';
import SelectedRecipeCard from "./components/Recipes/SelectedRecipePage/SelectedRecipeCard.vue";
import Market from "./components/Market/Market.vue";
import SavedRecipe from "./components/SavedRecipe/SavedRecipe.vue";
import Insights from "./components/Insights/Insights.vue";
import Onboarding from "./components/Onboarding/Onboarding.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/find-recipes', component: FindRecipes },
    { path: '/find-recipes/SelectedRecipeCard', component: SelectedRecipeCard },
    { path: '/market', component: Market },
    { path: '/saved-recipes', component: SavedRecipe },
    // { path: '/view-promotions', component: ViewPromos },
    // { path: '/profile', component:  },
    { path: '/insights', component: Insights},

    { path: '/OnboardingPages', component:Onboarding},
    // { path: '/consumption', component: }
    // { path: '/register', component: }
    // { path: '/login', component: }
    // { path: '/Onboarding', component: Onboarding}
    // Add more routes as needed

  ];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;