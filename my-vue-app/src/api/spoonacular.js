import axios from 'axios';

class SpoonacularAPI {
    constructor(apiKey) {
        this.BASE_URL = 'https://api.spoonacular.com';
        this.apiKey = apiKey;
        
        // Initialize axios with a base URL and default parameters
        this.axios = axios.create({
          baseURL: this.BASE_URL,
          params: {
            apiKey: this.apiKey, // Inject the API key into every request
          },
        });
      }

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
}

const spoonacularObj = new SpoonacularAPI();

export default spoonacularObj;
