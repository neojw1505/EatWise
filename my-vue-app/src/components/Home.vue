<!-- Home.vue -->
<template>
  <div>
    <Navbar/>
        <RecipeOfDay data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" data-aos-offset="100" class="pt-2 my-3 mx-3 "/>
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