<!-- Home.vue -->
<template>
  <div>
    <Navbar />
    <RecipeOfDay
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="200"
      data-aos-offset="100"
      class="pt-2 my-3 mx-3"
    />
    <MealPlan class="p-4 pt-2 shadow border rounded-4 my-3 mx-3" />
    <NewPromoCarousel class="p-4 pt-2 shadow border rounded-4 my-3 mx-3" />
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  mounted() {
    if (this.$store.getters.isLoginNotificationShown === false) {
      // Show the SweetAlert notification
      this.loginSuccessNotif();

      // Update the notification flag in the store
      this.$store.dispatch('setShowLoginNotification', true)
    }
  },
  methods: {
    loginSuccessNotif() {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    },
  },
};
</script>

<style scoped>
.home-container {
  /* background-color: #007459; */
  display: flex;
}
</style>
