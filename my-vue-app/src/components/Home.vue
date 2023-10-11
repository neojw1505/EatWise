<!-- Home.vue -->
<template>
  <Navbar/>
  <div class="home-container">
    <div class="col-8">
      <MealPlan/>
      <NewPromoCarousel/>
    </div>
    <div class="col-4">
      <div>
        <h1>XP Level?</h1>
        <h1>Random Food Fact?</h1>
        <h1>Random Food Joke?</h1>
        <h1>Calories Tracker?</h1>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .home-container {
    /* background-color: #007459; */
    display: flex;
  }
</style>