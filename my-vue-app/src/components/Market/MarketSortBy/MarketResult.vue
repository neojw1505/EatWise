<template>
  <div class="p-4 pt-2 shadow border rounded-4 my-3 mt-4 d-flex row">
    <div v-if="visibleItems.length > 0" class="d-flex flex-wrap">
      <MarketPreviewCard
        v-for="product in visibleItems"
        :ProductData="product"
        :key="product.id"
      />
    </div>

    <div v-else class="d-flex mx-auto justify-content-center">
      <div class="mx-auto">
        <div class="d-inline mx-auto">
          <div class="spinner-border text-success mx-auto fs-1" role="status"></div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center my-3">
      <button class="btn bg-light border border-dark mx-1" @click="previousPage" :disabled="currentPage === 0">Previous</button>
      <button class="btn bg-light border border-dark mx-1" @click="nextPage" :disabled="currentPage === maxPage">Next</button>
    </div>

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
</template>

<script>
export default {
  props: ["result"],
  data() {
    return {
      itemsPerPage: 30,
      currentPage: 0,
    };
  },
  computed: {
    maxPage() {
      if(!this.result){
        return ""
      }
      return Math.ceil(this.result.length / this.itemsPerPage) - 1;
    },
    visibleItems() {
      if(!this.result){
        return ""
      }
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.result.slice(start, end);
    },

    limitedPages() {
      // Determine the range of visible pages (last 5 pages or less)
      const rangeStart = Math.max(0, this.currentPage - 4);
      const rangeEnd = Math.min(this.maxPage, rangeStart + 4);
      return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => rangeStart + index);
    },
  },
  methods: {
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