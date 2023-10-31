<template>
  <div>
    <div class="row">
      <!-- Full Name -->
      <div class="col-md-6">
        <div class="my-3">
          <label for="ProfileSettingfullname" class="form-label fw-bold">Full Name</label>
          <input type="text" id="ProfileSettingfullname" class="form-control" v-model="userInfo.fullname" />
        </div>
      </div>
      <!-- Date of Birth -->
      <div class="col-md-6">
        <div class="my-3">
          <label for="ProfileSettingDOB" class="form-label fw-bold">Date of Birth (DD/MM/YYYY)</label>
          <input type="date" id="ProfileSettingDOB" class="form-control" v-model="userInfo.DOB" />
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Gender -->
      <div class="my-3">
      <span class="fw-bold">Gender</span>
      <div class="d-flex my-3 flex-wrap">
        <div v-for="gender in gendersInput" :key="gender.value" class="mx-1">
          <div
            class="card"
            :class="{ 'selected': userInfo.gender === gender.value }"
            @click="userInfo.gender = gender.value"
          >
            <div class="card-body">
              <p class="card-text">{{ gender.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      <!-- Weight -->
      <div class="col-md-4">
        <div class="my-3">
          <label for="ProfileSettingWeight" class="form-label fw-bold">Weight (kg)</label>
          <input type="text" id="ProfileSettingWeight" class="form-control" v-model="userInfo.weight" /> 
          <span></span>
        </div>
      </div>
      <!-- Height -->
      <div class="col-md-4">
        <div class="my-3">
          <label for="ProfileSettingHeight" class="form-label fw-bold">Height (cm)</label>
          <input type="text" id="ProfileSettingHeight" class="form-control" v-model="userInfo.height" />
        </div>
      </div>
    </div>

    <!-- Goal -->
    <div class="my-3">
      <span class="fw-bold">Goal</span>
      <div class="d-flex my-3 flex-wrap">
        <div v-for="goal in goalsInput" :key="goal.value" class="mx-1">
          <div
            class="card"
            :class="{ 'selected': userInfo.goal === goal.value }"
            @click="userInfo.goal = goal.value"
          >
            <div class="card-body">
              <p class="card-text">{{ goal.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Activity -->
    <div class="my-3">
      <span class="fw-bold">Daily Activity</span>
      <div class="d-flex my-3 flex-wrap">
        <div v-for="act in dailyActivityInput" :key="act.value" class="mx-1">
          <div
            class="card"
            :class="{ 'selected': userInfo.dailyActivity === act.value }"
            @click="userInfo.dailyActivity = act.value"
          >
            <div class="card-body">
              <p class="card-text">{{ act.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Diet Type -->
    <div class="my-3">
      <span class="fw-bold">Diet Type</span>
      <div class="d-flex my-3 flex-wrap">
        <div v-for="diet in dietTypeInput" :key="diet.value" class="mx-1">
          <div
            class="card"
            :class="{ 'selected': userInfo.dietType === diet.value }"
            @click="userInfo.dietType = diet.value"
          >
            <div class="card-body">
              <p class="card-text">{{ diet.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  <!-- Exclude ingredients -->
  <div class="my-3">
    <label for="ProfileSettingExcludeIngredient" class="form-label fw-bold">Exclude ingredients</label>
    <div class="d-flex align-items-center">
      <input placeholder="Type here to exclude ingredients..." id="ProfileSettingExcludeIngredient" class="form-control d-inline" v-model="addIngredientsToFilter" />
      <span @click="addIngredient(addIngredientsToFilter)" class="btn border-0 rounded-3 mx-2 px-2 border-2 bg-light" type="button">Add</span>
    </div>
    <div class="m-3 d-flex justify-content-start" style="flex-wrap: wrap">
      <div v-for="ingredient in userInfo.exclusionList" :key="ingredient" class="rounded-5 border bg-white px-3 py-2 align-items-center mx-1">
        <strong>{{ ingredient }}</strong><span class="btn btn-sm rounded-3 btn-danger ms-2" @click="removeIngredient(ingredient)"><strong>X</strong></span>
      </div>
    </div>
  </div>

 
    <!-- saved button -->
    <div class="my-3 justify-content-end d-flex">
      <button class="btn fw-bold" style="background-color: #f4976c" @click="changeSetting()">Save</button>
    </div>
  </div>
</template>


<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      userInfo: {
        fullname: "",
        DOB: "",
        gender: "",
        weight: "",
        height: "",
        goal: "",
        dailyActivity: "",
        dietType: "",
        exclusionList: [],
      },
      addIngredientsToFilter: "",
      gendersInput: [
        {value: 'male', label:'Male'},
        {value:'female', label:'Female'},
      ],
      goalsInput: [
        { value: 'extremelose', label: 'Extreme Weight Loss', color: 'red' },
        { value: 'weightlose', label: 'Weight Loss', color: 'orange' },
        { value: 'mildlose', label: 'Mild Weight Loss', color: 'lightsalmon' },
        { value: 'maintain', label: 'Maintain Weight', color: 'green' },
        { value: 'mildgain', label: 'Mild Weight Gain', color: 'lightsalmon' },
        { value: 'weightgain', label: 'Weight Gain', color: 'orange' },
        { value: 'extremegain', label: 'Extreme Weight Gain', color: 'red' },
      ],
      dailyActivityInput: [
        { value: "2", label: "Sedentary"},
        { value: "3", label: "Light"},
        { value: "4", label: "Moderate"},
        { value: "5", label: "Heavy"},
        { value: "6", label: "Very Heavy"},
        { value: "7", label: "Extreme"},
      ],
      dietTypeInput: [
        { id: "vegetarian", label: "Vegetarian", value: "vegetarian", description: "No meat or fish" },
        { id: "standard", label: "Standard", value: "standard", description: "I'm Easy" },
        { id: "vegan", label: "Vegan", value: "vegan", description: "No Animal Products" },
        { id: "pescetarian", label: "Pescetarian", value: "pescetarian", description: "Vegetarian + Seafood" },
        { id: "dairy-free", label: "Dairy-Free", value: "dairy-free", description: "No Dairy Products" },
        { id: "paleolithic", label: "Paleolithic", value: "paleolithic", description: "Meat, Fish, Nuts, Veggies" },
        { id: "primal", label: "Primal", value: "primal", description: "Meat Only" },
        { id: "gluten-free", label: "Gluten-Free", value: "gluten-free", description: "No products with gluten" },
        { id: "whole30", label: "Whole 30", value: "whole30", description: "No Alcohol, Sugar, Grains, Legumes, dairy" },
      ],
    };
  },
  methods: {
    addIngredient(ingredient) {
      if (this.addIngredientsToFilter !== "") {
        this.userInfo.exclusionList.push(ingredient);
        this.addIngredientsToFilter = ""; // Clear the input field after adding
      }
      else{
        // add sweet alert
      }
    },
    removeIngredient(ingredient) {
      const index = this.userInfo.exclusionList.indexOf(ingredient);
      if (index !== -1) {
        this.userInfo.exclusionList.splice(index, 1);
      }
  },
  async changeSetting() {
  try {
    await this.$smAPI.auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        await this.$smAPI.updateUserProfile(
          user.uid,
          this.userInfo.fullname,
          "",
          this.userInfo.DOB,
          this.userInfo.gender,
          this.userInfo.weight,
          this.userInfo.height,
          this.userInfo.goal,
          this.userInfo.dailyActivity,
          this.userInfo.exclusionList,
          this.userInfo.dietType
        );
        
        // Show a success message using SweetAlert
        Swal.fire({
          title: 'Profile Updated',
          text: 'Profile successfully updated!',
          icon: 'success',
        });
      }
    });
  } catch (error) {
    console.error(error);
    
      // Show an error message using SweetAlert
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while updating the profile',
        icon: 'error',
      });
    }
  },
 
    async getUserProfile(){
      console.log(this.$smAPI.getLoginUserProfile());
      let userDetails=await this.$smAPI.getLoginUserProfile();
      this.userInfo.fullname=userDetails.fullName;
      this.userInfo.DOB=userDetails.dob;
      this.userInfo.gender=userDetails.gender;
      this.userInfo.weight=userDetails.weight;
      this.userInfo.height=userDetails.height;
      this.userInfo.goal=userDetails.goals;
      this.userInfo.dailyActivity=userDetails.activityLevel;
      this.userInfo.exclusionList=userDetails.ingredientRemove;
      this.userInfo.dietType=userDetails.dietType;
    }
    
    },
  async created() {
      // Ensure the user is authenticated before fetching the user profile
      try {
        await this.$smAPI.auth.onAuthStateChanged(async (user) => {
          if (user) {
            // User is authenticated, fetch user profile
            await this.getUserProfile();
          } else {
            // Handle the case when the user is not authenticated
            console.error("User not authenticated.");
          }
        });
      } catch (error) {
        console.error("Error checking authentication state", error);
      }
    },
  }

</script>

<style scoped>
.card {
  text-align: center;
  width: 200px;
  border-radius: 5px;
  cursor: pointer;
  transition: border 0.3s;
  margin-bottom: 10px;
}

.card.selected {
box-shadow: 0 0 2px 2px #007459;}

.card-text {
  margin: 0;
}
</style>

