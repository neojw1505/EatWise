<template> 
  <div id="container" class="mx-auto d-block">
    <div>
      <NavbarLandingPage />
    </div>
    <div id="background-container">
      <img id="login-background" src="../Assets/background.png" alt="background">
      <RegistrationFill />
    </div>

  </div>
</template>


<script>
import NavbarLandingPage from '../../Navbar/NavbarLandingPage.vue';
import RegistrationFill from './RegiFill/RegistrationFill.vue';

export default {
    name: 'loginPage',
    data() {
    },
    methods: {},
    components: { NavbarLandingPage, RegistrationFill }
}
</script>

<style>
#container{
  position: fixed;
  display: flex;
  justify-content: center;
  width:100%;
  height:100%;
}

#background-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;

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
