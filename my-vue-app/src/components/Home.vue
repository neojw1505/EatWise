<!-- Home.vue -->
<template>
  <div>
    <div>
      <Navbar/>
    </div>
    <div class="row">
        <div class="section1"> 
          <div class="col-sm-6" id="video">
            <video loop autoplay preload="auto"  src="./homepageAsset/gif.mp4" alt="gif" style="width: 100%; height: 100%; object-fit:fill;"></video>
          </div>
          <div class="col-sm-6" id="rightCol">
     
            <div class="img-overlay">
            </div>
          </div>
        </div>
        
        <div class="section2">  
          <p style="text-indent: -999px;">.</p> <!--hidden text so that image extends-->
          <RecipeOfDay /> 
        </div>
        <div class="section3">
          <p style="text-indent: -999px;">.</p> <!--hidden text so that image extends-->
          
          <!-- <span style="font-size: large; color:white"> Place the Meal Planner of the day here</span> -->
          <!-- <MealPlan class="py-5"  /> -->
        </div>
        

       

        <div class="section4">
          <p style="text-indent: -999px;">.</p> <!--hidden text so that image extends-->
          <NewPromoCarousel  class=" p-4 pt-2 shadow rounded-4 my-3 mx-3 "/> 
        
      </div>

    </div>
    </div>

      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="200"
      data-aos-offset="100"
      class="pt-2 my-3 mx-3"


</template>

<script>
import Swal from "sweetalert2";
export default {
  mounted() {
    if (this.$store.getters.isLoginNotificationShown === false) {
      // Show the SweetAlert notification
      this.loginSuccessNotif();

      // Update the notification flag in the store
      this.$store.dispatch('setShowLoginNotification', true)
    }
  },
  methods: {
    loginSuccessNotif() {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    },
  },
};
</script>

<style scoped>


.section1 {
  display: flex; 
  flex-direction: row; 
  width: 100%;
  height: 100vh;
  transition: all 1s ease;
}

.row-left,
.row-right {
  width: 50%;
  height: 100%;
}

#video {
  object-fit: fill;
}

#rightCol {
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
  /* width: 100%; */
  height: 100vh;
  background-image: url(./homepageAsset/background-s2.png);
  background-size:cover; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
.section3{
  /* width: 100%; */
  height: 100vh;
  background-image: url(./homepageAsset/background-s3.png);
  background-size:cover;
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
.section4{
  /* width: 100%; */
  height: 100vh;
  background-image: url(./homepageAsset/background-s4.png);
  background-size:cover; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
</style>
