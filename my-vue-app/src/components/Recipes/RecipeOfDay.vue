
<template>
  <div class="row">
    <div class="col-lg-8 col-md-12 pt-2 shadow border rounded-4 px-4 my-3 mx-1" style="background-color: #fbe8a6">
      <h1 class="fw-bold mb-3">Recipe of the Day</h1>
      <div class="row py-3 pt-0">
        <div class="col-sm-12 col-md-6">
          <img class="img-fluid rounded-3" :src="imgUrl" alt="Recipe Image" />
        </div>
        <div class="col card border-0 pt-2 shadow">
          <h4>{{ formattedRecipeName }}</h4>
          <p>Preparation Time: <strong>{{ PrepTime }} minutes</strong> </p>

          <div class="diet-types d-flex flex-wrap my-2">
            <span v-for="(diet, index) in Diets" :key="index" class=" mx-2 px-2 my-1 rounded-4 text-wrap" style="background-color: #FFB18D;">{{ diet }}</span>
          </div>
          <p>Dish Types: <strong>{{ DishTypes.join(', ') }}</strong></p>
        </div>
      </div>
    </div>
    <div class="pt-2 shadow border rounded-4 my-3 col-lg col-md-12 d-flex flex-column align-items-center justify-content-between mx-1" v-if="windowWidth > 992">
      <div class="shadow border rounded-4">{{ RandomFoodFact }}</div>
      <div class="shadow border rounded-4">{{ RandomFoodJoke }}</div>
      <div class="shadow border rounded-4">{{ DailyCalories }} Calories</div>
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
      windowWidth: window.innerWidth,
      DailyCalories: 0,
      RandomFoodJoke: '',
      RandomFoodFact: ''
    };
  },
  created() {
    // Call getRandomRecipe immediately on component load
    this.getRandomRecipe();
    this.getUserDailyCaloriesFromFB();
    this.getRandomFoodJokeFromFB();
    this.getRandomFoodFactFromFB();

    // Calculate the time until midnight
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // Next day at midnight
      0, 0, 0
    );
    const timeUntilMidnight = midnight - now;

    // Schedule getRandomRecipe to run at midnight
    setTimeout(() => {
      this.getRandomRecipe();
    }, timeUntilMidnight);
  },

  methods: {
    async getRandomRecipe() {
      let RandomRecipeObj = await this.$smAPI.getRecipeOfDayFromFB() ?? await this.$smAPI.setRecipeOfDayInFB();
      console.log(RandomRecipeObj);
      this.RandomRecipe = RandomRecipeObj.recipes.recipes[0];
      this.Title = this.RandomRecipe.title;
      this.DishTypes = this.RandomRecipe.dishTypes;
      this.Diets = this.RandomRecipe.diets;
      this.PrepTime = this.RandomRecipe.readyInMinutes;
      this.imgUrl = this.RandomRecipe.image;
      this.CookingSteps = this.RandomRecipe.analyzedInstructions;
      this.Summary = this.RandomRecipe.instructions;
    },
    onResize() {
      this.windowWidth = window.innerWidth
      // console.log(this.windowWidth)
    },
    async getRandomFoodJokeFromFB() {
      let RandomFoodJokeObj = await this.$smAPI.getRandomFoodJokeFromFB() ?? await this.$smAPI.setRandomFoodJokeInFB();
      this.RandomFoodJoke = RandomFoodJokeObj.joke.text
      console.log(RandomFoodJokeObj.joke.text);
    },
    async getRandomFoodFactFromFB() {
      let RandomFoodFactObj = await this.$smAPI.getRandomFoodFactFromFB() ?? await this.$smAPI.setRandomFoodFactInFB();
      this.RandomFoodFact = RandomFoodFactObj.Fact.text
      console.log(RandomFoodFactObj.Fact.text);
    },
    async getUserDailyCaloriesFromFB() {
      let user = await this.$smAPI.getLoginUserProfile();
      this.DailyCalories = user.DailyCalories;
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
