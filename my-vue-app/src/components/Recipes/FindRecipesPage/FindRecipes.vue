<template>
  <div>
    <Navbar/>
    
    <!-- need to check if there is any Recommended recipe. if yes, show the RecommendedRecipes below -->
    <div class="mx-auto" style="max-width: 2400px;">
    <h2 class="m-3" >All Recipes:</h2>
    <form class="mx-3">
      <h3 class="d-inline">Search:</h3>
      <input v-model="search" class="form-control border-3"/>
      <button class="btn my-1" style="background-color: #7AAAB4;">Search</button>
    </form>
    <!-- <RecommendedRecipes/> -->
    <!-- show all result for recipe -->
    <AllRecipe/>
    </div>
  </div>
</template>

<script>

export default {
  data(){return{
    search:""
  }
  }

}
</script>

<style>

</style>