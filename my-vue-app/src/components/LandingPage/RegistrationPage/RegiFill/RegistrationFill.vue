<template>
  <div id="RegisterCard" class="card shadow">
    <div class="card-body">
      <div class="row col-sm-12 mx-auto my-10">
        <h5 class="card-title mb-4 text-center">User Registration</h5>
        <input
          class="col-sm-12 form-control"
          type="text"
          v-model="name"
          placeholder="Full Name"
          id="name"
        />
        <input
          class="col-sm-12 form-control"
          type="email"
          v-model="email"
          placeholder="Email Address"
          id="email"
        />
        <input
          class="password-group col-sm-12 form-control"
          type="password"
          v-model="password"
          placeholder="Password"
          id="password"
        />

        <input
          class="password-group col-sm-12 mt-2 form-control"
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          id="confirmPassword"
        />
        <input
          class="col-12 form-control"
          type="date"
          v-model="dateOfBirth"
          id="date"
          placeholder="dd-mm-yyyy"
        />
      </div>
      <div class="form-group text-center">
        <button
          id="register"
          class="btn shadow btn-lg text-center my-2"
          @click="register"
          type="submit"
        >
          Register Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "RegistrationFill",
  props: ["registerUser"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      error: [],
    };
  },
  methods: {
    async register() {
      this.error=[];
      if (this.password != this.confirmPassword) {
        this.error.push("password and confirm password mismatch");
        return;
      }

  
      // console.log(this.email);
      // console.log(this.password);
      // console.log(this.name);
      // console.log(this.dateOfBirth);

      try {
        await this.$smAPI.createUser(
        this.email,
        this.password,
        this.name,
        this.registerUser.age,
        "",
        this.dateOfBirth,
        this.registerUser.gender,
        this.registerUser.weight,
        this.registerUser.height,
        this.registerUser.goal,
        this.registerUser.activityLevel,
        this.registerUser.IngredientRemove,
        this.registerUser.DailyCalories,
        this.registerUser.DietType)
      } catch (error) {
        this.displayFirebaseError(error); // Display other errors with their message
        }
    },
    displayFirebaseError(errorObj) {
      this.error = [];
      if (errorObj.code == 'auth/email-already-in-use') {
        this.error.push('Email already in use!')
      }
      if (errorObj.code == 'auth/invalid-email') {
        this.error.push('Email is not valid!')
      }
      if (errorObj.code == 'auth/weak-password') {
        this.error.push('Password must be at least 6 characters!')
      }
      console.log(this.error);
      const errorList = this.error.map((error) => `<li>${error}</li>`).join('');
      const errorMessage = `<ul>${errorList}</ul>`;

      Swal.fire({
        title: 'Error',
        html: errorMessage,
        icon: 'error',
      });
    },
  },
  // please kai jie wtf do this thanks. Now it is passing 1 error obj at a time, we need to collate all the errors into an array then loop through the array in order to push each error into the this.error
    created() {
      console.log(this.registerUser);
    },
};
</script>

<style scoped>
.btn {
  background-color: #f4976c;
  color: white;
}
p {
  color: grey;
}

#name,
#email,
#password,
#date {
  color: #9a8f8f;
  margin-top: 10px;
}

.card-body {
  margin: auto;
  padding-top: 100px;
  padding-bottom: 100px;
  padding: 10px;
}

#RegisterCard {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  border-radius: 40px;
}

input {
  width: 100%;
}
</style>
