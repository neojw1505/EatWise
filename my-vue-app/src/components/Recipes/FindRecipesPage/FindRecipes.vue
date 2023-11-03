<template>
  <div>
    <Navbar/>
    
    <!-- need to check if there is any Recommended recipe. if yes, show the RecommendedRecipes below -->
    <div class="mx-auto" style="max-width: 2400px;">
    <h2 class="m-3" >All Recipes:</h2>
    <div class="mx-3">
      <h3 class="d-inline">Search:</h3>
      <input v-model="tempSearch" class="form-control border-3"/>
      <button @click="getRelatedData" class="btn my-1 fw-bold" style="background-color: #F4976C;">Search</button>
    </div>
    <!-- <RecommendedRecipes/> -->
    <!-- show all result for recipe -->
    <AllRecipe :searchInput="search" />
  
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
  }

}
</script>

<style>

</style>