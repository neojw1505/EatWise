<template> 
  <div id="container" class="mx-auto d-block">
    <div>
      <NavbarLandingPage />
    </div>
    <div class="background-container">
      <div class="col-4">
        <!-- <video loop autoplay src="./homepageAsset/gif.mp4"></video> -->
      </div>
      <div class="col-8">  
        <userFill /> 
      </div>
    </div>

  </div>
</template>


<script>

export default {
    name: 'login',
    data() {
    },
}
</script>

<style scoped>
#container{
  display: flex;
  justify-content: center;
  width:100%;
  height:100%;
}

.background-container {
  /* background-image: url('../Assets/background.png'); */
  object-fit: cover; /* Scales the image while maintaining aspect ratio */
  background-size: contain; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
  background-position: center center; /* Center the image */
}

#login-body{
  margin-top:200px;

}
</style>
