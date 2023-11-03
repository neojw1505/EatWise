<template>
    <div class="body">
    <Navbar />
    <div class="mx-auto" style="height: 90vw">
      <!-- <h2 class="main-text mt-4" style="color: white ; font-family: Roboto;">Saved Recipes:</h2> -->
      <!-- <button @click="deletela">Delete All Recipes</button> -->
      <div class="border border-2 border-dark rounded-4 p-2 mt-5" style="width: 100px; margin-left: 50px; background-color: tomato ; color: white;" @click="deletela">
        <span class="fw-semibold" @click="DeleteConfirm()"> Delete All</span>
    </div>
    
  <div class="mx-auto" style="max-width: 1200px;">
    
    <div class="p-4 pt-2 border rounded-4 my-3 d-flex mx-3 d-flex row" style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.71) 0%, rgba(0, 0, 0, 0.21) 99.99%, rgba(0, 0, 0, 0.17) 100%);">
      
      <div v-if="visibleItems.length > 0" class="d-flex flex-wrap row mx-auto">
        <SavedRecipeCard
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
  </div>
  </div>
</template>

<script>
import { get } from 'firebase/database';
import Swal from 'sweetalert2';
export default {  
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

    DeleteConfirm() {
    if(this.visibleItems.length > 0){
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action will delete all items. This cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete all items',
        cancelButtonText: 'No, cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
    }).then((result) => {
        if (result.isConfirmed) {
            this.$smAPI.deleteSavedRecipes()
            this.getUserSavedRecipes()
                .then(() => {
                    console.log("Items deleted successfully");
                })
                .catch((error) => {
                    console.error("Error deleting items:", error);
                });
        } else {
            console.log("Deletion Cancelled"); 
        }
    });}
},

    // async deletela(){
    //   await this.$smAPI.deleteSavedRecipes();
    // },
    
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
    async getUserSavedRecipes() {
      let temp = await this.$smAPI.getUserSavedRecipes();
      this.data=[];
      for(let recipe in temp){
        this.data.push(temp[recipe]);
      }
      console.log(this.data);
    },
  },
  async created(){
    await this.getUserSavedRecipes();
  },

  

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

.body {
  background-image: url(../homepageAsset/saved_recipe_bg.png);
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  
}



</style>

