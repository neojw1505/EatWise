<!-- Home.vue -->
<template>
  <div>
    <div>
      <Navbar />
    </div>
    <div class="row">
      <div class="section1">
        <!-- <div class="col-lg-6" id="video">
            <video loop autoplay preload="auto"  src="./homepageAsset/gif.mp4" alt="gif" style="width: 100%; height: 100%; object-fit:fill;"></video>
          </div>
          <div class="col-lg-6" id="rightCol">
     
            <div class="img-overlay">
            </div>
          </div> -->
        <video
          loop
          autoplay
          muted
          preload="auto"
          src="./homepageAsset/home_bg_video.mp4"
          alt="bgvideo"
          style="width: 100%; height: 100%; object-fit: fill"
        ></video>
        <div class="overlay">
          <h1
            style="
              font-size: 5vw;
              color: whitesmoke;
              font-family: Georgia, 'Times New Roman', Times;
            "
          >
            EatWise
          </h1>
          <br />
          <h1
            style="
              font-size: 2vw;
              font-family: Georgia, 'Times New Roman', Times;
            "
          >
            Nourishing Your
            <span style="color: #7a8cea; font-weight: bold">Journey</span>, One
            Bite at a Time
          </h1>
        </div>
      </div>

      <div class="section2">
        <p style="text-indent: -999px">.</p>
        <!--hidden text so that image extends-->
        <RecipeOfDay />
      </div>
      <div class="section3">
        <p style="text-indent: -999px">.</p>
        <!--hidden text so that image extends-->

        <!-- <span style="font-size: large; color:white"> Place the Meal Planner of the day here</span> -->
        <MealPlan class="py-5" />
      </div>

      <div class="section4">
        <p style="text-indent: -999px">.</p>
        <!--hidden text so that image extends-->
        <NewPromoCarousel class="p-4 pt-2 shadow rounded-4 my-3 mx-3" />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  mounted() {
    if (this.$store.getters.isLoginNotificationShown === false) {
      // Show the SweetAlert notification
      this.loginSuccessNotif();

      // Update the notification flag in the store
      this.$store.dispatch("setShowLoginNotification", true);
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
  display: relative;
  width: 100%;
  height: 100vh;
  transition: all 1s ease;
}

.section1 video {
  position: relative;
  z-index: 0;
}

.overlay {
  position: absolute;
  top: 35%; /* Position the top of the overlay text at 50% of the parent height */
  left: 50%; /* Position the left of the overlay text at 50% of the parent width */
  transform: translate(
    -50%,
    -50%
  ); /* Use transform to center the overlay text */
  z-index: 0.9;
  color: white; /* Set text color for better visibility */
  text-align: center; /* Center the text within the container */
}

#video {
  object-fit: fill;
}

.section2 {
  /* width: 100%; */
  height: 100vh;
  background-image: url(./homepageAsset/background-s2.png);
  background-size: cover; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
.section3 {
  /* width: 100%; */
  height: 100vh;
  background-image: url(./homepageAsset/background-s3.png);
  background-size: cover;
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
.section4 {
  /* width: 100%; */
  height: 100vh;
  background-image: url(./homepageAsset/background-s4.png);
  background-size: cover; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
</style>
