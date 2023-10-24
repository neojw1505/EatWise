<template> 
  <div id="container" class="mx-auto d-block">
    <div id="background-container">
      <img id="Registration-background" src="../Assets/background.png" alt="background">
      <RegistrationFill />
    </div>

  </div>
</template>


<script>


export default {
    name: 'Registration',
    props:['registerUser'],
    data() {return{
      gender:null
    }
    },
    methods: {},
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

#background-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;

}

#Registration-background {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Scales the image while maintaining aspect ratio */
}
#Registration-body{
  margin-top:200px;

}
</style>
