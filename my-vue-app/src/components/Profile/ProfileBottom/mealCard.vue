<template>
  <!-- <router-link :to="routerTO"> -->
    <div @click="selectRecipe" class="card cardStyle mx-2 px-0 my-2" :style="{'background-image':'url(' + recipeImage + ')','background-size': 'cover','background-position': 'center'}">
    <div class="text-center m-1 fw-bold fs-5 text-white">{{ mealType.charAt(0).toUpperCase() + mealType.slice(1) }}</div>
    <div class="recipeInfo p-1 px-2">
      <div class="card-title fw-semibold" style="font-size: large; height: 50px">
        {{ formattedRecipeName }}
      </div>
      <p class="card-text text-warning ">{{cal.toFixed(1)}} kcal</p>
    </div>
  </div>
  <!-- </router-link> -->
</template>

<script>
export default {
  name: "FindRecipePreviewCard",
  data() {
    return {
      cal:this.mealDetails.recipe.nutrition.nutrients[0].amount,
      recipeTitle: this.mealDetails.recipe.title,
      recipeImage: this.mealDetails.recipe.image,
      timeConsumed: this.mealDetails.timeConsumed
    };
  },
  //recipe is an object which consist of recipeName,image and cal.
  //routerTo is the path which will bring the user to view the complete recipe

  props: [ "mealType", "mealDetails"],
  computed: {
    //in the event that the name of the recipe is too long, we shorten the name
    formattedRecipeName() {
      return this.recipeTitle.length > 30
        ? this.recipeTitle.slice(0, 27) + "..."
        : this.recipeTitle;
    },
    
  },
  methods: {
    async selectRecipe() {
      this.$store.dispatch('setSharedData', this.recipe);
      localStorage.setItem('selectedRecipe', JSON.stringify(this.recipe)); // Save to local storage
      this.$router.push({ path: '/find-recipes/SelectedRecipeCard' }); // Navigate to the receiver component
    },
  },
  created() {
    // console.log(this.recipe);
    // this.getSelectedRecipeNutritions();
  },
};
</script>

<style scoped>
.cardStyle {
  border: white solid 1px;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  color: white;
  transition: transform 0.3s;
  position: relative;
}
.cardStyle:hover {
  cursor: pointer;
}
.recipeInfo{
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.5)
  );
  position: absolute;
  bottom: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 100%;
}
</style>
