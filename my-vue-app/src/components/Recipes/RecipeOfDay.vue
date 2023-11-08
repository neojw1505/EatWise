
<template>
  <div>
    <h1 class="fw-bold text-center " style="color:#000;"><span style="color:#7A8CEA">Recipe</span> Of The Day</h1>

    <div class="row"> 
      <div class="col-md-6 col-sm-8 mx-auto rounded-4 d-flex my-auto mx-2 align-items-center justify-content-center">
        <img @click="selectRecipe" class="img-fluid rounded-4 col" :src="imgUrl" alt="Recipe Image" style="object-fit: contain;" />
      </div>
      <div class="col-md col-sm-8  mx-auto text-start my-auto mx-4">
        <br/>
        <h2 class="fw-bold" @click="selectRecipe" >{{ formattedRecipeName }}</h2>
        <br/>
        <p><span class="fw-semibold">Preparation Time:</span> <span>{{ PrepTime }} minutes</span> </p>
        <br/>
        <p style="overflow: hidden; " ><span class="fw-semibold">Description:</span> {{ formattedDescriptionName }}</p>
        <div class="d-inline-block pt-2 d-flex flex-wrap">
          <div v-for="(diet, index) in Diets" :key="index" class="p-2 mb-1 me-2 rounded-4 text-wrap" style="background-color: #7A8CEA; color: white; white-space: nowrap;">{{ diet }}</div>
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
    },
    async selectRecipe() {
      this.$store.dispatch('setSharedData', this.RandomRecipe);
      localStorage.setItem('selectedRecipe', JSON.stringify(this.RandomRecipe)); // Save to local storage
      this.$router.push({ path: '/find-recipes/SelectedRecipeCard' }); // Navigate to the receiver component
    },
    async setRecipeOfDay(){
      await this.$smAPI.setRecipeOfDayInFB();
    },
    refreshRecipeOfDay() {
      const targetTime = new Date();
      targetTime.setHours(23); // 11 PM
      targetTime.setMinutes(59); // 59 minutes
      targetTime.setSeconds(59); // 59 seconds
       // Calculate the time interval until the target time
      const now = new Date();
      let timeUntilTarget = targetTime - now;
      if (timeUntilTarget < 0) {
        // If the target time has already passed today, schedule it for the same time tomorrow
        timeUntilTarget += 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      }

      // Schedule the refresh methods to run at 11:59:59 PM every day
      setTimeout(() => {
        this.setRecipeOfDay();
        // Schedule the methods to run every 24 hours
        setInterval(() => {
          this.setRecipeOfDay();
        }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
      }, timeUntilTarget);
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
    this.refreshRecipeOfDay()
  },

  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
};
</script>

<style scoped>
  
@media screen and (min-width: 735px) {
  h1 {
    font-size: 80px;
  }
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 40px;
  }
}
</style>
