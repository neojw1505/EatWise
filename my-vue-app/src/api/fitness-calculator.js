import axios from "axios";

class FitnessCalculatorAPI {
  constructor() {
    // Initialize axios with a base URL and default parameters
    this.BASE_URL = "https://fitness-calculator.p.rapidapi.com";
    this.axios = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_FITNESS_CALCULATOR_API_KEY,
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
      }
    });
  }

    //   Find the amount of macro nutrients in four different categories which are balanced, low-fat, low-carbs and high-protein for a specific calorie burned. There are 6 inputs which are age, gender, height, weight, activity level and goal.

    // For activity level :
    // "1" : "BMR",
    // "2" : "Sedentary: little or no exercise",
    // "3" : "Exercise 1-3 times/week",
    // "4" : "Exercise 4-5 times/week",
    // "5" : "Daily exercise or intense exercise 3-4 times/week",
    // "6" : "Intense exercise 6-7 times/week",
    // "7" : "Very intense exercise daily, or physical job"
    
    // For goals :
    // "maintain" : "maintain weight",
    // "mildlose" : "Mild weight loss",
    // "weightlose" : "Weight loss",
    // "extremelose" : "Extreme weight loss",
    // "mildgain" : "Mild weight gain",
    // "weightgain" : "Weight gain",
    // "extremegain" : "Extreme weight gain"
    
  async getDailyCaloriesMacros(age, gender, height, weight, activitylevel, goal) {
    try {
        const response = await this.axios.get('/macrocalculator', {
            params: {
                age : age,
                gender : gender, 
                height : height, 
                weight: weight, 
                activitylevel : activitylevel, 
                goal : goal
            }
        });
        return response.data.data
    } catch (error) {
        console.error(error);
    }
  }
}

const FitnessCalculatorObj = new FitnessCalculatorAPI()
export default FitnessCalculatorObj