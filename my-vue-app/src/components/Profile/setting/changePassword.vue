<template>
  <div>
        <!--current Password -->
    <div class="my-3">
      <label for="ProfileCurrentPassword" class="form-label fw-bold">Password</label>
      <input type="text" id="ProfileCurrentPassword" class="form-control" v-model="userInfo.CurrentPassword">
    </div>
        <!--New Password -->
    <div class="my-3">
      <label for="ProfileSettingPassword" class="form-label fw-bold">Password</label>
      <input type="password" id="ProfileSettingPassword" class="form-control" v-model="userInfo.password">
    </div>
    <!-- Confirm Password -->
    <div class="my-3">
      <label for="ProfileSettingConfirmPassword" class="form-label fw-bold">Confirm Password</label>
      <input type="password" id="ProfileSettingConfirmPassword" class="form-control" v-model="userInfo.confirmPassword">
    </div>
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
      "password":"",
      "confirmPassword":"",
    },
    error:[]
  }},
  methods:{
    saveSetting(){
      if(this.userInfo.password!=this.userInfo.confirmPassword){
        this.error.push("New password and Confirm new password mismatched");
        return
      }
      
      // let success=this.$smAPI.updateUserPassword(this.userInfo.confirmPassword)
      // if(!success){
      //   this.error.push("Current Password Invalid");
      //   return
      // }
      this.$refs.notification.showNotification();
      this.error=[];
    },
  }
}
</script>

<style>

</style>