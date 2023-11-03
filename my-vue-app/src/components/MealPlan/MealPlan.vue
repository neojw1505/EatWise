<template>
  <div class="shadow rounded-4">
    <h1 class="text-center" style="color:white">Meal <span style="color:#7A8CEA">Planner</span> </h1>
    <div class="row pt-5">
     
      <div class="col-4 justify-content-around">
        <BreakfastRecipe
          v-if="breakfastRecipe && breakfastNutrition"
          :recipeData="breakfastRecipe"
          :nutritionData="breakfastNutrition"
          @refresh-recipe="refreshBreakfastRecipe"
        />
      </div>
      <div class="col-4 justify-content-around">
        <LunchRecipe
          v-if="lunchRecipe && lunchNutrition"
          :recipeData="lunchRecipe"
          :nutritionData="lunchNutrition"
          @refresh-recipe="refreshLunchRecipe"
        />
      </div>
      <div class="col-4 justify-content-around">
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
/* h1 {
    color: #FFF;
  } */




</style>
