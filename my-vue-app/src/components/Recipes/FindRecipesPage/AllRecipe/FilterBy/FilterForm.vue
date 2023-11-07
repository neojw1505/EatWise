<template>
  <div class="collapse my-2 mx-auto" id="filter" style="max-width: 800px">
    <FilterMealType @getMealTypeInput="handleMealTypeInput" />
    <FilterDietType @getDietTypeInput="handleDietTypeInput" />
    <FilterByKeyword
      @getIncludeIngredientInput="handleIncludeIngredientInput"
      @getExcludeIngredientInput="handleExcludeIngredientInput"
    />
    <FilterByCalRange
      @getMinCalInput="handleMinCalInput"
      @getMaxCalInput="handleMaxCalInput"
    />
    <div class="d-flex justify-content-end">
      <button @click="this.$emit('performSearchRecipe')" class="btnStyle btn my-1 fw-bold rounded-4" style="background-color: #7A8CEA">
        Filter
      </button>
    </div>
  </div>
</template>

<script>
import FilterDietType from "./FilterDietType.vue";
import FilterMealType from "./FilterMealType.vue";

export default {
  components: { FilterDietType, FilterMealType },
  methods: {
    handleMealTypeInput(data) {
      // console.log(data)
      this.$emit('handleMealType',data)
    },
    handleDietTypeInput(data) {
      // console.log(data)
      this.$emit('handleDietType',data)
    },
    handleIncludeIngredientInput(data) {
      // console.log(data)
      this.$emit('handleIncludeIngredient',data)
    },
    handleExcludeIngredientInput(data) {
      // console.log(data)
      this.$emit('handleExcludeIngredient',data)
    },
    handleMinCalInput(data) {
      // console.log(data)
      this.$emit('handleMinCal',data)
    },
    handleMaxCalInput(data) {
      // console.log(data)
      this.$emit('handleMaxCal',data)
    },
  },
};
</script>

<style scoped>
.btnStyle{
  transition: transform 0.3s;
}
.btnStyle:hover {
  transform: scale(1.05); /* Scale up by 10% on hover */
  cursor: pointer;
}
</style>
