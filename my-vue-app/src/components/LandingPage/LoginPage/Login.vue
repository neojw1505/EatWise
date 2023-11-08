<template>
  <div>
    <div class="backgroundImage">
      <NavbarLandingPage />
      <userFill />  
    </div>
    <Footer/>
  </div>

</template>

<script>
export default {};
</script>

<style scoped>
.backgroundImage {
  width: 100%;
  height: 100vh;
  object-fit: cover; /* Scales the image while maintaining aspect ratio */
  background-image: url(../Assets/background.png);
}
</style>
