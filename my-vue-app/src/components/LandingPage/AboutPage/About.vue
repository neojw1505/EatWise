<template>
  <div>
    <NavbarLandingPage />
    <div class="mb-5">
      <!-- video and EatWise -->
      <div class="section1">
        <video
          loop
          autoplay
          muted
          preload="auto"
          src="../../homepageAsset/home_bg_video.mp4"
          alt="bgvideo"
          style="width: 100%; height: 100%; object-fit: cover"
        ></video>
        <div class="overlay mt-30">
          <h1
            style="
              color: whitesmoke;
              font-family: Georgia, 'Times New Roman', Times;
            "
          >
            EatWise
          </h1>
          <h4
            class="sub-text"
            style="font-family: Georgia, 'Times New Roman', Times"
          >
            Nourishing Your
            <span style="color: #7a8cea; font-weight: bold">Journey</span>, One
            Bite at a Time
          </h4>
        </div>
      </div>
      <!-- about -->
      <div class="row m-2 mx-3">
        <!-- problem -->
        <div class="col-sm-12 col-md-6">
          <div class="fs-5 fw-semibold" style="color: #7a8cea">Problem</div>
          Individuals in our community face significant challenges due to a
          <strong>lack of food and health literacy</strong> , compounded by
          <strong> budget constraints</strong>, which in turn leads to a
          <strong>reluctance to track their caloric and nutrient intake</strong>
          , highlighting the need for a comprehensive solution to improve access
          to nutritious food, enhance health education, and address financial
          constraints.
        </div>
        <!-- solution -->
        <div class="col-sm-12 col-md-6">
          <div class="fs-5 fw-semibold" style="color: #7a8cea">Solution</div>
          Our solution is a user-friendly web app that offers
          <strong>personalized meal recommendations</strong>,
          <strong>compares ingredient prices in 3 supermarkets</strong> , and
          <strong>automates progress tracking for health goals</strong>. Our one-stop solution
          simplifies healthy eating, budgeting, and tracking, making it easier
          for individuals to improve their food choices and overall well-being.
        </div>
      </div>
      <!-- review by fellow groupmate -->
      <div class="fw-bold fs-5 text-center mt-5" style="color: #7a8cea">Team Mate</div>
      <div class="m-2 mx-3 d-flex">
        <AboutCard v-for="(input,name) in team" :key="name" :name="name" :memberInput="input"/>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import zhenyue from './teamImage/zhenyue.jpg'
import kaijie from './teamImage/kaijie.jpg'
import zavier from './teamImage/zavier.jpg'
import junwei from './teamImage/junwei.jpg'
import lumeul from './teamImage/lumeul.jpg'
export default {
  data(){return{
    team:{
      'Neo Jun Wei':{
        'comment':'i am the nigga that keep complaining about backend. but i like to do human backend.',
        "picture":junwei,
      },
      'Wang Kai Jie':{
        'comment':'Jun wei give me backend yesterday night',
        "picture":kaijie,
      },
      'Zavier Yan Ku KU':{
        'comment':'KU KU KU KU KU KU KU KU KU KU KU KU KU KU BIRD',
        "picture":zavier,
      },
      'Zhen Yue':{
        'comment':'STFU Zavier',
        "picture":zhenyue,
      },
      'Lumeul':{
        'comment':'My Ass is ready Jun Wei',
        "picture":lumeul,
      },
    }
  }
  }
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
