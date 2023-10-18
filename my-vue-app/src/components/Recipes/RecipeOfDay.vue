<template>
  <div
    class="shadow p-3 rounded-5 my-3"
    style="background-color: #fbe8a6"
  >
    <h1 class="fw-bold mb-3">Recipe of the Day</h1>
    <div class="rando-recipe-content row">
      <!-- show the image of recipe of the day -->
      <div class="rando-recipe-img col-sm-12 col-md-6">
        <img class="rando-img img-fluid" :src="imgUrl" alt="Recipe Image" />
      </div>
      <!-- show the recipe description -->
      <div class="col-sm-12 col-md-6">
        <h4 class="">{{ formattedRecipeName }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      RandomRecipe: null,
      Title: "",
      DishTypes: [],
      Diets: [],
      PrepTime: "",
      imgUrl: "",
      CookingSteps: [],
      Summary: "",
    };
  },
  created() {
    this.getRandomRecipe(); // Automatically call getRandomRecipe on component load
  },

  methods: {
    async getRandomRecipe() {
      let RandomRecipeObj = await this.$spoonAPI.getRandomRecipe();
      this.RandomRecipe = RandomRecipeObj.recipes[0];
      this.Title = this.RandomRecipe.title;
      this.DishTypes = this.RandomRecipe.dishTypes;
      this.Diets = this.RandomRecipe.diets;
      this.PrepTime = this.RandomRecipe.readyInMinutes;
      this.imgUrl = this.RandomRecipe.image;
      this.CookingSteps = this.RandomRecipe.analyzedInstructions;
      this.Summary = this.RandomRecipe.instructions;
      console.log(this.CookingSteps);
    },
  },
  computed: {
    //in the event that the name of the recipe is too long, we shorten the name
    formattedRecipeName() {
      return this.Title.length > 60
        ? this.Title.slice(0, 57) + "..."
        : this.Title;
    },
  },
};
</script>

<style scoped>
.rando-recipe-header {
  color: black;
  font-size: 1.5em;
  word-wrap: break-word;
  margin-bottom: 10px;
}

.rando-recipe-content {
  display: flex;
  align-items: top;
  max-height: 100%;
}

.rando-recipe-img {
  border-radius: 1.2rem;
  max-width: 100%;
  max-height: 100%;
}

.rando-img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  border-radius: 20px;
}

.recipe-title {
  margin-left: 1.5rem;
  color: black;
  font-size: 2rem;
  font-weight: 400;
  word-wrap: break-word;
  max-width: none;
  max-height: none;
  overflow: hidden;
  flex-grow: 1;
}

.recipe-content {
  margin-left: 1.5rem;
  color: black;
  font-size: 1.5rem;
  word-wrap: break-word;
  max-width: none;
  font-weight: 400;
  max-height: none;
  overflow: hidden;
  flex-grow: 1;
}
</style>
