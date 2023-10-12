<template>
  <div>
    <Navbar/>
    
    <!-- need to check if there is any Recommended recipe. if yes, show the RecommendedRecipes below -->
    <div class="mx-auto" style="max-width: 2400px;">
    <h2 class="m-3" >All Recipes:</h2>
    <RecommendedRecipes/>
    <!-- show all result for recipe -->
    <AllRecipe/>
    </div>
  </div>
</template>

<script>

export default {
  

}
</script>

<style>

</style>