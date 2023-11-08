<template>
  <div>
    <Navbar/>
    <div class="background-img">
        <!-- Add background Image -->
      <h2 class="m-0 text-white fw-bold d-flex " style="padding-top:200px; padding-left:40px; font-size:60px">All Recipes</h2>
    </div>
    <div style="display: flex; flex-direction: column; min-height: 75vh; justify-content: space-between ;">
      <div class="mx-auto mb-5" style="max-width: 1200px;">
    <h1 class="my-3 text-center" style=" font-family: Georgia, 'Times New Roman', Times;">
      Find you <span style="color: #7a8cea; font-weight: bold"> favourite </span>recipe!
    </h1>
    <div class="mx-3 mb-5 d-flex mx-auto col-6 align-items-center ">
      <input v-model="tempSearch" class="form-control border-3 rounded-5" placeholder="What are you looking for?"/>
      <div @click="getRelatedData" class="btnStyle btn my-1 ms-2 rounded-4"  >
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg" />
      </div>
    </div>
    <!-- show all result for recipe -->
    <AllRecipe :searchInput="search" />
    </div>

    <Footer/>
    
    </div>
    
    
  </div>
</template>

<script>

export default {
  data(){return{
    search:"",
    tempSearch:""
  }
  },
  methods:{
    getRelatedData(){
      this.search=this.tempSearch
    },
  },
  created(){
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

}
</script>

<style scoped>
.background-img{
  background-image: url(../../homepageAsset/find-recipe-background.jpg);
  width: 100%;
  height: 280px;
  object-fit: fill;
  background-size: 100%;
  background-repeat: no-repeat;
}

.btnStyle {
  transition: transform 0.3s;
  background-color: #7A8CEA;
}
.btnStyle:hover {
  transform: scale(1.05); /* Scale up by 10% on hover */
  cursor: pointer;
  background-color: #7A8CEA;
}
</style>