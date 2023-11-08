<template>
    <div >
      <navbar />
      <div class="header">
      </div >
      <h1 class="my-3 text-center pt-1" style=" font-family: Georgia, 'Times New Roman', Times;">
      Explore the  <span style="color: #7a8cea; font-weight: bold"> insights </span> to your meal consumption!
      </h1>
      <div class="row my-2 mx-2 pt-2">
          <MacroNutrientsChart class="col-md-6 col-12 me-2  border shadow rounded-4" />
          <ActionableInsights class="col border shadow rounded-4"/>
      </div>
  
      <div  class="col mx-2 my-2 border shadow rounded-4 bg-white">
        <CalorieIntakeChart />
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
  
  