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

      <div v-else class="row d-flex mx-auto justify-content-center">
        <h1 class="d-inline">
          <i>
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div></i
          >
        </h1>
      </div>
      <div v-if="data && data.length==0" class="row d-flex mx-auto justify-content-center">
        <h1 class="d-inline">
          <i>No Reciepe found </i>
          <font-awesome-icon :icon="['fas', 'face-frown']" size="xl" />
        </h1>
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
    // async getSelectedRecipeGeneralInfo() {
    //   this.data = await this.$spoonAPI.getSelectedRecipeGeneralInfo();
    // },

    async getFilteredRecipes() {
      this.data = await this.$spoonAPI.getFilteredRecipes(
        this.PassMealType,
        this.PassDietType,
        this.PassSearchInput,
        50,
        this.PassIncludeIngredients,
        this.PassExcludeIngredients,
        this.PassMinCal,
        this.PassMaxCal
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
    PassSearchInput: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("PassSearchInput changed:", newVal);
        this.getFilteredRecipes();
      },
    },
    PassMealType: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("PassSearchInput changed:", newVal);
        this.getFilteredRecipes();
      },
    },
    PassDietType: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("PassSearchInput changed:", newVal);
        this.getFilteredRecipes();
      },
    },
    PassIncludeIngredients: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("PassSearchInput changed:", newVal);
        this.getFilteredRecipes();
      },
    },
    PassExcludeIngredients: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("PassSearchInput changed:", newVal);
        this.getFilteredRecipes();
      },
    },
    PassMinCal: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("PassSearchInput changed:", newVal);
        this.getFilteredRecipes();
      },
    },
    PassMaxCal: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("PassSearchInput changed:", newVal);
        this.getFilteredRecipes();
      },
    },
  },
};
</script>

<style>

.spinner-border {
  width: 10rem; 
  height: 10rem;
}
</style>
