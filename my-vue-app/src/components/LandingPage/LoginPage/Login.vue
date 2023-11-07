<template>
  <div class="backgroundImage">
    <NavbarLandingPage />
    <userFill />
    <Footer/>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.backgroundImage {
  width: 100%;
  object-fit: cover; /* Scales the image while maintaining aspect ratio */
  background-image: url(../Assets/background.png);
}
</style>
