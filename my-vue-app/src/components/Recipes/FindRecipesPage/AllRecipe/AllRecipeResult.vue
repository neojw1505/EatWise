<template>
  <div class="mx-auto" style="max-width: 1700px">
    <div class="p-4 pt-2 shadow border rounded-4 my-3 d-flex mx-3">
      <div
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 justify-content-start g-4"
        v-if="data"
      >
        <FindRecipePreviewCard
          v-for="item in data"
          :key="item.id"
          :recipe="item"
          :routerTO="item.id"
          style="text-decoration: none"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllRecipeResult",
  props: [
    "PassSearchInput",
    "PassMealType",
    "PassDietType",
    "PassIncludeIngredients",
    "PassExcludeIngredients",
    "PassMinCal",
    "PassMaxCal",
  ],
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async getSelectedRecipeGeneralInfo() {
      this.data = await this.$spoonAPI.getSelectedRecipeGeneralInfo();
    },

    async getFilteredRecipes() {
      this.data = await this.$spoonAPI.getFilteredRecipes(
        this.PassMealType,
        this.PassDietType,
        this.PassSearchInput,
        10,
        this.PassIncludeIngredients,
        this.PassExcludeIngredients
      );
      console.log(this.data);
    },
  },
  mounted() {
    console.log(this.PassSearchInput);
    this.getFilteredRecipes();
  },
  watch: {
    // Watch someData for changes
    PassSearchInput(newValue, oldValue) {
      this.getFilteredRecipes();
    },
    PassMealType(newValue, oldValue) {
      this.getFilteredRecipes();
    },
    PassDietType(newValue, oldValue) {
      this.getFilteredRecipes();
    },
    PassIncludeIngredients(newValue, oldValue) {
      this.getFilteredRecipes();
    },
    PassExcludeIngredients(newValue, oldValue) {
      this.getFilteredRecipes();
    },

  },
};
</script>

<style></style>
