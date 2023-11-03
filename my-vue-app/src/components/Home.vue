<!-- Home.vue -->
<template>
  <div>
    <div>
      <Navbar />
    </div>
    <div>
      <div class="section1">
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
          <h1 class="main-text"
            style="
              color: whitesmoke;
              font-family: Georgia, 'Times New Roman', Times;
            "
          >
            EatWise
          </h1>
          <br />
          <h1 class="sub-text"
            style="
              font-family: Georgia, 'Times New Roman', Times;
            "
          >
            Nourishing Your
            <span style="color: #7a8cea; font-weight: bold">Journey</span>, One
            Bite at a Time
          </h1>
        </div>
      </div>
      <div class="section2" style="padding-top: 80px; padding-bottom: 80px">
        <!--hidden text so that image extends-->
        <RecipeOfDay />
      </div>
      <div class="section3" style="padding-top: 60px; padding-bottom: 60px">
        <MealPlan/>
      </div>
      <div class="section4" style="padding-top: 40px; padding-bottom: 40px">
        <NewPromoCarousel class="p-4 pt-2 rounded-4 my-3 mx-3" />
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

  h1.maintext {
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.64px;  
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

@media screen and (min-width: 601px) {
  h1.main-text {
    font-size: 80px;
  }
  h1.sub-text {
    font-size: 30px;
  }
}

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
@media screen and (max-width: 600px) {
  h1.main-text {
    font-size: 40px;
  }

  h1.sub-text {
    font-size: 15px;
  }
}
.section1 {
  display: relative;
  width: 100%;
  height: 600px;
  transition: all 1s ease;
}

.section1 video {
  position: relative;
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
  background-image: url(./homepageAsset/background-s2.png);
  background-size: cover; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
.section3 {
  /* width: 100%; */
  background-image: url(./homepageAsset/background-s3.png);
  background-size: cover;
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
.section4 {
  /* width: 100%; */
  background-image: url(./homepageAsset/background-s4.png);
  background-size: cover; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}
</style>
