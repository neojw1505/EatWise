<!-- This component generate a list of recipes by ingredients. Require user input -->
<template>
    <div>
        <h1>Search Ingredients</h1>
        <button @click="getRecipesByIngredients">Get Recipes By Ingredients</button>
        <div v-for="recipe in Recipes" :key="recipe.title">
            <span>Title: {{ recipe.title }}</span>
            <img :src="recipe.image">
            <!-- Ingredients user searched -->
            <div v-if="recipe.usedIngredients">
                <ul>
                    <span>Required Ingredients </span>
                    <li v-for="usedIngredient in recipe.usedIngredients" :key="usedIngredient">
                        <a href="#">{{ usedIngredient.amount }} {{ usedIngredient.unit }} {{ usedIngredient.name }}</a> 
                    </li>
                </ul>
            </div>
            <!-- Missing Ingredients -->
            <div v-if="recipe.missedIngredientCount != 0">
                <ul>
                    <span>{{recipe.missedIngredientCount}} Missing Ingredients (Click on ingredient to compare prices among supermarkets)</span>
                    <li v-for="missIngredient in recipe.missedIngredients" :key="missIngredient">
                        <!-- 
                            link them to the compare supermarket ingredients price component, 
                            use missIngredient.name as a query 
                        -->
                        <a href="#">{{ missIngredient.amount }} {{ missIngredient.unit }} {{ missIngredient.name }}</a> 
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            Recipes: [],
            Ingredients: ['rice,egg,beef'],
            Number: 5
        }
    },
    methods: {
        async getRecipesByIngredients() {
            this.Recipes = await this.$spoonAPI.getRecipesByIngredients(this.Ingredients, this.Number)
            console.log(this.Recipes);
        }
    }
}
</script>

<style>

</style>