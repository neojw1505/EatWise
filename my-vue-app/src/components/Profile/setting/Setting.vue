<template>
  <div class="main">
    <!-- <Navbar/> -->


    <div class="header">
      <div class="image-overlay"> </div>

      <div class="text-center py-4 fw-bold"><h1 class="main" style="font-family: Georgia, 'Times New Roman', Times;">Edit Profile</h1></div>
      <!-- Place Header here -->
    </div>


    <div class="col-8 mx-2 rounded-4 px-0 shadow mb-2 mx-auto my-3" style="background-color: #fff; margin-top:200px;">
      <!-- header -->
      <!-- setting  -->
      <router-link
        class="text-decoration-none text-dark"
        to="/profile"
        style="cursor: pointer"
      >
        <!-- <div
          class="m-2 border border-2 border-dark rounded-4 bg-light text-center"
          style="width: 100px"
        >
          <p class="fw-semibold" >Back</p>
        </div> -->
        <div class="my-4 ms-4 d-flex">
      <button class="btn fw-bold mt-4" style="background-color: #7a8cea " >Back</button>
    </div>
      </router-link>
      <div class="mx-3">
        <div class="pt-4">
          <button class="btn border btn-md  m-2" :style="{ 'background-color': showPreference ? 'rgb(128, 128, 128)' : '#fff' }" @click="changeTab()">Preference</button>
          <button class="btn border btn-md m-2" :style="{ 'background-color': !showPreference ? 'rgb(128, 128, 128)' : '#fff' }" @click="changeTab()">Change Password</button>
        </div>
        <preference :class="{'d-none':!showPreference}"/>
        <changePassword :class="{'d-none':showPreference}"/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){return{
    showPreference: true
  }},
  methods:{
    changeTab(){
      this.showPreference=!this.showPreference;
    },
    
  }
}
</script>

<style>
.main{
  background-image: url(../../homepageAsset/profile_setting.jpg);
}


.image-overlay{
  background-image: url(../../homepageAsset/profile_setting.jpg);
  object-fit: cover;
  background-size: cover;
  border-image-repeat: no-repeat;
  width:100%;
  height:100%;
}

@media screen and (min-width: 601px) {
  h1.main {
    font-size: 60px;
  }

}

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
@media screen and (max-width: 600px) {
  h1.main {
    font-size: 40px;
  }}

  
</style>