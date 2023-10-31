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
      
      <div v-else-if="visibleItems.length == 0 && data!=null" class="mt-3 d-flex mx-auto justify-content-center">
      <div class="mx-auto text-center">
        No Result Found
        <font-awesome-icon :icon="['fas', 'face-frown']" size="xl" />
      </div>
      </div>

      <div v-else class="mt-3 d-flex mx-auto justify-content-center">
      <div class="mx-auto">
        <div class="d-inline mx-auto">
          <div class="spinner-border text-success mx-auto fs-1" role="status"></div>
        </div>
      </div>
    </div>


      <!-- buttons for pagination -->
      <div v-if="visibleItems.length > 0" class="d-flex justify-content-center my-3">
        <button class="btn bg-light border border-dark mx-1" @click="previousPage" :disabled="currentPage === 0">Previous</button>
        <button class="btn bg-light border border-dark mx-1" @click="nextPage" :disabled="currentPage === maxPage">Next</button>
      </div>
      <!-- pages -->
      <div  v-if="visibleItems.length > 0"  class="d-flex justify-content-center">
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
    // mealTypes = [],
    // dietTypes = [],
    // query = "",
    // number = 10,
    // includeIngredients = [],
    // excludeIngredients = [],
    // minCal = 0,
    // maxCal = 10000
    async getFilteredRecipes() {
      this.data=null;
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
  watch:{
    PassSearchInput: {
    deep: true, // Enable deep watch
    handler: function (newValue, oldValue) {
      console.log(newValue);
      this.getFilteredRecipes();
    },
  }
}

}
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
