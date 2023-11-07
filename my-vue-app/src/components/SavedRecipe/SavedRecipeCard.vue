<template>
  <!-- <router-link :to="routerTO"> -->
  <div
    @click="selectRecipe"
    class="card cardStyle mx-2 px-0 my-2"
    :style="{
      'background-image': 'url(' + recipe.image + ')',
      'background-size': 'cover',
      'background-position': 'center',
    }"
  >
    <div class="recipeInfo p-1 px-2">
      <h4 class="card-title fw-semibold" style="font-size: large; height: 50px">
        {{ formattedRecipeName }}
      </h4>
      <p class="card-text text-warning">{{ formattedCal }} kcals</p>
    </div>
  </div>
  <!-- </router-link> -->
</template>

<script>
export default {
  name: "SavedRecipeCard",
  data() {
    return {
      cal: null,
    };
  },
  //recipe is an object which consist of recipeName,image and cal.
  //routerTo is the path which will bring the user to view the complete recipe

  props: ["recipe", "routerTO"],
  computed: {
    //in the event that the name of the recipe is too long, we shorten the name
    formattedRecipeName() {
      // console.log(this.recipe)
      return this.recipe.title.length > 30
        ? this.recipe.title.slice(0, 27) + "..."
        : this.recipe.title;
    },
    formattedCal() {
      if (this.recipe.nutrition.calories) {
        return this.recipe.nutrition.calories;
      }
      return this.recipe.nutrition.nutrients[0].amount.toFixed(0);
    },
  },
  methods: {
    async getSelectedRecipeNutritions() {
      let recipeObj = await this.$spoonAPI.getSelectedRecipeNutritions(
        this.recipe.id
      );
      this.cal = recipeObj.calories;
    },
    async selectRecipe() {
      this.$store.dispatch("setSharedData", this.recipe);
      this.$router.push({ path: "/find-recipes/SelectedRecipeCard" }); // Navigate to the receiver component
      localStorage.setItem("selectedRecipe", JSON.stringify(this.recipe)); // Save to local storage
    },
  },
};
</script>

<style scoped>
.cardStyle {
  border: white solid 1px;
  border-radius: 20px;
  width: 250px;
  height: 200px;
  color: white;
  transition: transform 0.3s;
  position: relative;
}
.cardStyle:hover {
  transform: scale(1.05); /* Scale up by 10% on hover */
  cursor: pointer;
}

.recipeInfo {
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
