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
      <button class="btn my-1 fw-bold" style="background-color: #7aaab4">
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

<style></style>
