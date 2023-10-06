<template>
  <div>
    <BreakfastRecipe
      v-if="breakfastRecipe && breakfastNutrition"
      :recipeData="breakfastRecipe"
      :nutritionData="breakfastNutrition"
    />
    <LunchRecipe
      :recipeData="lunchRecipe"
      :nutritionData="lunchNutrition"
    />
    <DinnerRecipe
      :recipeData="dinnerRecipe"
      :nutritionData="dinnerNutrition"
    />
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
      this.breakfastNutrition = await this.$spoonAPI.getNutritionByRecipeID(this.breakfastRecipe.id);
    },
    async getLunchRecipe() {
      this.lunchRecipe = await this.$spoonAPI.getLunchRecipe(
        this.LunchRecipesCategory,
        this.number
      );
      this.lunchNutrition = await this.$spoonAPI.getNutritionByRecipeID(this.lunchRecipe.id); 
    },
    async getDinnerRecipe() {
      this.dinnerRecipe = await this.$spoonAPI.getDinnerRecipe(
        this.DinnerRecipesCategory,
        this.number
      );
      this.dinnerNutrition = await this.$spoonAPI.getNutritionByRecipeID(this.dinnerRecipe.id); 
    },
  },
};
</script>

<style></style>