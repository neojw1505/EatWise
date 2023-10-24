<template>
  <div>
    <Navbar/>
    <div>
      <OnboardingGender v-if="pageNumber==0" @buttonAction="buttonAction"/>
      <OnboardingUserDetails v-if="pageNumber==1" @buttonAction="buttonAction"/>
      <OnboardingActivityLevel v-if="pageNumber==2" @buttonAction="buttonAction"/>
      <OnboardingDietType v-if="pageNumber==3" @buttonAction="buttonAction"/>
      <OnboardingExclusion v-if="pageNumber==4" @buttonAction="buttonAction"/>
      <OnboardFinalPage v-if="pageNumber==5" @buttonAction="buttonAction"/>
      <Registration v-if="pageNumber==6" @buttonAction="buttonAction" :registerUser="UserData"/>
    </div>
  </div>
</template>


<script>
import Navbar from '../Navbar/Navbar.vue';
export default {
  components: { Navbar },
  data(){return{
    pageNumber:0,
    UserData:{
      'gender':null,
      "age":null,
      'weight':null,
      'height':null,
      'goal':null,
      'activityLevel':null,
      'DietType':null,
      'IngredientRemove':[],
    }
  }
  },
  methods:{
    handlePassData(data){

    },
    buttonAction(data){
      if(data=="next"){
        this.pageNumber++;
      }
      else{
        this.pageNumber--;
      }
    }

  }
}
</script>


<style>
#container {
  width: 100vh;
  height: 100vh;
}
body {
  background-image: url(img/background.png);
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  /* background-repeat: no-repeat; */
}
</style>
