import axios from 'axios';

class SpoonacularAPI {
    constructor() {
        this.BASE_URL = 'https://api.spoonacular.com';
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
            const response = await this.axios.get('/recipes/random');
            // Handle the response and return the random recipe data
            return response.data;
        } catch (error) {
            // Handle errors here
            console.error('Error fetching random recipe:', error);
            throw error;
        }
    }

    // Get recipes by an array of ingredients
    async getRecipesByIngredients(ingredients, number) {
      try {
        const response = await this.axios.get('/recipes/findByIngredients', {
          params: {
            ingredients: ingredients.join(','), // Join the array into a comma-separated string
            number: number, // You can adjust the number of recipes to fetch
          },
        });
        // Handle the response and return the recipes
        return response.data;
      } catch (error) {
        // Handle errors here
        console.error('Error fetching recipes by ingredients:', error);
        throw error;
      }
    }

      // Get recipes by nutrients
  async getRecipesByNutrients(nutrients, number) {
    try {
      const response = await this.axios.get('/recipes/findByNutrients', {
        params: {
          nutrients: nutrients.join(','), // Join the array into a comma-separated string
          number: number, // You can adjust the number of recipes to fetch
        },
      });
      // Handle the response and return the recipes
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching recipes by nutrients:', error);
      throw error;
    }
  }
}

const spoonacularObj = new SpoonacularAPI();

export default spoonacularObj;
