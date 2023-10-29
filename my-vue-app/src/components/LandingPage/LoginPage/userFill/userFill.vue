<template>
  <div class="container">
    <div id="logincard" class="card shadow">
      <div class="card-body">
        <h5 class="card-title text-center mb-4">Member Login</h5>
        <input
          type="text"
          class="form-control mb-3"
          id="email"
          placeholder="Email Address"
          v-model="email"
        />
        <input
          type="password"
          class="form-control mb-3"
          id="password"
          placeholder="Password"
          v-model="password"
        />
        <a href="#" class="card-link" @click="forgotPassword">Forgot Password?</a>
        <div class="form-group text-center">
          <button
            id="login"
            class="btn shadow btn-lg text-center my-2"
            type="submit"
            @click="login"
          >
            Login
          </button>
        </div>
        <div class="form-group">
          <p class="text-center">
            Not a member yet? <a href="/register">Sign up now!</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "userFill",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        await this.$smAPI.login(this.email, this.password);
        this.$router.push({ path: '/' });
      } catch (error) {
        // Handle login error, show a message, or take appropriate action.
        console.error(error);
      }
    },
    forgotPassword() {
      Swal.fire({
        title: 'Forgot Password',
        input: 'email',
        inputLabel: 'Enter your email address',
        inputPlaceholder: 'Email address',
        showCancelButton: true,
        confirmButtonText: 'Send',
        cancelButtonText: 'Cancel',
        preConfirm: (email) => {
          if (!email) {
            Swal.showValidationMessage('Email address is required');
          } else {
            this.sendPasswordResetEmail(email);
          }
        },
      });
    },
    sendPasswordResetEmail(email) {
      // Add the logic here to send a reset password link to the provided email address @junwei
      Swal.fire({
        title: 'Password Reset Email Sent',
        text: 'A password reset email has been sent to ' + email,
        icon: 'success',
      });
    },
  },
};
</script>

<style scoped>
.btn {
  background-color: #f4976c;
  color: white;
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
