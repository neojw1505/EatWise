<template>
  <div class="page">
    <Navbar/>
    <div class="section1" style="padding-top:100px">

    <ProfileTop :userName="ProfileName"/>
    
    <!-- <hr
      class="border border-dark border-1 opacity-100 mx-3 mx-auto"
      style="max-width: 1200px"
    /> -->
    </div>
  <div class="section2">
    <ProfileBottom />
  </div>
  </div>
</template>

<script>
import Navbar from "../Navbar/Navbar.vue";

export default {
  components: { Navbar, Logout },
  data() {
    return {
      ProfileName: '',
  
    };
  },
  methods:{
  },
async created() {
    try {
      await this.$smAPI.auth.onAuthStateChanged(user => {
        if (user) {
          this.ProfileName = user.displayName.toUpperCase();
        }
      });
    } catch (error) {
      console.error("Error getting currentUser", error);
    }
  },
};
</script>

<style scoped>
.section1{
  background-image: url(../homepageAsset/profilepagebg.png);
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
}

.section2{
  background-image: url(../homepageAsset/background-s3.png);
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
}

</style>
