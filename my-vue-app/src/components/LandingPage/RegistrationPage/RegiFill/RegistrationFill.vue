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
            class="password-group col-sm-12 form-control"
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            id="confirmPassword"
          />
          <input
            class="col-12 form-control"
            type="date"
            v-model="dateOfBirth"
            placeholder="Date of Birth"
            id="date"
          />
        </div>
        <div v-if="error.length>0" class="mt-3 p-2 border border-2 rounded-4 border-danger-subtle">
          Errors:
          <ul>
            <li v-for="e in error" :key="e">{{ e }}</li>
          </ul>
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
export default {
  name: "RegistrationFill",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword:"",
      dateOfBirth: "",
      error:[],
    };
  },
  methods: {
    async register() {
      if (this.password!=this.confirmPassword){
        this.error.push("password and confirmPassword mismatch");
        return
      }
      if (this.password.length<6){
        this.error.push("Password should have at least 6 characters");
        return
      }
      // console.log(this.email);
      // console.log(this.password);
      // console.log(this.name);
      // console.log(this.dateOfBirth);

      await this.$smAPI.createUser(
        this.email,
        this.password,
        this.name,
        "",
        this.dateOfBirth,
        "M",
        "80",
        "180",
        "weightlose",
        "5"
      );
    },

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
