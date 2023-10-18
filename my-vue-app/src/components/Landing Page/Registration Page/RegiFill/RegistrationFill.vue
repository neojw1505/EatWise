<template>
  <div id="RegisterCard" class="card shadow">
    <div class="card-body d-block">
      <form>
        <div class="row col-sm-12 mx-auto my-10">
          <h5 class="card-title mb-4 text-center">User Registration</h5>
          <input class="col-sm-12 form-control" type="text" v-model="name" placeholder="Full Name" id="name">
          <input class="col-sm-12 form-control" type="email" v-model="email" placeholder="Email Address" id="email">
          <input class="password-group col-sm-12 form-control" type="password" v-model="password" placeholder="Password" id="password">
          <input class="col-12 form-control" type="date" v-model="dateOfBirth" placeholder="Date of Birth" id="date">
        </div>
        <div class="form-group text-center">
          <button id="register" class="btn shadow col-sm-6 col-xs-6 btn-lg text-center my-2 " type="submit">Register Now</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrationFill',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      dateOfBirth: '',
    };
  },
};
</script>

<style scoped>

.btn{
  background-color: #F4976C;
  color:white;
  border: 1px solid black;
}
p {
  color: grey;
}

#name,
#email,
#password,
#date {
  color: #9A8F8F;
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

.input-group-append {
  cursor: pointer;
}

</style>
