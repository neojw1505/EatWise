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
    this.BASE_URL = "https://api.spoonacular.com";
    this.apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

    // Initialize axios with a base URL and default parameters
    this.axios = axios.create({
      baseURL: this.BASE_URL,
      params: {
        apiKey: this.apiKey, // Inject the API key into every request
      },
    });
  }

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

  // Get recipes by nutrients
  async getRecipesByNutrients(nutrients, number) {
    try {
      const response = await this.axios.get("/recipes/findByNutrients", {
        params: {
          nutrients: nutrients.join(","), // Join the array into a comma-separated string
          number: number, // You can adjust the number of recipes to fetch
        },
      });
      // Handle the response and return the recipes
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching recipes by nutrients:", error);
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

  async getNutritionByRecipeID(recipeID) {
    try {
      const response = await this.axios.get(`/recipes/${recipeID}/nutritionWidget.json`);
      // Handle the response and return the nutrition data
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error(`Error fetching nutrition for recipe with ID ${recipeID}:`, error);
      throw error;
    }
  }
}

const spoonacularObj = new SpoonacularAPI();

export default spoonacularObj;
