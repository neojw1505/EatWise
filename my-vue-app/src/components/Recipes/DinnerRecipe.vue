<!-- This component generates one or more random Dinner recipes -->
<template>
  <div>
    <button @click="getDinnerRecipe">get Dinner Recipe</button>
    <div v-if="DinnerRecipe">
      <span>Title: {{ Title }}</span>
      <img :src="imgURL" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DinnerRecipe: null,
      // list of categories to include as Dinner
      DinnerRecipesCategory: [
        "main course",
        "main dish",
        "dinner",
        "dessert",
        "salad",
        "side dish",
      ],
      number: 1, // default 1 recipe
      RecipeID: "",
      Title: "",
      imgURL: "",
      Nutrients: null,
      Calories: null,
      Carbs: null,
      Fat: null,
      Protein: null,
      CaloricBreakdown: null,
      percentCarbs: null,
      percentFat: null,
      percentProtein: null,
      Ingredients: [],
      Vitamins: [],
      GlycemicIndex: null,
      GlycemicLoad: null,
    };
  },
  methods: {
    async getDinnerRecipe() {
      this.DinnerRecipe = await this.$spoonAPI.getDinnerRecipe(
        this.DinnerRecipesCategory,
        this.number
      );
      this.RecipeID = this.DinnerRecipe.id;
      this.Title = this.DinnerRecipe.title;
      this.imgURL = this.DinnerRecipe.image;
      await this.getNutritionByRecipeID();
      console.log(this.DinnerRecipe);
    },
    async getNutritionByRecipeID() {
      this.Nutrients = await this.$spoonAPI.getNutritionByRecipeID(
        this.RecipeID
      );
      this.Calories = this.Nutrients.calories;
      this.Carbs = this.Nutrients.carbs;
      this.Fat = this.Nutrients.fat;
      this.Protein = this.Nutrients.protein;
      this.CaloricBreakdown = this.Nutrients.caloricBreakdown;
      this.percentCarbs = this.Nutrients.caloricBreakdown.percentCarbs;
      this.percentFat = this.Nutrients.caloricBreakdown.percentFat;
      this.percentProtein = this.Nutrients.caloricBreakdown.percentProtein;
      this.Ingredients = this.Nutrients.ingredients;
      this.Vitamins = this.Nutrients.nutrients;
      this.GlycemicIndex = this.Nutrients.properties[0].amount;
      this.GlycemicLoad = this.Nutrients.properties[1].amount;
    },
  },
};
</script>

<style></style>
