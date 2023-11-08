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
    this.BASE_URL =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

    // Initialize axios with a base URL and default parameters
    this.axios = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_SPOONACULAR_API_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
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

  // Function to get a single random breakfast recipe
  async getBreakfastRecipe(dietType = "") {
    try {
      // Make a request to the Spoonacular API for random recipes
      const response = await this.axios.get("/recipes/random", {
        params: {
          number: 1, // Number of recipes to retrieve
          tags: dietType != "" ? `${dietType},breakfast` : "breakfast",
        },
      });
      // Get the random recipe data
      const randomBreakfastRecipe = response.data.recipes;
      return randomBreakfastRecipe;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching random breakfast recipe:", error);
      throw error;
    }
  }

  // Function to get a single random breakfast recipe
  async getLunchRecipe(dietType = "") {
    try {
      // Make a request to the Spoonacular API for random recipes
      const response = await this.axios.get("/recipes/random", {
        params: {
          number: 1, // Number of recipes to retrieve
          tags: dietType != "" ? `${dietType},lunch` : "lunch",
        },
      });
      // Get the random recipe data
      const randomLunchRecipe = response.data.recipes;
      return randomLunchRecipe;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching random Lunch recipe:", error);
      throw error;
    }
  }

  // Function to get a single random breakfast recipe
  async getDinnerRecipe(dietType = "") {
    try {
      // Make a request to the Spoonacular API for random recipes
      const response = await this.axios.get("/recipes/random", {
        params: {
          number: 1, // Number of recipes to retrieve
          tags: dietType != "" ? `${dietType},dinner` : "dinner",
        },
      });
      // Get the random recipe data
      const randomDinnerRecipe = response.data.recipes;
      return randomDinnerRecipe;
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
    excludeIngredientsArr = [],
    minCal = 0,
    maxCal = 10000
  ) {
    try {
      const fullSearchQuery = [];

      if (mealTypes.length > 0)
        fullSearchQuery.push(`type=${mealTypes.join(",")}`);
      if (dietTypes.length > 0)
        fullSearchQuery.push(`diet=${dietTypes.join(",")}`);
      if (query) fullSearchQuery.push(`query=${query}`);
      if (includeIngredients.length > 0)
        fullSearchQuery.push(
          `includeIngredients=${includeIngredients.join(",")}`
        );

      fullSearchQuery.push(`number=${number}`);
      fullSearchQuery.push(`minCalories=${minCal}`);
      fullSearchQuery.push(`maxCalories=${maxCal}`);

      const queryString = fullSearchQuery.join("&");
      console.log(queryString);
      const response = await this.axios.get(
        `/recipes/complexSearch?${queryString}`
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
      console.log("Exclude Ingredients:" + excludeIngredientsArr);

      for (let i = 0; i < response2.data.length; i++) {
        let recipe = response2.data[i];
        let recipeIngredients = recipe.nutrition.ingredients;
        let recipeIngredientArr = [];
        for (let recipeIngredient of recipeIngredients) {
          recipeIngredientArr.push(recipeIngredient.name);
        }
        console.log(recipeIngredientArr.map((item) => item.toLowerCase()));
        console.log("recipeIngredientArr" + typeof recipeIngredientArr);
        let recipeTitle = recipe.title;
        for (let excludeIngredient of excludeIngredientsArr) {
          console.log(
            "this is the current excl. ignredient:" + excludeIngredient
          );
          console.log(recipeTitle);
          if (
            recipeTitle
              .toLowerCase()
              .includes(excludeIngredient.toLowerCase()) ||
            recipeIngredientArr
              .map((item) => item.toLowerCase())
              .includes(excludeIngredient.toLowerCase())
          ) {
            console.log("Removed" + recipeTitle);
            // Remove the recipe at this current index
            response2.data.splice(i, 1);
            // Decrement the index to stay at the same position in the next iteration
            i--;
          }
        }
      }
      console.log(response2.data);
      return response2.data;
    } catch (error) {
      // Handle errors here
      // console.error(`Error fetching nutrition for recipe with ID ${recipeID}:`, error);
      // throw error;
      console.log("no recipe found");
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
  async getSelectedRecipeInstructions(id) {
    try {
      const response = await this.axios.get(`recipes/${id}/information`);
      console.log(response.data);
      return response.data.analyzedInstructions[0].steps;
    } catch (error) {
      throw error;
    }
  }

  // args: recipeID,
  // desc: return the name, prep time, serving size, description of the recipe
  async getSelectedRecipeGeneralInfo(id) {
    try {
      const response = await this.axios.get(`recipes/${id}/information`);
      const name = response.data.title;
      const prepTime = response.data.readyInMinutes;
      const servingSize = response.data.servings;
      const description = response.data.summary;

      let obj = {};
      obj.name = name;
      obj.prepTime = prepTime;
      obj.servingSize = servingSize;
      obj.description = description;
      console.log(obj);
      return obj;
    } catch (error) {
      throw error;
    }
  }

  // get random food joke
  async getRandomFoodJoke() {
    try {
      const response = await this.axios.get("/food/jokes/random");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // get random food fact
  async getRandomFoodFact() {
    try {
      const response = await this.axios.get("/food/trivia/random");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async recommendRecipeBasedOnInsights  (
    number,
    maxReadyTime,
    includeIngredients,
    excludeIngredients,
    cuisine,
    dietType
  ) {
    let includeIngredientsStr = includeIngredients.join(","); // takes in array and convert into comma separated string
    let excludeIngredientsStr = excludeIngredients.join(","); // takes in array and convert into comma separated string
    let cuisineStr = cuisine.join(","); // takes in array and convert into comma separated string
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
      params: {
        number: number, // number of recipes to return
        maxReadyTime: maxReadyTime, //number
        includeIngredients: includeIngredientsStr, //comma separated string of users favourite ingredients
        excludeIngredients: excludeIngredientsStr, // comma separated string, take array from firebase
        cuisine: cuisineStr, //comma separated string
        diet: dietType, // string
        instructionsRequired: "true", // must have instructions
        addRecipeNutrition: true,
        addRecipeInformation: true,
      },
      headers: {
        "X-RapidAPI-Key": "bf3360681bmsh178f6e9f5dc6191p10b60fjsne4b2c090288a",
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error(error);
    }
  };
}



const spoonacularObj = new SpoonacularAPI();

export default spoonacularObj;
