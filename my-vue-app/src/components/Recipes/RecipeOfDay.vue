<template>
  <div class="container">
    <div class="row">
      <div class="rando-recipe">
        <div class="rando-recipe-header">
          <h1 class="fw-bold">Recipe of the Day</h1>
        </div>
        <div class="rando-recipe-content">
          <div class="rando-recipe-img">
            <img class="rando-img img-fluid" :src="imgUrl" alt="Recipe Image">
          </div>
          <div class="rando-recipe-info">
            <h4 class="recipe-title">{{ Title }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      RandomRecipe: null,
      Title: '',
      DishTypes: [],
      Diets: [],
      PrepTime: '',
      imgUrl: '',
      CookingSteps: [],
      Summary: '',
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
};
</script>

<style scoped>

 .rando-recipe {
  background: #FBE8A6;
  border-radius: 40px;
  padding: 1.5rem;
  max-height: 30rem;
  box-shadow: 5px 5px 10px #888888;
 }

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
  box-shadow: 5px 5px 10px #888888;
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
