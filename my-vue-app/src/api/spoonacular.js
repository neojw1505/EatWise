import axios from "axios";

const dietTypes = [
  "gluten free",
  "dairy free",
  "pescatarian",
  "lacto ovo vegetarian",
  "paleolithic",
  "primal",
  "whole 30",
  "vegan",
];

class SpoonacularAPI {
  constructor() {

    this.BASE_URL =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
    this.BASE_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

    // Initialize axios with a base URL and default parameters
    this.axios = axios.create({
      baseURL: this.BASE_URL,
      headers: {

        "X-RapidAPI-Key": import.meta.env.VITE_SPOONACULAR_API_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },})}


  // get a random recipe
  async getRandomRecipe() {
    try {
      const response = await this.axios.get("/recipes/random");
      // Handle the response and return the random recipe data
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching random recipe:", error);
      throw error;
    }
  }

  // Get recipes by an array of ingredients
  async getRecipesByIngredients(ingredients, number) {
    try {
      const response = await this.axios.get("/recipes/findByIngredients", {
        params: {
          ingredients: ingredients.join(","), // Join the array into a comma-separated string
          number: number, // You can adjust the number of recipes to fetch
        },
      });
      // Handle the response and return the recipes
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching recipes by ingredients:", error);
      throw error;
    }
  }

  // Function to get a single random breakfast recipe
  async getBreakfastRecipe(dietType='') {
    try {
      // Make a request to the Spoonacular API for random recipes
      const response = await this.axios.get("/recipes/random", {
        params: {
          number: 1, // Number of recipes to retrieve
          tags: dietType != '' ? `${dietType},breakfast` : 'breakfast'
        },
      });
        // Get the random recipe data
        const randomBreakfastRecipe = response.data.recipes;
        return randomBreakfastRecipe

    } catch (error) {
      // Handle errors here
      console.error("Error fetching random breakfast recipe:", error);
      throw error;
    }
  }

    // Function to get a single random breakfast recipe
    async getLunchRecipe(dietType='') {
      try {
        // Make a request to the Spoonacular API for random recipes
        const response = await this.axios.get("/recipes/random", {
          params: {
            number: 1, // Number of recipes to retrieve
            tags: dietType != '' ? `${dietType},lunch` : 'lunch'
          },
        });
          // Get the random recipe data
          const randomLunchRecipe = response.data.recipes;
          return randomLunchRecipe
  
      } catch (error) {
        // Handle errors here
        console.error("Error fetching random Lunch recipe:", error);
        throw error;
      }
    }

      // Function to get a single random breakfast recipe
  async getDinnerRecipe(dietType='') {
    try {
      // Make a request to the Spoonacular API for random recipes
      const response = await this.axios.get("/recipes/random", {
        params: {
          number: 1, // Number of recipes to retrieve
          tags: dietType != '' ? `${dietType},dinner` : 'dinner'
        },
      });
        // Get the random recipe data
        const randomDinnerRecipe = response.data.recipes;
        return randomDinnerRecipe

    } catch (error) {
      // Handle errors here
      console.error("Error fetching random Dinner recipe:", error);
      throw error;
    }
  }
  ///find-recipes
  // return list of filtered recipes based on users filter selection
  async getFilteredRecipes(
    mealTypes = [],
    dietTypes = [],
    query = "",
    number = 10,
    includeIngredients = [],
    excludeIngredients = [],
    minCal = 0,
    maxCal = 10000
  ) {
    try {
      const fullSearchQuery = [];

      if (mealTypes.length > 0) fullSearchQuery.push(`type=${mealTypes.join(",")}`);
      if (dietTypes.length > 0) fullSearchQuery.push(`diet=${dietTypes.join(",")}`);
      if (query) fullSearchQuery.push(`query=${query}`);
      if (includeIngredients.length > 0) fullSearchQuery.push(`includeIngredients=${includeIngredients.join(",")}`);
      if (excludeIngredients.length > 0) fullSearchQuery.push(`excludeIngredients=${excludeIngredients.join(",")}`);
      
      fullSearchQuery.push(`number=${number}`);
      fullSearchQuery.push(`minCalories=${minCal}`);
      fullSearchQuery.push(`maxCalories=${maxCal}`);
      
      const queryString = fullSearchQuery.join('&');
      console.log(queryString);
      const response = await this.axios.get(`/recipes/complexSearch?${queryString}`);
      
      // extract the ids
      const recipeIDsArr = [];
      // console.log(response.data);
      for (const recipe of response.data.results) {
        recipeIDsArr.push(recipe.id);
      }
      // create ids as string join with commas
      const recipeIDsQuery = recipeIDsArr.join(",");
      const response2 = await this.axios.get(
        `/recipes/informationBulk?ids=${recipeIDsQuery}&includeNutrition=true`
      );
      return response2.data;
    } catch (error) {
      // Handle errors here
      // console.error(`Error fetching nutrition for recipe with ID ${recipeID}:`, error);
      // throw error;
      console.log("no recipe found")
      return [];

    }
  }

  // args: recipeID,
  // desc: return the ingredients of the recipe
  async getSelectedRecipeIngredients(id) {
    try {
      const response = await this.axios.get(
        `/recipes/${id}/ingredientWidget.json`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // args: recipeID,
  // desc: return the nutrients of the recipe
  async getSelectedRecipeNutritions(id) {
    try {
      const response = await this.axios.get(
        `/recipes/${id}/nutritionWidget.json`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // args: recipeID,
  // desc: return the instructions of the recipe
  async getSelectedRecipeInstructions(id){
    try {
      const response = await this.axios.get(
        `recipes/${id}/information`
      );
      console.log(response.data);
      return response.data.analyzedInstructions[0].steps;
    } catch (error) {
      throw error;
    }
  }

  // args: recipeID,
  // desc: return the name, prep time, serving size, description of the recipe
  async getSelectedRecipeGeneralInfo(id){
    try {
      const response = await this.axios.get(
        `recipes/${id}/information`
      );
      const name = response.data.title;
      const prepTime = response.data.readyInMinutes;
      const servingSize = response.data.servings;
      const description = response.data.summary;

      let obj = {}
      obj.name = name
      obj.prepTime = prepTime
      obj.servingSize = servingSize
      obj.description = description
      console.log(obj);
      return obj;
    } catch (error) {
      throw error;
    }
  }

  // get random food joke 
  async getRandomFoodJoke(){
    try {
      const response = await this.axios.get('/food/jokes/random')
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // get random food fact 
  async getRandomFoodFact(){
    try {
      const response = await this.axios.get('/food/trivia/random')
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}


const spoonacularObj = new SpoonacularAPI();

export default spoonacularObj;
