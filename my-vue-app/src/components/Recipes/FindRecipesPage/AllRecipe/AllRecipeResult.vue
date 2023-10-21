<template>
  <div class="mx-auto " style="max-width: 1200px">
    <div class="p-4 pt-2 shadow border rounded-4 my-3 d-flex mx-3 d-flex row" style="background-color: #FBE8A6;">
      
      <div v-if="visibleItems.length > 0" class="d-flex flex-wrap">
        <FindRecipePreviewCard
          v-for="item in visibleItems"
          :key="item.id"
          :recipe="item"
          :routerTO="item.id"
          style="text-decoration: none"
        />
      </div>
      

      <div v-else class="d-flex mx-auto justify-content-center">
      <div class="mx-auto">
        <div class="d-inline mx-auto">
          <div class="spinner-border text-success mx-auto fs-1" role="status"></div>
        </div>
      </div>
    </div>

      <div v-if="data && data.length==0" class="row d-flex mx-auto justify-content-center">
        <h1 class="d-inline">
          <i>No Reciepe found </i>
          <font-awesome-icon :icon="['fas', 'face-frown']" size="xl" />
        </h1>
      </div>

      <!-- buttons for pagination -->
      <div class="d-flex justify-content-center my-3">
        <button class="btn bg-light border border-dark mx-1" @click="previousPage" :disabled="currentPage === 0">Previous</button>
        <button class="btn bg-light border border-dark mx-1" @click="nextPage" :disabled="currentPage === maxPage">Next</button>
      </div>
      <!-- pages -->
      <div class="d-flex justify-content-center">
      <button
        v-for="page in limitedPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ 'active': page === currentPage }"
        class="btn"
      >
        {{ page + 1 }}
      </button>
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
      itemsPerPage: 40,
      currentPage: 0,
    };
  },
  computed: {
    maxPage() {
      if(!this.data){
        return ""
      }
      return Math.ceil(this.data.length / this.itemsPerPage) - 1;
    },
    visibleItems() {
      if(!this.data){
        return ""
      }
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.data.slice(start, end);
    },

    limitedPages() {
      // Determine the range of visible pages (last 5 pages or less)
      const rangeStart = Math.max(0, this.currentPage - 4);
      const rangeEnd = Math.min(this.maxPage, rangeStart + 4);
      return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => rangeStart + index);
    },
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
        100,
        this.PassIncludeIngredients,
        this.PassExcludeIngredients,
        this.PassMinCal,
        this.PassMaxCal
      );
      console.log(this.data);
    },
    nextPage() {
      if (this.currentPage < this.maxPage) {
        this.currentPage++;
        this.scrollToTop();
      }
    },
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.scrollToTop();
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
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

<style scoped>
.active {
  color: white;
  padding: 5px 10px;
  margin: 0 3px;
  border-radius: 5px;
  border: 1px solid #d8d7d7;
  cursor: pointer;
}
</style>
