<template>
  <div>
    <Navbar />
    <ProfileTop :userName="ProfileName" />
    <hr
      class="border border-dark border-1 opacity-100 mx-3 mx-auto"
      style="max-width: 1200px"
    />
    <ProfileBottom />
  </div>
</template>

<script>
import Navbar from "../Navbar/Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      ProfileName: '',
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

<style></style>
