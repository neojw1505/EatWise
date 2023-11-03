<template>
  <div>
        <!--current Password -->
    <div class="my-3">
      <label for="ProfileCurrentPassword" class="form-label fw-bold">Current Password</label>
      <input type="password" id="ProfileCurrentPassword" class="form-control" v-model="userInfo.CurrentPassword">
    </div>
        <!--New Password -->
    <div class="my-3">
      <label for="ProfileSettingPassword" class="form-label fw-bold">New Password</label>
      <input type="password" id="ProfileSettingPassword" class="form-control" v-model="userInfo.NewPassword">
    </div>
    <!-- Confirm Password -->
    <div class="my-3">
      <label for="ProfileSettingConfirmPassword" class="form-label fw-bold">Confirm New Password</label>
      <input type="password" id="ProfileSettingConfirmPassword" class="form-control" v-model="userInfo.confirmNewPassword">
    </div>
    <!-- save button -->
    <div class="my-3 justify-content-end d-flex">
      <button class="btn fw-bold" style="background-color: #F4976C;" @click="saveSetting">Save</button>
    </div>
    
    <!-- <savedNotification ref="notification"/> -->
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data(){return{
    userInfo: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    errors:[]
  }},
  methods:{
    async saveSetting() {
  this.errors = [];
  if (this.userInfo.NewPassword !== this.userInfo.confirmNewPassword) {
    this.errors.push("New password and Confirm new password mismatched");
  }
  if (this.userInfo.NewPassword.length < 6) {
    this.errors.push("New password must be at least 6 characters");
  }

  // Check if there are any errors
  if (this.errors.length > 0) {
    // If there are errors, display them using SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'There are some errors in your submission:',
      html: this.errors.join('<br>'),
    });
  } else {
    try {
      await this.$smAPI.updateUserPassword(this.userInfo.CurrentPassword, this.userInfo.confirmNewPassword);
      // this.$refs.notification.showNotification(); // Show success notification

      // Display a success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your password has been changed successfully.',
      });
    } catch (error) {
      console.log(error.message);
      this.errors.push("Current password mismatched");

      // If there are errors, display them using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There are some errors in your submission:',
        html: this.errors.join('<br>'),
      });
    }
  }
}
}
}
</script>

<style>

</style>
