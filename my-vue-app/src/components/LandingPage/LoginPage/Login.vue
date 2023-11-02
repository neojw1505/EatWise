<template> 
  <div id="container" class="mx-auto d-block">
    <div>
      <NavbarLandingPage />
    </div>
    <div class="background-container">
      <userFill />
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
  position: fixed;
  display: flex;
  justify-content: center;
  width:100%;
  height:100%;
}

.background-container {
  background-image: url('../Assets/background.png');
  
}

#login-background {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Scales the image while maintaining aspect ratio */
}
#login-body{
  margin-top:200px;

}
</style>
