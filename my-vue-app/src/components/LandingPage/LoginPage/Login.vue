<template>
  <div class="backgroundImage" style="padding: 20%;">  
    <NavbarLandingPage/>
    <userFill data-aos="fade-up" data-aos-duration="1000"/>  
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
  object-fit: cover; /* Scales the image while maintaining aspect ratio */
  background-image: url(../Assets/background.png);
}
</style>
