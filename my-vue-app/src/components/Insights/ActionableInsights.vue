<template>
    <div class="bg-white">
        <h3 class="my-2 mx-2">Actionable Insights</h3>
        <button @click="getAverageRecipePrepTime"> Click</button>
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
        }
    }
}
</script>