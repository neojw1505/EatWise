<template>
  <div class="my-1">
    <div class="" id="FilterByKeywordOptions">
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
