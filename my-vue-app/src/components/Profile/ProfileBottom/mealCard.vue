<template>
    <!-- <router-link :to="routerTO"> -->
      <div class="card cardStyle mx-2 px-0 mb-auto">
        <div class="text-center m-1 fw-semibold">{{mealType}}</div>
        <img class="card-img-top mx-auto rounded-6" :src="recipe.image" alt="Recipe Image" />
        <div class="card-body img-fluid">
          <h4 class="card-title" style="font-size: large; height: 50px">
            {{ formattedRecipeName }}
          </h4>
          <p class="card-text">{{recipe.cal}}cal</p>
        </div>
      </div>
    <!-- </router-link> -->
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
  
    props: ["recipe", "routerTO","mealType"],
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
    },
    created(){
      // console.log(this.recipe);
      this.getSelectedRecipeNutritions();
    },  
  };
  </script>
  
  <style scoped>
  .cardStyle {
    border: 1px solid #FFF;
    border-radius: 20px;
    width: 200px;
    height: 280px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.62) 71.87%, rgba(0, 0, 0, 0.00) 100%);
    color: white;
  }
  </style>
  
