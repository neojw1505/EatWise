<template>
  <div class="my-1">
    <div
      class="d-block p-2 text-black fw-semibold rounded-4 d-flex justify-content-between align-items-center"
      data-bs-toggle="collapse"
      data-bs-target="#FilterByKeywordOptions"
      aria-expanded="false"
      aria-controls="FilterByKeywordOptions"
      style="background-color: #FFB18D"
    >
      <div>By Keyword</div>
      <div class="arrow-down"></div>
    </div>

    <div class="collapse" id="FilterByKeywordOptions">
      <div class="my-2">
        <FilterByIngredients
          @addIngredient="handleAddIngredient"
          @removeIngredient="handleRemoveIngredient"
          nameOfAction="added"
        />
        <FilterByIngredients
          @addIngredient="handleAddIngredient"
          @removeIngredient="handleRemoveIngredient"
          nameOfAction="removed"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleAddIngredient(data) {
      // console.log(data);
      this.$emit('getIncludeIngredientInput',data)
    },
    handleRemoveIngredient(data) {
      // console.log(data);
      this.$emit('getExcludeIngredientInput',data)
    },
  },
};
</script>

<style>
.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid; /* Change the color as needed */
}
</style>
