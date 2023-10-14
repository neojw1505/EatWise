<template>
  <div class="mx-auto">
    <AllRecipeHeader
    @handleMealTypePassdown="handleMealTypeInput"
    @handleDietTypePassdown="handleDietTypeInput"
    @handleIncludeIngredientPassdown="handleIncludeIngredientInput"
    @handleExcludeIngredientPassdown="handleExcludeIngredientInput"
    @handleMinCalPassdown="handleMinCalInput"
    @handleMaxCalPassdown="handleMaxCalInput"/>
    <!-- may want to add in "view more" button to expand more view -->
    <AllRecipeResult 
    :PassSearchInput="searchInput"
    :PassMealType="MealType"
    :PassDietType="DietType"
    :PassIncludeIngredients="IncludeIngredient"
    :PassExcludeIngredients="ExcludeIngredient"
    :PassMinCal="MinCal"
    :PassMaxCal="MaxCal"/>
  </div>
</template>

<script>
export default {
  name:"AllRecipe",
  props:["searchInput"],
  data(){
    return {
      MealType:[],
      DietType:[],
      IncludeIngredient:[],
      ExcludeIngredient:[],
      MinCal:0,
      MaxCal:10000,
    }
  },
  methods: {
    handleMealTypeInput(data) {
      console.log(data)
      this.MealType=data;
    },
    handleDietTypeInput(data) {
      // console.log(data)
      this.MealType=data;
    },
    handleIncludeIngredientInput(data) {
      // console.log(data)
      this.MealType=data;
    },
    handleExcludeIngredientInput(data) {
      // console.log(data)
      this.MealType=data;
    },
    handleMinCalInput(data) {
      // console.log(data)
      this.MealType=data;
    },
    handleMaxCalInput(data) {
      // console.log(data)
      this.MealType=data;
    },
  },
  watch: {
    // Watch someData for changes
    MealType(newValue, oldValue) {
      this.MealType=newValue;
    },
    
  },
}
</script>

<style>

</style>