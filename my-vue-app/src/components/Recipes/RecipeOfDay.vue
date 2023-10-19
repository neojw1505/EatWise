<template>
  <div class="row">
    <div
      class="col-lg-8 col-md-12  pt-2 shadow border rounded-5 px-4 my-3 mx-1 "
      style="background-color: #fbe8a6"
    >
      <h1 class="fw-bold mb-3">Recipe of the Day</h1>
      <div class="row py-3 pt-0">
        <!-- show the image of recipe of the day -->
        <div class="col-sm-12 col-md-6">
          <img class="img-fluid rounded-5" :src="imgUrl" alt="Recipe Image" />
        </div>
        <!-- show the recipe description -->
        <div class="col-sm-12 col-md-6">
          <h4>{{ formattedRecipeName }}</h4>
        </div>
      </div>
    </div>
    <!-- joke of the day -->
    <div
      class="pt-2 shadow border rounded-5 my-3 col-lg col-md-12 d-flex flex-column align-items-center justify-content-between mx-1"
      v-if="windowWidth>992"
    >
      <div class="shadow border rounded-4">Random Food Fact?</div>
      <div class="shadow border rounded-4">Random Food Joke?</div>
      <div class="shadow border rounded-4">Calories Tracker?</div>
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
      windowWidth: window.innerWidth
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
    onResize() {
      this.windowWidth = window.innerWidth
      console.log(this.windowWidth)
    }
  },
  computed: {
    //in the event that the name of the recipe is too long, we shorten the name
    formattedRecipeName() {
      return this.Title.length > 60
        ? this.Title.slice(0, 57) + "..."
        : this.Title;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },

  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
};
</script>

<style scoped>

</style>
