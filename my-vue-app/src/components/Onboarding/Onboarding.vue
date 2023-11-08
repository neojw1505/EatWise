<template>
  <div>
    <div class="backgroundImage">
      <NavbarLandingPage/>
      <div style="display: flex; flex-direction: column; min-height: 100vh; justify-content: space-between ;">
        <div style="padding-top: 120px;">
          <OnboardingGender data-aos="fade-left" data-aos-duration="1000" v-if="pageNumber==0" @buttonAction="buttonAction" @addGender="addGender"/>
          <OnboardingUserDetails data-aos="fade-left" data-aos-duration="1000" @addAge="addAge" @addHeight="addHeight" @addWeight="addWeight" @addGoal="addGoal" v-if="pageNumber==1" @buttonAction="buttonAction"/>
          <OnboardingActivityLevel data-aos="fade-left" data-aos-duration="1000" @addActivityLevel="addActivityLevel" v-if="pageNumber==2" @buttonAction="buttonAction"/>
          <OnboardingDietType data-aos="fade-left" data-aos-duration="1000" @addDietType="addDietType" v-if="pageNumber==3" @buttonAction="buttonAction"/>
          <OnboardingExclusion data-aos="fade-left" data-aos-duration="1000" @addExclusion="addExclusion" v-if="pageNumber==4" @buttonAction="buttonAction"/>
          <OnboardFinalPage data-aos="fade-left" data-aos-duration="1000" v-if="pageNumber==5" @buttonAction="buttonAction" :registerUser="UserData" @passDailyCalorie="handleDailyCalories"/>
          <Registration @addName="addName" @addEmail="addEmail" @addDOB="addDOB" @addPassword="addPassword" v-if="pageNumber==6" @buttonAction="buttonAction" :registerUser="UserData"/>
        </div>
        <Footer/>
      </div>
      
    </div>
    
  </div>
  
</template>


<script>
export default {
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
  },
  created(){
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
</script>


<style scoped>

.backgroundImage{
  width: 100%;
  background-image: url(../LandingPage/Assets/background.png);
  background-size: cover;
}

</style>
