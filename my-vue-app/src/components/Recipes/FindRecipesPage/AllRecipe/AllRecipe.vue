<template>
  <div class="m-3 mx-auto">
    <AllRecipeHeader/>
    <!-- may want to add in "view more" button to expand more view -->
    <AllRecipeResult :searchInput="searchInput"/>
  </div>
</template>

<script>
export default {
  name:"AllRecipe",
  props:["searchInput"],
  data(){
    return {
      data: null
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>