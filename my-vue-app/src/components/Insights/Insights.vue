<template>
    <div>
      <navbar />
      <div class="background-img">
      <!-- Add background Image -->
      <h2 class="m-0 text-white fw-bold d-flex " style="padding-top:200px; padding-left:40px; font-size:60px">Insights</h2>
    </div>
      <div class="row my-2 mx-2" style="padding-top:100px">
          <MacroNutrientsChart class="col-md-6 col-12 me-2  border shadow rounded-4" />
          <ActionableInsights class="col border shadow rounded-4"/>
      </div>
  
      <div  class="col mx-2 my-2 border shadow rounded-4 bg-white">
        <CalorieIntakeChart />
      </div>
    </div>
  </template>
  
<style scoped>

.background-img{
  background-image: url(../../components/homepageAsset/insights.jpg);
  width: 100%;
  height: 280px;
  object-fit: fill;   
  background-size: 100%;
  background-repeat: no-repeat;
}

</style>