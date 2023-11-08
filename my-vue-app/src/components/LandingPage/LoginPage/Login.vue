<template> 
  <div id="container" class="mx-auto d-block">

      <div>
        <NavbarLandingPage />
      </div>

      <div class="col-8">  
        <userFill /> 
      </div>
  </div>

  
    <div class="background-container">
      <!-- <div class="col-4">
        <video loop autoplay src="./homepageAsset/gif.mp4"></video>
      </div> -->



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
  width:100vw;
  height:100vh;

  background-image: url(../Assets/background.png);
  object-fit: cover; /* Scales the image while maintaining aspect ratio */
  background-size: cover; /* Scale image to fit container */
  background-repeat: no-repeat; /* Prevent repeating the image */
}

/* .body {
  background-image: url(./Assets/background.png);
  height:100%;
  width:100%;
  object-fit: contain; 
  background-size: contain; 
  background-repeat: no-repeat;
  background-position: center center; 
} */

#login-body{
  margin-top:200px;

}
</style>
