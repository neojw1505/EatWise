<!-- Home.vue -->
<template>
  <div>
<<<<<<< Updated upstream
    <Navbar/>
  <div class="home-container">

    <div class="col-9" style="padding: 10px;">
      <RecipeOfDay />
      <MealPlan/>
      <NewPromoCarousel/>
    </div>
    <div class="col-3">

      <div>
        <h1>XP Level?</h1>
        <h1>Random Food Fact?</h1>
        <h1>Random Food Joke?</h1>
        <h1>Calories Tracker?</h1>
=======
    <Navbar />
    <div class="home-container">
      <div class="col-lg-9">
        <RecipeOfDay class="component-margin" />
        <MealPlan class="component-margin" />
        <NewPromoCarousel class="component-margin" />
      </div>
      <div class="col-3 component-margin">
        <div>
          <h1 class="component-margin">XP Level?</h1>
          <h1 class="component-margin">Random Food Fact?</h1>
          <h1 class="component-margin">Random Food Joke?</h1>
          <h1 class="component-margin">Calories Tracker?</h1>
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  </div>
</template>


<style scoped>
  .home-container {
    /* background-color: #007459; */
    display: flex;
  }

  .component-margin {
  margin-bottom: 1.5rem ;
  margin-left: 1.5rem;
}
</style>