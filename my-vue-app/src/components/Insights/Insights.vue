<template>
    <div>
      <Navbar/>
      <div class="background-img">
      <!-- Add background Image -->
      <h2 class="m-0 text-white fw-bold d-flex mb-3" style="padding-top:200px; padding-left:40px; font-size:60px">Insights</h2>
    </div>
      <div class="row my-2 mx-2" style="padding-top:50px">
        <ActionableInsights class="col-md-4 me-2 col-12 border shadow rounded-4 p-2 mb-3" style="z-index: -1;"/>
        <MacroNutrientsChart class="col border shadow rounded-4 mb-3" />
          
      </div>
  
      <div  class="col mx-2 my-2 mb-3 border shadow rounded-4 bg-white">
        <CalorieIntakeChart class="mb-3"/>
      </div>
    </div>
    <div class="mt-5">
      <Footer></Footer>
    </div>
  </template>

  <style scoped>
  .header{
    background-image: url(../homepageAsset/insightsbg.png);
    height:30vh;
    width:100%;
    object-fit:cover;
    background-size:100%;
    align-items: center;
    background-repeat: no-repeat;
    }
</style>
  
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