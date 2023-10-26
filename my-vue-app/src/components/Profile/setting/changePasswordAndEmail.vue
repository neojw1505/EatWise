<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data(){return{
    userInfo:{
      "email":"",
      "password":"",
      "confirmPassword":"",
    },
  }},
  methods:{
    
  }
}
</script>

<style>

</style>