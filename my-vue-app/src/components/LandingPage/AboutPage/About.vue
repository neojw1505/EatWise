<template>
  <div>
    <NavbarLandingPage/>
    <div>
      <div class="section1">
        <video loop autoplay muted preload="auto" src="../../homepageAsset/home_bg_video.mp4" alt="bgvideo"
          style="width: 100%; height: 100%; object-fit: cover"
        ></video>
        <div class="overlay mt-30">
          <h1 style="color: whitesmoke; font-family: Georgia, 'Times New Roman', Times;">
            EatWise
          </h1>
          <h4 class="sub-text" style=" font-family: Georgia, 'Times New Roman', Times;">
            Nourishing Your <span style="color: #7a8cea; font-weight: bold">Journey</span>, One Bite at a Time
          </h4>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

h1.maintext {
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.64px;  
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

</style>