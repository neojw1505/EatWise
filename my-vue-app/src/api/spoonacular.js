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
      },
      })
    };
  

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
  async getBreakfastRecipe(breakfastCategories, number) {
    try {
      // Make a request to the Spoonacular API for random recipes
      const response = await this.axios.get("/recipes/random", {
        params: {
          number: number, // Number of recipes to retrieve
        },
      });

      // Get the random recipe data
      const randomRecipes = response.data.recipes;

      // Filter recipes to find a breakfast recipe
      const breakfastRecipe = randomRecipes.find((recipe) =>
        recipe.dishTypes.some((dishType) =>
          breakfastCategories.includes(dishType.toLowerCase())
        )
      );

      if (breakfastRecipe) {
        // If a breakfast recipe is found, return it
        return breakfastRecipe;
      } else {
        // If no breakfast recipe is found, recursively call the function again to get more random recipes
        return this.getBreakfastRecipe(breakfastCategories, number);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching random breakfast recipe:", error);
      throw error;
    }
  }

  async getLunchRecipe(lunchCategories, number) {
    try {
      // Make a request to the Spoonacular API for random recipes
      const response = await this.axios.get("/recipes/random", {
        params: {
          number: number, // Number of recipes to retrieve
        },
      });

      // Get the random recipe data
      const randomRecipes = response.data.recipes;

      // Filter recipes to find a lunch recipe
      const lunchRecipe = randomRecipes.find((recipe) =>
        recipe.dishTypes.some((dishType) =>
          lunchCategories.includes(dishType.toLowerCase())
        )
      );

      if (lunchRecipe) {
        // If a lunch recipe is found, return it
        return lunchRecipe;
      } else {
        // If no lunch recipe is found, recursively call the function again to get more random recipes
        return this.getLunchRecipe(lunchCategories, number);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching random lunch recipe:", error);
      throw error;
    }
  }

  // Function to get a single random dinner recipe
  async getDinnerRecipe(dinnerCategories, number) {
    try {
      // Make a request to the Spoonacular API for random recipes
      const response = await this.axios.get("/recipes/random", {
        params: {
          number: number, // Number of recipes to retrieve
        },
      });

      // Get the random recipe data
      const randomRecipes = response.data.recipes;

      // Filter recipes to find a dinner recipe
      const dinnerRecipe = randomRecipes.find((recipe) =>
        recipe.dishTypes.some((dishType) =>
          dinnerCategories.includes(dishType.toLowerCase())
        )
      );

      if (dinnerRecipe) {
        // If a dinner recipe is found, return it
        return dinnerRecipe;
      } else {
        // If no dinner recipe is found, recursively call the function again to get more random recipes
        return this.getDinnerRecipe(dinnerCategories, number);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching random dinner recipe:", error);
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
    excludeIngredients = []
  ) {
    try {
      const mealTypesQuery = mealTypes.join(",");
      const dietTypesQuery = dietTypes.join(",");
      const includeIngredientsQuery = includeIngredients.join(",");
      const excludeIngredientsQuery = excludeIngredients.join(",");
      const response = await this.axios.get(
        `/recipes/complexSearch?query=${query}&diet=${dietTypesQuery}&type=${mealTypesQuery}&includeIngredients=${includeIngredientsQuery}&excludeIngredients=${excludeIngredientsQuery}&number=${number}`
      );
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
      throw error;
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
      console.log(response.data);
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
}

const spoonacularObj = new SpoonacularAPI();

export default spoonacularObj;
