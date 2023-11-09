import { createRouter, createWebHistory } from 'vue-router';
import { auth } from './firebaseService'; 

// ... Import your components here
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
import About from "./components/LandingPage/AboutPage/About.vue";
import AboutLogout from "./components/LandingPage/AboutPage/AboutLogOut.vue";
//onboarding imports

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true }, },
  { path: '/find-recipes', component: FindRecipes, meta: { requiresAuth: true }, },
  { path: '/find-recipes/SelectedRecipeCard', component: SelectedRecipeCard, meta: { requiresAuth: true }, },
  { path: '/market', component: Market, meta: { requiresAuth: true },},
  { path: '/saved-recipes', component: SavedRecipe, meta: { requiresAuth: true }, },
  { path: '/login', name: 'Login', component: Login, meta: { requiresAuth: false },},
  { path: '/profile', component: Profile, meta: { requiresAuth: true }, },
  { path: '/profile/setting', component: Setting, meta: { requiresAuth: true },},
  { path: '/insights', component: Insights, meta: { requiresAuth: true },},
  { path: '/register', name: 'Register', component: Onboarding , meta: { requiresAuth: false },},
  { path: '/profile', component: Profile, meta: { requiresAuth: true },},
  { path: '/About', name: 'About', component: About, meta: { requiresAuth: true },},
  { path: '/AboutLogout', name: 'AboutLogout', component: AboutLogout, meta: { requiresAuth: false },},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (!user && to.meta.requiresAuth) {
      next({ name: 'AboutLogout' });
    } else {
      next();
    }
    unsubscribe(); // Unsubscribe the listener after checking the user's authentication state
  });
});


export default router;