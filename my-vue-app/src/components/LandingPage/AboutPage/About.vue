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
          class="main-text"
          data-aos="fade-up" data-aos-duration="1000"
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
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500"
          >
            Nourishing Your
            <span style="color: #7a8cea; font-weight: bold">Journey</span>, One
            Bite at a Time
          </h4>
        </div>
      </div>
      <!-- about -->
      <div class="row m-2 mx-3" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
        <!-- problem -->
        <div class="col-sm-12 col-md-6">
          <div class="fw-semibold" style="color: #7a8cea"><h1 class="sub-text">Problem</h1></div>
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
          <div class="fw-semibold" style="color: #7a8cea"><h1 class="sub-text">Solution</h1></div>
          Our solution is a user-friendly web app that offers
          <strong>personalized meal recommendations</strong>,
          <strong>compares ingredient prices in 3 supermarkets</strong> , and
          <strong>automates progress tracking for health goals</strong>. Our one-stop solution
          simplifies healthy eating, budgeting, and tracking, making it easier
          for individuals to improve their food choices and overall well-being.
        </div>
      </div>
      <!-- review by fellow groupmate -->
      <div class="fw-bold text-center mt-5" style="color: #7a8cea"><h1 class="sub-text">Meet The Team</h1></div>
      <div class="justify-content-center align-items-centerm-2 mx-3 d-flex flex-wrap" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
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
        'comment':'I did backend. Every night i dream about doing backend on lemuel',
        "picture":junwei,
      },
      'Wang Kai Jie':{
        'comment':"Where is the nearest Mcdonald's?",
        "picture":kaijie,
      },
      'Zavier Yan':{
        'comment':'I did Wang Kai Li <3',
        "picture":zavier,
      },
      'Zhen Yue':{
        'comment':'I did ligma...figma**.. ligmaballs.',
        "picture":zhenyue,
      },
      'Lemuel Fan':{
        'comment':'My Ass is ready Jun Wei',
        "picture":lumeul,
      },
    }
  }
  },
  created(){
    window.scrollTo({ top: 0, behavior: "smooth" });
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

@media screen and (min-width: 601px) {
  h1.main-text {
    font-size: 80px;
  }
  h1.sub-text {
    font-size: 50px;
  }
}

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
@media screen and (max-width: 600px) {
  h1.main-text {
    font-size: 55px;
  }

  h1.sub-text {
    font-size: 35px;
  }
}
</style>
