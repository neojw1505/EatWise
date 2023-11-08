<template>
  <div>
    <Navbar/>
    <div>
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
            data-aos="fade-up"
            data-aos-duration="1000"
            style="
              color: whitesmoke;
              font-family: Playfair;
            "
          >
            EatWise
          </h1>
          <h4
            class="sub-text"
            style="font-family: Playfair"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            Nourishing Your
            <span style="color: #7a8cea; font-weight: bold">Journey</span>, One
            Bite at a Time
          </h4>
        </div>
      </div>
      <div class="background" style="padding-top: 50px">
        <div class="fw-bold text-center mb-5" style="color: #7a8cea">
          <h1 class="sub-text subTitle bg-dark text-light rounded-4 mx-auto">
            What we Offer
          </h1>
        </div>
        <!-- Compare Groceries Prices! -->
        <div
          class="container-fluid"
          data-aos="fade-right"
          data-aos-duration="2500"
          data-aos-offset="300"
        >
          <div class="row">
            <div class="col-md-6 p-5" style="align-self: center">
              <div class="fw-semibold" style="color: #7a8cea">
                <h1 class="sub-text ">
                  <p class="feature">
                    <span style="color: #000">Compare</span> <br />Groceries
                    Prices!
                  </p>
                </h1>
              </div>
            </div>
            <div class="col-md-6 p-5">
              <img
                src="../../homepageAsset/Market_EatWise.png"
                class="w-100"
                style="border: 1px solid grey; border-radius: 10px"
              />
            </div>
          </div>
        </div>

        <!-- Personalised Meal Plans -->
        <div
          class="container-fluid"
          data-aos="fade-left"
          data-aos-duration="2500"
          data-aos-offset="300"
        >
          <div class="row">
            <!-- if the screen is smaller than 992px -->
            <div class="col-md-6 p-5" style="align-self: center" v-if="!isLargeScreen">
              <div class="fw-semibold" style="color: #7a8cea">
                <h1 class="sub-text ">
                  <p class="feature">
                    <span style="color: #000">Personalised</span> <br/>Meal
                    Plan!
                  </p>
                </h1>
              </div>
            </div>
            <div class="col-md-6 p-5">
              <img
                src="../../homepageAsset/MealPlan_EatWise.png"
                class="w-100"
                style="border: 1px solid grey; border-radius: 10px"
              />
            </div>
            <!-- if the screen is bigger than 992px -->
            <div class="col-md-6 p-5" style="align-self: center" v-if="isLargeScreen">
              <div class="fw-semibold" style="color: #7a8cea">
                <h1 class="sub-text ">
                  <p class="feature">
                    <span style="color: #000">Personalised</span> <br/>Meal
                    Plan!
                  </p>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <!-- Insights -->
        <div
          class="container-fluid"
          data-aos="fade-right"
          data-aos-duration="2500"
          data-aos-offset="300"
        >
          <div class="row">
            <div class="col-md-6 p-5" style="align-self: center">
              <div class="fw-semibold" style="color: #7a8cea">
                <h1 class="sub-text">
                  <p class="feature">
                    <span style="color: #000">Gain</span> the <br />
                    latest insights!
                  </p>
                </h1>
              </div>
            </div>
            <div class="col-md-6 p-5">
              <img
                src="../../homepageAsset/Insights.png"
                class="w-100"
                style="border: 1px solid grey; border-radius: 10px"
              />
            </div>
          </div>
        </div>
        <!-- Meet The Team -->
        <div
          class="container-fluid pb-5"
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-offset="300"
        >
          <div class="fw-bold text-center mt-5" style="color: #7a8cea">
            <h1 class="sub-text subTitle bg-dark text-light rounded-4 mx-auto">
              Meet The Team
            </h1>
          </div>
          <div
            class="justify-content-center align-items-centerm-2 mx-3 d-flex flex-wrap"
          >
            <AboutCard
              data-aos="fade-zoom-in"
              data-aos-duration="1500"
              data-aos-easing="ease-in-back"
              v-for="(input, name) in team"
              :key="name"
              :name="name"
              :memberInput="input"
            />
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import zhenyue from "./teamImage/zhenyue.jpg";
import kaijie from "./teamImage/kaijie.jpg";
import zavier from "./teamImage/zavier.jpg";
import junwei from "./teamImage/junwei.jpg";
import lumeul from "./teamImage/lumeul.jpg";
export default {
  data() {
    return {
      duration: 1000,
      team: {
        "Neo Jun Wei": {
          comment:
            "Backend/Frontend",
          picture: junwei,
        },
        "Wang Kai Jie": {
          comment: "Frontend",
          picture: kaijie,
        },
        "Zavier Yan": {
          comment: "Frontend",
          picture: zavier,
        },
        "Zhen Yue": {
          comment: "Frontend/Figma",
          picture: zhenyue,
        },
        "Lemuel Fan": {
          comment: "Frontend/Figma",
          picture: lumeul,
        },
      },
      isLargeScreen: window.innerWidth > 992,
      test:null
    };
  },
  methods:{
    checkScreenSize() {
      this.isLargeScreen = window.innerWidth > 992;
    },
  },
  async created() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.addEventListener("resize", this.checkScreenSize);
    this.test=await this.$smAPI.auth
    console.log(this.test)
  },
  destroyed() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>

<style scoped>
.background {
  background-image: url("../../homepageAsset/olga-thelavart-vS3idIiYxX0-unsplash.jpg");
  background-size: cover;
}

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

.feature {
  background-image: linear-gradient(to right, #ff9c38, #fcc315);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 60px;
  font-weight: bold;
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

.sub-text {
  width: fit-content;
  font-weight: bold;
  padding: 0px 20px;
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
  .feature{
    font-size: 40px;
  }
  .subTitle{
    font-size: 30px !important; 
  }
}
</style>
