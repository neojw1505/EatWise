<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Your Meal Plans</h1>
      </div>
    </div>
    <div class="row d-flex">

      <div class="d-flex">
        <BreakfastRecipe
          v-if="breakfastRecipe && breakfastNutrition"
          :recipeData="breakfastRecipe"
          :nutritionData="breakfastNutrition"
          @refresh-recipe="refreshRecipe"
          style="margin-right: 0.5rem"
        />
        <LunchRecipe
          v-if="lunchRecipe && lunchNutrition"
          :recipeData="lunchRecipe"
          :nutritionData="lunchNutrition"
          @refresh-recipe="refreshRecipe"
          style="margin-right: 0.5rem"
        />
        <DinnerRecipe
          v-if="dinnerRecipe && dinnerNutrition"
          :recipeData="dinnerRecipe"
          :nutritionData="dinnerNutrition"
          @refresh-recipe="refreshRecipe"
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

      breakfastRecipe: null,
      breakfastNutrition: null, // Add this
      BreakfastRecipesCategory: [
        "morning meal",
        "brunch",
        "breakfast",
        "bread",
        "soup",
        "salad",
        "side dish",
      ],
      lunchRecipe: null,
      lunchNutrition: null, // Add this
      LunchRecipesCategory: [
        "lunch",
        "main course",
        "main dish",
        "salad",
        "side dish",
      ],
      dinnerRecipe: null,
      dinnerNutrition: null, // Add this
      DinnerRecipesCategory: [
        "main course",
        "main dish",
        "dinner",
        "dessert",
        "salad",
        "side dish",
      ],
    };
  },
  methods: {
    async getBreakfastRecipe() {
      this.breakfastRecipe = await this.$spoonAPI.getBreakfastRecipe(
        this.BreakfastRecipesCategory,
        this.number
      );
      this.breakfastNutrition = await this.$spoonAPI.getSelectedRecipeNutritions(this.breakfastRecipe.id);
      console.log(this.breakfastRecipe);
      console.log(this.breakfastNutrition);
    },
    async getLunchRecipe() {
      this.lunchRecipe = await this.$spoonAPI.getLunchRecipe(
        this.LunchRecipesCategory,
        this.number
      );
      this.lunchNutrition = await this.$spoonAPI.getSelectedRecipeNutritions(this.lunchRecipe.id); 
    },
    async getDinnerRecipe() {
      this.dinnerRecipe = await this.$spoonAPI.getDinnerRecipe(
        this.DinnerRecipesCategory,
        this.number
      );
      this.dinnerNutrition = await this.$spoonAPI.getSelectedRecipeNutritions(this.dinnerRecipe.id); 
    },
    async refreshRecipe(mealType){
      if (mealType === 'breakfast') {
        // Fetch a new breakfast recipe when the child requests a refresh for breakfast
        await this.getBreakfastRecipe()
      } else if (mealType === 'lunch') {
        await this.getLunchRecipe()
      } else if (mealType === 'dinner') {
        await this.getDinnerRecipe()
      }
    }
  },
};
</script>

<style scoped>
  /* h1 {
    color: #FFF;
  } */
  .container-fluid {
    background-color: #FBE8A6;
    padding: 2rem;
    border-radius: 1.5rem;
    box-shadow: 5px 5px 10px #888888;
    margin: 0;
  }
</style>