<template> 
  <div id="container" class="mx-auto d-block">
    <div class="">
      <RegistrationFill  :registerUser="registerUser"/>
    </div>

  </div>
</template>


<script>


export default {
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    props:['registerUser'],
    data() {return{
      gender:null
    }
    },
    methods: {
      
    },
    // created(){
    //   console.log(this.registerUser)
    // }
}
</script>

<style scoped>
.backgroundImage{
  width: 100%;
  height: 100%;
  object-fit: cover; /* Scales the image while maintaining aspect ratio */
  background-image: url(../Assets/background.png);
}


.backGroundimg{
  background-image: url(../homepageAsset/marketplacebackground.jpeg);
  width: 100%;
  object-fit: cover;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
