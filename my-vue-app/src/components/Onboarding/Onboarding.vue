<template>
  <div>
    <NavbarLandingPage/>
    <div>
      <OnboardingGender v-if="pageNumber==0" @buttonAction="buttonAction" @addGender="addGender"/>
      <OnboardingUserDetails @addAge="addAge" @addHeight="addHeight" @addWeight="addWeight" @addGoal="addGoal" v-if="pageNumber==1" @buttonAction="buttonAction"/>
      <OnboardingActivityLevel @addActivityLevel="addActivityLevel" v-if="pageNumber==2" @buttonAction="buttonAction"/>
      <OnboardingDietType @addDietType="addDietType" v-if="pageNumber==3" @buttonAction="buttonAction"/>
      <OnboardingExclusion @addExclusion="addExclusion" v-if="pageNumber==4" @buttonAction="buttonAction"/>
      <OnboardFinalPage v-if="pageNumber==5" @buttonAction="buttonAction" :registerUser="UserData" @passDailyCalorie="handleDailyCalories"/>
      <Registration @addName="addName" @addEmail="addEmail" @addDOB="addDOB" @addPassword="addPassword" v-if="pageNumber==6" @buttonAction="buttonAction" :registerUser="UserData"/>
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
      'name': null,
      'email':null,
      'dob': null,
      'password': null,
      'DailyCalories': null,
      'DietType':null
    }
  }
  },
  methods:{
    buttonAction(data){
      if(data=="next"){
        this.pageNumber++;
        console.log(this.UserData);
      }
      else{
        this.pageNumber--;
      }
    },
    handleDailyCalories(data){
      this.UserData.DailyCalories=data;
    },

    addGender(data){
      this.UserData.gender = data;
    },
    addAge(data){
      this.UserData.age = data;
    },
    addHeight(data){
      this.UserData.height = data;
    },
    addWeight(data){
      this.UserData.weight = data;
    },
    addGoal(data){
      this.UserData.goal = data;
    },
    addActivityLevel(data){
      this.UserData.activityLevel = data;
    },
    addDietType(data){
      this.UserData.DietType = data;
    },
    addExclusion(data){
      this.UserData.IngredientRemove = data;
    },
    addName(data){
      this.UserData.name = data;
    },
    addEmail(data){
      this.UserData.email = data;
    },
    addDOB(data){
      this.UserData.dob = data;
    },
    addPassword(data){
      this.UserData.password = data;
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
  background-repeat: no-repeat;
}
</style>
