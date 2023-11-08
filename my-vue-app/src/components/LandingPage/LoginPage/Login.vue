<template>
  <div class="backgroundImage" style="display: flex; flex-direction: column; min-height: 100vh; justify-content: space-between ;">
    <div class="mb-5">
      <NavbarLandingPage />
      <userFill data-aos="fade-up" data-aos-duration="1000"/>  
    </div>
    <Footer/>
  </div>
  

</template>

<script>
export default {
  created(){
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>

<style scoped>
.backgroundImage {
  width: 100%;
  height: 100vh;
  object-fit: cover; /* Scales the image while maintaining aspect ratio */
  background-image: url(../Assets/background.png);
}
</style>
