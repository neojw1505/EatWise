<!-- Home.vue -->
<template>
  <div class="container-fluid">
    <Navbar/>
        <div class="section1"> 
          <div class="row-left col-6">
            <video loop autoplay preload="auto"  src="./homepageAsset/gif.mp4" alt="gif"></video>
          </div>
          <div class="row-right col-6">
            <!-- <img id="background-s1" src="./homepageAsset/background-s1.png">
            <img class="img-overlay" src="./homepageAsset/slogan.png"> -->
            <div class="img-overlay">

            </div>
          </div>
        </div>

        <div class="section2">
          <span style="font-size: large; color:black"> Place the Recipe of the Day here </span>
          <!-- <RecipeOfDay class="pt-2 my-3 mx-3 "/> -->
        </div>
        <div class="section3">
          <span style="font-size: large; color:white"> Place the Meal Planner of the day here</span>
          <!-- <MealPlan class=" p-4 pt-2 shadow border rounded-4 my-3 mx-3 "  /> -->
        </div>
        <div class="section4">
          <span style="font-size: large; color:white"> Place the Current promotions here</span>
          <!-- <NewPromoCarousel  class=" p-4 pt-2 shadow border rounded-4 my-3 mx-3 "/>  -->

        </div>

    </div>



</template>


<style scoped>
  .home-container {
  display: flex;
  flex-direction: column; /* Change to column for responsive design */
  width: 100vw; /* Set the container's width to the viewport width */
  height: 100vh; /* Set the container's height to the viewport height */
}


.section1 {
  display: flex;
  flex-direction: row; /* Display elements side by side */
  width: 100%;
  height: 100vh;
  transition: all 1s ease;
}

.row-left,
.row-right {
  width: 50%;
  height: 100%;
}

.row-left video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.row-right {
  background-image: url(./homepageAsset/background-s1.png);
  background-size: cover;
}

.img-overlay {
  width: 100%;
  height: 100%;
  background-image: url(./homepageAsset/slogan.png);
  background-size: contain; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
.section2{
  width: 100%;
  height: 100vh;
  background-image: url(./homepageAsset/background-s2.png);
  background-size:cover; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
.section3{
  width: 100%;
  height: 100vh;
  background-image: url(./homepageAsset/background-s3.png);
  background-size:cover; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
.section4{
  width: 100%;
  height: 100vh;
  background-image: url(./homepageAsset/background-s4.png);
  background-size:cover; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
</style>