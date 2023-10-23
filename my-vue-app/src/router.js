import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import FindRecipes from './components/Recipes/FindRecipesPage/FindRecipes.vue';
import SelectedRecipeCard from "./components/Recipes/SelectedRecipePage/SelectedRecipeCard.vue";
import Market from "./components/Market/Market.vue";
import SavedRecipe from "./components/SavedRecipe/SavedRecipe.vue";
import Insights from "./components/Insights/Insights.vue";
import Onboarding from "./components/Onboarding/Onboarding.vue"
import Login from "./components/LandingPage/LoginPage/Login.vue";
import Profile from "./components/Profile/Profile.vue";
import Setting from "./components/Profile/setting/Setting.vue";
import Registration from "./components/LandingPage/RegistrationPage/Registration.vue";
import Onboarding from "./components/Onboarding/Onboarding.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/find-recipes', component: FindRecipes },
    { path: '/find-recipes/SelectedRecipeCard', component: SelectedRecipeCard },
    { path: '/market', component: Market },
    { path: '/saved-recipes', component: SavedRecipe },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
    { path: '/profile/setting', component: Setting },
    { path: '/insights', component: Insights},
    { path: '/onboarding', component: Onboarding},
    { path: '/register', component: Registration},
    // { path: '/consumption', component: }

  ];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;