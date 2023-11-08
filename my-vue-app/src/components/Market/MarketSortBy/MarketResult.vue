<template>
  <div class=" py-4 shadow border rounded-4 px-4 mx-auto mt-4 d-flex row" style="background:#e6ecf7; width: 100%;" >
    <div data-aos="fade-up" data-aos-duration="1000" v-if="visibleItems.length > 0" class="d-flex flex-wrap mx-auto justify-content-center">
      <MarketPreviewCard
        v-for="product in visibleItems"
        :ProductData="product"
        :key="product.id"
      />
    </div>

    <div v-else-if="visibleItems.length == 0 && result!=null" class="mt-3 d-flex mx-auto justify-content-center " >
      <div class="mx-auto text-center">
        No Result Found
        <font-awesome-icon :icon="['fas', 'face-frown']" size="xl" />
      </div>
    </div>

    <div v-else class="mt-3 d-flex mx-auto justify-content-center" style="width: 100%;">
      <div class="mx-auto">
        <div class="d-inline mx-auto">
          <div class="spinner-border text-success mx-auto fs-1" role="status"></div>
        </div>
      </div>
    </div>



    <div v-if="visibleItems.length > 0" class="d-flex justify-content-center my-3">
      <button class="btnStyle btn bg-light border border-dark mx-1" @click="previousPage" :disabled="currentPage === 0">Previous</button>
      <button class="btnStyle btn bg-light border border-dark mx-1" @click="nextPage" :disabled="currentPage === maxPage">Next</button>
    </div>

    <div  v-if="visibleItems.length > 0"  class="d-flex justify-content-center" style="color:white">
      <button
        v-for="page in limitedPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ 'active': page === currentPage }"
        class="btn text-black btnStyle"
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
      itemsPerPage: 60,
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
  color: black;
  padding: 5px 10px;
  margin: 0 3px;
  border-radius: 5px;
  border: 1px solid #000;
  cursor: pointer;
}
.btnStyle{
  transition: transform 0.3s;
}
.btnStyle:hover {
  transform: scale(1.05); /* Scale up by 10% on hover */
  cursor: pointer;
}
</style>