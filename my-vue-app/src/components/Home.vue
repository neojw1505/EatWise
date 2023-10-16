<!-- Home.vue -->
<template>
  <div>
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