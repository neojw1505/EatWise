<template>
  <div>
    <swiper class="carousel rounded-4 shadow-5 mySwiper h-100"
      :pagination="true"
      :speed="2000"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true,
      }"
      :modules="modules">
        <!-- section 1 (Fav Ingredient) -->
        <swiper-slide class="">
          <div class="swiper-content d-flex flex-column justify-content-center mx-auto text-center pb-4">   
            <div class="insight-data mx-auto text-center">
              <h3>Your favourite ingredient is <strong>{{ mostConsumedIngredient.ingredient }}</strong>!</h3>
              <h3>You have consumed it <strong>{{ mostConsumedIngredient.count }}</strong> times!</h3>
            </div>
          </div>
        </swiper-slide>
        <!-- section 2 (Fav Cuisine) -->
        <swiper-slide class="">
          <div class="swiper-content d-flex flex-column justify-content-center mx-auto text-center pb-4">
            <div class="insight-data mx-auto text-center">
              <h3>You have been absolutely obsessed with <strong>{{ favoriteCuisine.cuisine }}</strong> cuisine!</h3>
              <h3>You have consumed it <strong>{{ favoriteCuisine.count }}</strong> times!</h3>
            </div>
          </div>
        </swiper-slide>
        <!-- section 3 (Fav Preptime) -->
        <swiper-slide class="bg-light">
          <div class="swiper-content d-flex flex-column justify-content-center text-center pb-4">
            <div class="insight-data"><h3>You have spent on average <strong>{{ averageRecipePrepTime }}</strong> preparing your meals!</h3></div>
          </div>
        </swiper-slide>
        <!-- section 4 (Meal Insights) -->
        <swiper-slide class="">
          <div class="swiper-content d-flex flex-column justify-content-center text-center mx-auto">
            <h3><strong>Recommended Recipe</strong></h3>
            <div class="insight-data" >
              <div class="row p-2 d-flex flex-wrap">
                <FindRecipePreviewCard
                  v-for="recipe in recipeDataArray"
                  :key="recipe.id"
                  :recipe="recipe"
                  :routerTO="'/find-recipes/SelectedRecipeCard'"
                  class="mx-auto items-align-center"
                />
              </div>
            </div>
          </div>
        </swiper-slide>
    </swiper>
  </div>
</template>

  
  <script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';

  
  export default {
    setup() {
    return {
      modules: [Autoplay, Pagination],
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
    };
  },
  mounted() {
    this.getMostConsumedIngredient();
    this.getFavoriteCuisine();
    this.getAverageRecipePrepTime();
    this.recommendRecipeBasedOnInsights();
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



  },
};
</script>
  
<style scoped>
.swiper-content {
   height: 100%;
   background: linear-gradient(135deg, #e0c580, #7BBEEA);

}
.insight-data {
  color: #333; /* Your text color */
}

</style> 