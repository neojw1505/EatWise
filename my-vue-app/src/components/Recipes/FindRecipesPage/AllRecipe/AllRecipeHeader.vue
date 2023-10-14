<template>
  <div class="mx-3">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="fw-bold" style="color: #7aaab4">All Result:</h5>
      <div class="d-flex align-items-center">
        <h5 class="d-inline px-2 m-0">Filter Recipes:</h5>
        <button
          class="btn align-items-center rounded-4 dropdown-toggle"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#filter"
          style="background-color: #7aaab4"
          aria-expanded="false"
          aria-controls="filter"
        >
          <img src="./filter.png" style="width: 50px;" />
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
    />

  </div>
</template>

<script>
export default {
  methods:{
    handleMealTypeInput(data) {
      // console.log(data)
      this.$emit('handleMealTypePassdown',data)
    },
    handleDietTypeInput(data) {
      // console.log(data)
      this.$emit('handleDietTypePassdown',data)
    },
    handleIncludeIngredientInput(data) {
      // console.log(data)
      this.$emit('handleIncludeIngredientPassdown',data)
    },
    handleExcludeIngredientInput(data) {
      // console.log(data)
      this.$emit('handleExcludeIngredientPassdown',data)
    },
    handleMinCalInput(data) {
      // console.log(data)
      this.$emit('handleMinCalPassdown',data)
    },
    handleMaxCalInput(data) {
      // console.log(data)
      this.$emit('handleMaxCalPassdown',data)
    },
  }
  
};
</script>

<style></style>
