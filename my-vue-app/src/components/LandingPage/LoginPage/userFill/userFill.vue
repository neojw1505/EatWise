<template>
  <div class="container">
    <div id="logincard" class="card shadow">
      <div class="card-body">
        <h5 class="card-title text-center mb-4">Member Login</h5>
        <input type="text" class="form-control mb-3" id="email" placeholder="Email Address">
        <input type="password" class="form-control mb-3" id="password" placeholder="Password">
        <a href="#" class="card-link">Forgot Password?</a>
        <div class="form-group text-center">
          <button id="login" class="btn shadow btn-lg text-center my-2" type="submit">Login</button>
        </div>
        <div class="form-group">
          <p class="text-center">Not a member yet? <a href="/register">Sign up now!</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userFill',
};
</script>

<style scoped>

.btn{
  background-color: #F4976C;
  color:white;
}

#logincard {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border-radius: 40px;
}

input {
  width: 100%;
}
</style>
