<template>
  <div>
    <!-- <Navbar/> -->


    <div class="header">
      <div class="image-overlay"> </div>

      <div class="mx-0 text-center py-4 fw-bold " style="font-size:50px;"><text>Setting</text></div>
      <!-- Place Header here -->
    </div>


    <div class="col-8 mx-2 rounded-4 px-0 shadow mb-2 mx-auto my-3" style="background-color: #fff; margin-top:200px;">
      <!-- header -->
      <!-- setting  -->
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

.image-overlay{
  /* background-image: url(../marketplacebackground.jpeg); */
  object-fit: cover;
  background-size: cover;
  border-image-repeat: no-repeat;
  width:100%;
  height:100%;
}
</style>