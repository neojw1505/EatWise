<template>
  <div class="mx-3">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="fw-bold">All Result:</h5>
      <div class="d-flex align-items-center">
        <button
          class=" btnStyle btn align-items-center rounded-4 dropdown-toggle btn-dark"
          data-bs-toggle="collapse"
          data-bs-target="#filter"
          aria-controls="filter"
        >
          Apply Filter <font-awesome-icon :icon="['fas', 'filter']" />
        </button>
      </div>
    </div>

    <FilterForm
      @handleMealType="handleMealTypeInput"
      @handleDietType="handleDietTypeInput"
      @handleIncludeIngredient="handleIncludeIngredientInput"
      @handleExcludeIngredient="handleExcludeIngredientInput"
      @handleMinCal="handleMinCalInput"
      @handleMaxCal="handleMaxCalInput"
      @performSearchRecipe="this.$emit('performSearchRecipe')"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleMealTypeInput(data) {
      // console.log(data)
      this.$emit("handleMealTypePassdown", data);
    },
    handleDietTypeInput(data) {
      // console.log(data)
      this.$emit("handleDietTypePassdown", data);
    },
    handleIncludeIngredientInput(data) {
      // console.log(data)
      this.$emit("handleIncludeIngredientPassdown", data);
    },
    handleExcludeIngredientInput(data) {
      // console.log(data)
      this.$emit("handleExcludeIngredientPassdown", data);
    },
    handleMinCalInput(data) {
      // console.log(data)
      this.$emit("handleMinCalPassdown", data);
    },
    handleMaxCalInput(data) {
      // console.log(data)
      this.$emit("handleMaxCalPassdown", data);
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
