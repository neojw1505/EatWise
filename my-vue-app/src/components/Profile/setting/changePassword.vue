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
    <!-- error prompt -->
    <div v-if="error.length>0" class="mt-3 p-2 border border-2 rounded-4 border-danger-subtle">
      Errors:
      <ul>
        <li v-for="e in error" :key="e">{{ e }}</li>
      </ul>
    </div>
    <!-- save button -->
    <div class="my-3 justify-content-end d-flex">
      <button class="btn fw-bold" style="background-color: #F4976C;" @click="saveSetting">Save</button>
    </div>
    
    <savedNotification ref="notification"/>
  </div>
</template>

<script>
export default {
  data(){return{
    userInfo:{
      "CurrentPassword":"",
      "NewPassword":"",
      "confirmNewPassword":"",
    },
    error:[]
  }},
  methods:{
    async saveSetting(){
      this.error=[];
      if(this.userInfo.NewPassword!=this.userInfo.confirmNewPassword){
        this.error.push("New password and Confirm new password mismatched");
        return
      }
      if(this.userInfo.NewPassword.length<6){
        this.error.push("New password must be at least 6 character");
        return
      }
      try {
        await this.$smAPI.updateUserPassword(this.userInfo.CurrentPassword, this.userInfo.confirmNewPassword)
      } catch (error) {
        console.log(error.message)
        this.error.push("Current password mismatched")
        return
      }
      this.$refs.notification.showNotification();
      this.error=[];
    },
  }
}
</script>

<style>

</style>
