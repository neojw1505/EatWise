<template>
  <div @click="selectRecipe" class="card cardStyle mx-2 px-0 my-2" :style="{'background-image':'url(' + recipe.image + ')','background-size': 'cover'}">
    <!-- <img class="card-img-top mx-0" :src="recipe.image" alt="Recipe Image" /> -->
    <div class="recipeInfo p-1 px-2">
      <div class="card-title fw-semibold" style="font-size: large; height: 50px" >
        {{ formattedRecipeName }}
      </div>
      <p class="card-text">{{recipe.nutrition.nutrients[0].amount.toFixed(0)}} kcals</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "FindRecipePreviewCard",
  data(){return{
    cal:null
  }
  },
  //recipe is an object which consist of recipeName,image and cal.
  //routerTo is the path which will bring the user to view the complete recipe

  props: ["recipe", "routerTO"],
  
  computed: {
    //in the event that the name of the recipe is too long, we shorten the name
    formattedRecipeName() {
      return this.recipe.title.length > 30
        ? this.recipe.title.slice(0, 27) + "..."
        : this.recipe.title;
    },
  },
  methods: {
    async getSelectedRecipeNutritions() {
      let recipeObj= await this.$spoonAPI.getSelectedRecipeNutritions(this.recipe.id);
      this.cal=recipeObj.calories;
    },
    async selectRecipe() {
      this.$store.dispatch('setSharedData', this.recipe);
      localStorage.setItem('selectedRecipe', JSON.stringify(this.recipe)); // Save to local storage
      this.$router.push({ path: '/find-recipes/SelectedRecipeCard' }); // Navigate to the receiver component
    },
  },
  
};
</script>

<style scoped>
.cardStyle {
  border: white solid 1px;
  border-radius: 20px;
  width: 200px;
  height: 250px;
  color: white;
  transition: transform 0.3s;
  position: relative;
}
.cardStyle:hover {
  transform: scale(1.05); /* Scale up by 10% on hover */
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
  width: 198px;
}
</style>
