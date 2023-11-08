<template>
    <div class="bg-white">
        <h3 class="my-2 mx-2">Actionable Insights</h3>
        <button @click="recommendRecipeBasedOnInsights"> Click</button>
    </div>
</template>
<script>
export default {
    methods: {
        async getMostConsumedIngredient() { // return dict, key: ingredient, value: count
            console.log(await this.$smAPI.getMostConsumedIngredient());
        },
        async getFavoriteCuisine() { // return dict, key: cuisine, value: count
            console.log(await this.$smAPI.getFavoriteCuisine());
        },
        async getAverageRecipePrepTime() { // get avg Prep time rounded to nearest whole number
            console.log(await this.$smAPI.getAverageRecipePrepTime());
        },
        async recommendRecipeBasedOnInsights() {
            let dietType = await this.$smAPI.getUserDietType(); // user diet type from firebase
            let excludedIngredients = await this.$smAPI.getUserExcludedIngredients() ?? []; // user excluded ingredients from firebase
            // 1st args: num of recipes to return
            // 2nd args: prepTime: recipes return will not exceed this number 
            // 3rd args: users favorite ingredients in an array, even if 1 ingredient still must be array
            // 4th args: users ingredients to exclude in an array, even if 1 ingredient still must be array, take from firebase
            // 5th args: users favorite cuisine(s) in an array, even if 1 cuisine still must be array
            // 6th args: user diet type 
            console.log(await this.$spoonAPI.recommendRecipeBasedOnInsights(3, 20, ['tomato'], excludedIngredients, ['italian'], dietType));
        }
    }
}
</script>   