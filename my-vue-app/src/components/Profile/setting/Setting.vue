<template>
  <div>
    <Navbar/>
    <div class="col-8 mx-2 rounded-4 px-0 border border-2 border-dark mb-2 mx-auto my-3" style="background-color: #FBE8A6;">
      <!-- header -->
      <div class="mx-0 rounded-4 p-2 py-1 border border-2 border-dark" style="background-color: #FFE1E1;"><h3>Setting</h3></div>
      <!-- setting  -->
      <div class="mx-3">
        <!-- fullname -->
        <div class="my-3">
          <label for="ProfileSettingfullname" class="form-label fw-bold">Full Name</label>
          <input type="text" id="ProfileSettingfullname" class="form-control" :value="userInfo.fullname">
        </div>
        <!-- Email Address -->
        <div class="my-3">
          <label for="ProfileSettingEmail" class="form-label fw-bold">Email Address</label>
          <input type="text" id="ProfileSettingEmail" class="form-control" :value="userInfo.email">
        </div>
         <!-- Password -->
         <div class="my-3">
          <label for="ProfileSettingPassword" class="form-label fw-bold">Password</label>
          <input type="text" id="ProfileSettingPassword" class="form-control" :value="userInfo.password">
        </div>
        <!-- Confirm Password -->
        <div class="my-3">
          <label for="ProfileSettingConfirmPassword" class="form-label fw-bold">Confirm Password</label>
          <input type="text" id="ProfileSettingConfirmPassword" class="form-control" :value="userInfo.confirmPassword">
        </div>
        <!-- Date of Birth DD/MM/YYYY -->
        <div class="my-3">
          <label for="ProfileSettingDOB" class="form-label fw-bold">Date of Birth (DD/MM/YYYY)</label>
          <input type="text" id="ProfileSettingDOB" class="form-control" :value="userInfo.DOB">
        </div>
        <!-- Gender -->
        <div class="my-3">
          <label for="ProfileSettingGender" class="form-label fw-bold">Gender</label>
          <input type="text" id="ProfileSettingGender" class="form-control" :value="userInfo.gender">
        </div>
        <!-- Weight -->
        <div class="my-3">
          <label for="ProfileSettingWeight" class="form-label fw-bold">Weight</label>
          <input type="text" id="ProfileSettingWeight" class="form-control" :value="userInfo.weight">
        </div>
        <!-- Height -->
        <div class="my-3">
          <label for="ProfileSettingHeight" class="form-label fw-bold">Height</label>
          <input type="text" id="ProfileSettingHeight" class="form-control" :value="userInfo.height">
        </div>
        <!-- Goal -->
        <div class="my-3 ">
          <span class="fw-bold">Goal</span>
          <div class="d-flex my-3 flex-wrap">
            <div v-for="goal in goalsInput"  :key="goal" class="mx-1">
            <label  class="form-label fw-semibold">
            <input
              class="form-check-input"
              type="radio"
              :value="goal"
              v-model="userInfo.goal" 
            >
            {{ goal }}
          </label>
          </div>
          </div>
        </div>
        <!-- Daily activity -->
        <div class="my-3 ">
          <span class="fw-bold">Daily Activity</span>
          <div class="d-flex my-3 flex-wrap">
            <div v-for="act in dailyActivityInput"  :key="act" class="mx-1">
            <label  class="form-label fw-semibold">
            <input
              class="form-check-input"
              type="radio"
              :value="act"
              v-model="userInfo.dailyActivity" 
            >
            {{ act }}
          </label>
          </div>
          </div>
        </div>
        <!-- Diet Type -->
        <div class="my-3 ">
          <span class="fw-bold">Diet Type</span>
          <div class="d-flex my-3 flex-wrap">
            <div v-for="diet in dietTypeInput"  :key="diet" class="mx-1">
            <label  class="form-label fw-semibold">
            <input
              class="form-check-input"
              type="checkbox"
              :value="diet"
              v-model="userInfo.dietType" 
            >
            {{ diet }}
          </label>
          </div>
          </div>
        </div>
        <!-- Exclude ingredients  -->
        <div class="my-3">
            <label for="ProfileSettingExcludeIngredient" class="form-label fw-bold">Exclude ingredients</label>
            <div class="d-flex align-items-center">
            <input
              id="ProfileSettingExcludeIngredient"
              class="form-control d-inline"
              v-model="addIngredientsToFilter"
            /><span
              @click="addIngredient"
              class="btn border rounded-3 mx-2 px-2 border-2 bg-light"
              type="button"
              >+</span
            >
          </div>
          <div class="m-3 d-flex justify-content-start" style=" flex-wrap: wrap;">
            <div
              v-for="i in userInfo.ExcludeIngredients"
              :key="i"
              class="rounded-5 border bg-dark-subtle p-2 align-items-center mx-1 "
              :value="i"
            >
              {{ i
              }}<span
                class="fw-bolder border rounded-5 bg-light px-2 pb-1 align-items-center"
                @click="removeIngredient(i)"
                >x</span
              >
            </div>
          </div>
        </div>
        <!-- saved button -->
        <div class="my-3 justify-content-end d-flex">
          <button class="btn fw-bold" style="background-color: #F4976C;" @click="saveSetting">Save</button>
        </div>
        <savedNotification ref="notification"/>
    </div>
  </div>
    
      

    </div>
</template>

<script>
export default {
  data(){return{
    userInfo:{
      "fullname":"",
      "email":"",
      "password":"",
      "confirmPassword":"",
      "DOB":"",
      "gender":"",
      "weight":"",
      "heigth":"",
      "goal":"",
      "dailyActivity":"",
      "dietType":[],
      "ExcludeIngredients":[],
    },
    addIngredientsToFilter: "",
    goalsInput:['Lose Weight','Maintain Weight','Gain Weight'],
    dailyActivityInput:["Inactive","Light","Moderate","Heavy"],
    dietTypeInput:["Standard","Gluten Free","Pescatarian","Paleolithic","Dairy Free","Lacto Ovo Vegetarian","Primal","Whole 30","Vegan"],


  }},
  methods:{
    addIngredient() {
      // console.log(this.addIngredientsToFilter)
      if (this.addIngredientsToFilter == "") {
        return;
      }
      this.userInfo.ExcludeIngredients.push(this.addIngredientsToFilter);
      this.addIngredientsToFilter = "";
      console.log(this.userInfo.ExcludeIngredients);
    },
    removeIngredient(i) {
      let index = this.userInfo.ExcludeIngredients.indexOf(i);
      this.userInfo.ExcludeIngredients.splice(index, 1);
      console.log(this.userInfo.ExcludeIngredients);
    },
    check(){
      console.log(this.userInfo.dietType)
    },
    saveSetting(){
      this.$refs.notification.showNotification();
    }
  }
}
</script>

<style>

</style>