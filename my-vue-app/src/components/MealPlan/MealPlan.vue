<template>
  <div class="shadow rounded-4">
    <h1 class="text-center" style="color:white">Meal <span style="color:#7A8CEA">Planner</span> </h1>
    <div class="d-flex flex-wrap justify-content-between justify-content-center pt-5">
     
      <div class="mx-auto mb-2">
        <BreakfastRecipe
          v-if="breakfastRecipe && breakfastNutrition"
          :recipeData="breakfastRecipe"
          :nutritionData="breakfastNutrition"
          @refresh-recipe="refreshBreakfastRecipe"
        />
      </div>
      <div class="mx-auto mb-2">
        <LunchRecipe
          v-if="lunchRecipe && lunchNutrition"
          :recipeData="lunchRecipe"
          :nutritionData="lunchNutrition"
          @refresh-recipe="refreshLunchRecipe"
        />
      </div>
      <div class="mx-auto mb-2">
        <DinnerRecipe 
          v-if="dinnerRecipe && dinnerNutrition"
          :recipeData="dinnerRecipe"
          :nutritionData="dinnerNutrition"
          @refresh-recipe="refreshDinnerRecipe"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getBreakfastRecipe();
    this.getLunchRecipe();
    this.getDinnerRecipe();
  },
  data() {
    return {
      number: 1, // default 1 recipe

      breakfastRecipeObj: null,
      breakfastRecipe: null,
      breakfastNutrition: null, // Add this

      lunchRecipeObj: null,
      lunchRecipe: null,
      lunchNutrition: null, // Add this
     
      dinnerRecipeObj: null,
      dinnerRecipe: null,
      dinnerNutrition: null, // Add this
     
    };
  },
  methods: {
    async getBreakfastRecipe() {
      this.breakfastRecipeObj = await this.$smAPI.getBreakfastRecipeFromFB() ?? await this.$smAPI.setBreakfastRecipeInFB();
      console.log(this.breakfastRecipeObj);
      this.breakfastRecipe = this.breakfastRecipeObj.recipe[0]
      this.breakfastNutrition = this.breakfastRecipeObj.nutrition
    },
    async getLunchRecipe() {
      this.lunchRecipeObj = await this.$smAPI.getLunchRecipeFromFB() ?? await this.$smAPI.setLunchRecipeInFB();
      this.lunchRecipe = this.lunchRecipeObj.recipe[0]
      this.lunchNutrition = this.lunchRecipeObj.nutrition
    },
    async getDinnerRecipe() {
      this.dinnerRecipeObj = await this.$smAPI.getDinnerRecipeFromFB() ?? await this.$smAPI.setDinnerRecipeInFB();
      this.dinnerRecipe = this.dinnerRecipeObj.recipe[0]
      this.dinnerNutrition = this.dinnerRecipeObj.nutrition
    },
    async refreshBreakfastRecipe() {
        // Fetch a new breakfast recipe when the child requests a refresh for breakfast
        await this.$smAPI.setBreakfastRecipeInFB();
        await this.getBreakfastRecipe();
    },
    async refreshLunchRecipe() {
      // Fetch a new lunch recipe when the child requests a refresh for lunch
      await this.$smAPI.setLunchRecipeInFB();
      await this.getLunchRecipe();
    },
    async refreshDinnerRecipe() {
      // Fetch a new dinner recipe when the child requests a refresh for dinner
      await this.$smAPI.setDinnerRecipeInFB();
      await this.getDinnerRecipe();
    },
  },
};
</script>

<style scoped>

h1 {
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.64px;  
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

@media screen and (min-width: 601px) {
  h1 {
    font-size: 80px;
  }
}

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
@media screen and (max-width: 600px) {
  h1 {
    font-size: 40px;
  }
}


</style>
