<template>
    <!-- <router-link :to="routerTO"> -->
      <div class="card cardStyle mx-2 px-0 mb-2">
        <div class="text-center m-1 fw-semibold">{{mealType}}</div>
        <img class="card-img-top mx-0" :src="recipe.image" alt="Recipe Image" />
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
      // async getSelectedRecipeNutritions() {
      //   let recipeObj= await this.$spoonAPI.getSelectedRecipeNutritions(this.recipe.id);
      //   this.cal=recipeObj.calories;
      // },
    },
    created(){
      // console.log(this.recipe);
      // this.getSelectedRecipeNutritions();
    },  
  };
  </script>
  
  <style scoped>
  .cardStyle {
    border: #FFB18D solid 1px;
    border-bottom-left-radius: 30px;
    width: 200px;
    height: 280px;
    background-image: linear-gradient(to bottom right, #ff5100, #fac400);
    color: black;
  }
  .cardStyle:hover {
    cursor: pointer;
  }
  </style>
  