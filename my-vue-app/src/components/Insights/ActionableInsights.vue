<template>
    <div class="bg-white">
      <div class="my-auto">
        <swiper
          :effect="'cube'"
          :grabCursor="true"
          :cubeEffect="{
            shadow: false,
            slideShadows: false,
          }"
          :modules="modules"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: true,
      }"
          class="mySwiper"

        >
          <!-- section 1 (Fav Ingredient) -->
        <swiper-slide class="bg-light">
          <div class="swiper-content d-flex flex-column justify-content-center">
            <h2>Favorite Ingredient</h2>
            <div class="insight-data mx-auto text-center">
              <h3>{{ mostConsumedIngredient.ingredient }}</h3>
              <h3>{{ mostConsumedIngredient.count }} times</h3>
            </div>
          </div>
        </swiper-slide>
        <!-- section 2 (Fav Cuisine) -->
        <swiper-slide class="bg-light">
          <div class="swiper-content d-flex flex-column justify-content-center">
            <h2>Favorite Cuisine</h2>
            <div class="insight-data mx-auto text-center">
              <h3>{{ favoriteCuisine.cuisine }}</h3>
              <h3>{{ favoriteCuisine.count }} times</h3>
            </div>
          </div>
        </swiper-slide>
        <!-- section 3 (Fav Preptime) -->
        <swiper-slide class="bg-light">
          <div class="swiper-content d-flex flex-column justify-content-center mx-auto text-center">
            <h2>Average Recipe Preparation Time</h2>
            <div class="insight-data"><h3>{{ averageRecipePrepTime }}</h3></div>
          </div>
        </swiper-slide>
        <!-- section 4 (Meal Insights) -->
        <swiper-slide class="bg-light" >
          <div class="swiper-content d-flex flex-column justify-content-center">
            <h2>Recommended Recipes</h2>
            <div class="insight-data" :style="{'display': isRecommendedRecipesSlideVisible ? 'block' : 'none'}">
              <div class="row p-2 d-flex flex-wrap">
                <FindRecipePreviewCard
                  v-for="recipe in recipeDataArray"
                  :key="recipe.id"
                  :recipe="recipe"
                  :routerTO="'/find-recipes/SelectedRecipeCard'"
                  class=""
                />
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'swiper/vue'; // Import named exports
  import moment from 'moment';
  import 'swiper/css';
  import 'swiper/css/effect-cube';
  import 'swiper/css/pagination';
  
  // Import required modules
  import { Autoplay, EffectCube, Navigation } from 'swiper/modules';

  
  export default {
    setup() {
    return {
      modules: [Autoplay, Navigation, EffectCube],
    };
    },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    
    return {
      mostConsumedIngredient: { ingredient: 'No Information Available :(', count: 0 },
      favoriteCuisine:  { cuisine: 'No Information Available :(', count: 0 },
      averageRecipePrepTime: 0,
      recommendedRecipes: null,
      averageTimeInMinutes: 0,
      recipeDataArray: null,
      isRecommendedRecipesSlideVisible: true,
    };
  },
  mounted() {
    this.getMostConsumedIngredient();
    this.getFavoriteCuisine();
    this.getAverageRecipePrepTime();
    this.recommendRecipeBasedOnInsights();
    this.checkScreenSize(); // Call the method to check screen size on mount
    window.addEventListener('resize', this.checkScreenSize); // Add event listener for window resize
  },
  methods: {
    async getMostConsumedIngredient() {
  try {
    const excludedIngredients = ["salt", "water", "sugar", "pepper", "olive oil", "garlic", "onion", "flour", "butter", "oil"];
    let countMax = 0;
    let ingredientMax = 'No Information Available :(';
    let fetchedDictionary = await this.$smAPI.getMostConsumedIngredient();

    if (typeof fetchedDictionary === 'object' && fetchedDictionary !== null) {
      for (let ingredient in fetchedDictionary) {
        if (fetchedDictionary.hasOwnProperty(ingredient)) {
          if (excludedIngredients.includes(ingredient.toLowerCase())) {
            continue; // Skip the excluded ingredients
          }
          let count = fetchedDictionary[ingredient];
          if (count > countMax) {
            countMax = count;
            ingredientMax = ingredient;
          }
        }
      }

      this.mostConsumedIngredient = { ingredient: ingredientMax, count: countMax };
    } else {
      this.mostConsumedIngredient = { ingredient: 'No Information Available :(', count: 0 };
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    this.mostConsumedIngredient = { ingredient: 'Error occurred', count: 0 };
  }
},


    async getFavoriteCuisine() {
      try {
            let countMax = 0;
            let cuisineMax = 'No Information Available :(';
            let fetchedDictionary = await this.$smAPI.getFavoriteCuisine();

            if (typeof fetchedDictionary === 'object' && fetchedDictionary !== null) {
            for (let cuisine in fetchedDictionary) {
                if (fetchedDictionary.hasOwnProperty(cuisine)) {
                let count = fetchedDictionary[cuisine];
                if (count > countMax) {
                    countMax = count;
                    cuisineMax = cuisine;
                }
                }
            }

            this.favoriteCuisine = { cuisine: cuisineMax, count: countMax };
            } else {
            this.favoriteCuisine = { cuisine: 'No Information Available :(', count: 0 };
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
            this.favoriteCuisine = { cuisine: 'Error occurred', count: 0 };
        }
    },
    async getAverageRecipePrepTime() {
      this.averageTimeInMinutes = await this.$smAPI.getAverageRecipePrepTime();
      let minutes = Math.floor(this.averageTimeInMinutes);
      let seconds = Math.round((this.averageTimeInMinutes - minutes) * 60);
      this.averageRecipePrepTime = `${minutes} minutes ${seconds} seconds`;
    },

    async recommendRecipeBasedOnInsights() {
        try {
            let dietType = await this.$smAPI.getUserDietType();
            let excludedIngredients = (await this.$smAPI.getUserExcludedIngredients()) ?? [];
            let includeIngredients = [this.mostConsumedIngredient.ingredient];
            let favCuisine = [this.favoriteCuisine.cuisine];
            let time = Math.round(this.averageTimeInMinutes);
            
            this.recommendedRecipes = await this.$spoonAPI.recommendRecipeBasedOnInsights(1, time, includeIngredients, excludedIngredients, favCuisine, dietType);
            this.recipeDataArray = this.recommendedRecipes.results
            console.log('Recommended Recipes', this.recipeDataArray); // Use 'this.recommendedRecipes' here
        } catch (error) {
            console.error('An error occurred while fetching recommendedRecipes:', error);
        }
    },

    checkScreenSize() {
      this.isRecommendedRecipesSlideVisible = window.innerWidth >= 600;
    },


  },
};
</script>
  
<style scoped>
.swiper-content {
   height: 280px;
}
.insight-data {
  color: #333; /* Your text color */
}

</style> 