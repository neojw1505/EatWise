<template>
  <div>
    <div>        
      <Navbar />
    </div>
    <div class="section1">
      <div> 
        <span class="d-flex text-center" style="justify-content: right;" ><Logout/></span>
      </div>
    <ProfileTop :userName="ProfileName" />
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
import Logout from "./ProfileTop/Logout.vue";
export default {
  components: { Navbar, Logout },
  data() {
    return {
      ProfileName: 'Welcome back, Jun Wei', 
      // Added a placeholder here
    };
  },
 async created() {
    try {
      await this.$smAPI.auth.onAuthStateChanged(user => {
        if (user) {
          this.ProfileName = user.displayName;
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
  padding-top: 80px;
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
