<template>
    <!-- <router-link :to="routerTO"> -->
      <div @click="selectRecipe" class="card cardStyle mx-2 px-0 my-2">
        <img class="card-img-top mx-0" :src="recipe.image" alt="Recipe Image" />
        <div class="card-body img-fluid">
          <h4 class="card-title" style="font-size: large; height: 50px" >
            {{ formattedRecipeName }}
          </h4>
          <p class="card-text">{{recipe.nutrition.calories}} kcals</p>
        </div>
      </div>
    <!-- </router-link> -->
  </template>
  
  <script>
  export default {
    name: "SavedRecipeCard",
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
        console.log(this.recipe)
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
        // Use router to navigate to the SelectedRecipe component with the recipe id as a parameter
        this.$router.push({ path: '/find-recipes/SelectedRecipeCard/:id', qeury:{id: "1234" }})
      },
    },
    
  };
  </script>
  
  <style scoped>
  .cardStyle {
    border: #FFB18D solid 1px;
    border-bottom-left-radius: 30px;
    width: 200px;
    height: 250px;
    background-image: linear-gradient(to bottom right, #ff5100, #fac400);
    color: black;
    transition: transform 0.3s;
  }
  .cardStyle:hover {
    transform: scale(1.05); /* Scale up by 10% on hover */
    cursor: pointer;
  }
  </style>
  