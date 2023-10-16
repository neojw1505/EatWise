<!-- Home.vue -->
<template>
  <div>
    <Navbar/>
    <div class=" p-4 pt-2 shadow border rounded-4 my-3 mx-3 ">
        <div class="row">
          <div class="col" >Random Food Fact?</div>
          <div class="col" >Random Food Joke?</div>
          <div class="col" >Calories Tracker?</div>
        </div>
      </div>
    
        <RecipeOfDay class=" p-4 pt-2 shadow border rounded-4 my-3 mx-3 " />
        <MealPlan class=" p-4 pt-2 shadow border rounded-4 my-3 mx-3 "  />
        <NewPromoCarousel  class=" p-4 pt-2 shadow border rounded-4 my-3 mx-3 "/>
    </div>
 
</template>


<style scoped>
  .home-container {
    /* background-color: #007459; */
    display: flex;
  }


</style>