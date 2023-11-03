
<template>
  <div class="row" style="height: 100%;"> 
    <div class="col-md-6 rounded-4 d-flex my-auto align-items-center justify-content-center" >
      <img class="img-fluid rounded-4 col-10 " :src="imgUrl" alt="Recipe Image" style="object-fit: fill;"/>
    </div>
    <div class="col-md-6 text-start my-auto">
      <h1 class="fw-bold mb-3" style="font-size:5vw;">Recipe of the Day</h1>
      <br/>
      <h4 style="font-size:1.5vw;">{{ formattedRecipeName }}</h4>
      <br/>
      <p style="font-size:1vw;">Preparation Time: <strong>{{ PrepTime }} minutes</strong> </p>
      <br/>
      <p style="font-size:0.9vw; overflow: hidden;">Description: {{ formattedDescriptionName }}</p>
      <div class="row">
            <span v-for="(diet, index) in Diets" :key="index" class=" mx-2 px-2 py-2 col-3 my-1 rounded-4 text-wrap" style="background-color: #7A8CEA; color: white;">{{ diet }} </span>
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

    formattedDescriptionName() {
      return this.splicedDescription.length > 350
        ? this.splicedDescription.slice(0, 347) + "..."
        : this.splicedDescription;
    },

    splicedDescription(){
    var spliceOne = this.Summary.replaceAll("<ol>", ' ')
    var spliceTwo = spliceOne.replaceAll("<li>", ' ')
    var spliceThree = spliceTwo.replaceAll("</li>", ' ')
    var spliceFour = spliceThree.replaceAll("</ol>", ' ')
    var spliceFive = spliceFour.replaceAll("<span>",' ')
    var spliceSix = spliceFive.replaceAll("</span>",' ')
    return spliceSix
    }
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
