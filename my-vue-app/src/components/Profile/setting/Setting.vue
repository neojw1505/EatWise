<template>
  <div>
    <Navbar/>
    <div class="col-8 mx-2 rounded-4 px-0 border border-2 border-dark mb-2 mx-auto my-3" style="background-color: #FBE8A6;">
      <!-- header -->
      <div class="mx-0 rounded-4 p-2 py-1 border border-2 border-dark" style="background-color: #FFE1E1;"><h3>Setting</h3></div>
      <!-- setting  -->
      <div class="mx-3">
        <div>
          <button class="btn border m-2" :style="{ 'background-color': showPreference ? 'rgb(239, 138, 91)' : '#f8f9fa' }" @click="changeTab()">Preference</button>
          <button class="btn border m-2" :style="{ 'background-color': !showPreference ? 'rgb(239, 138, 91)' : '#f8f9fa' }" @click="changeTab()">Change Password</button>
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
.selectedBackground{
  background-color: rgb(239, 138, 91);
}
</style>