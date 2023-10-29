<template>
  <div class="col-lg-4 col-md-12 mx-2 rounded-4 px-0 border border-2 border-dark mb-2 " style="background-color: #FBE8A6;">
    <!-- username -->
    <div class="mx-0 rounded-4 p-2 py-1 border border-2 border-dark" style="background-color: #FFE1E1;"><h3>{{userName}}</h3></div>
    <div class="d-flex">
<!-- setting button -->
    <router-link  class="text-decoration-none text-dark" to="/profile/setting">
        <div class="m-2 border border-2 border-dark rounded-4 bg-light p-2" style="width: 100px;">
            <font-awesome-icon :icon="['fas', 'gear']" />
            <span class="fw-semibold">Settings</span>
        </div>
    </router-link>
    <!-- logout button -->
    <div class="m-2 border border-2 border-dark rounded-4 bg-light p-2" style="width: 100px;" @click="logout">
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        <span class="fw-semibold">Logout</span>
    </div>
    </div>
    


    <div class="m-2 border border-dark border-2 rounded-4 "  style="background-color: #303C6C;">
        <div class=" d-flex align-items-center justify-content-center  rounded-4"  style="background-color: #FFB18D;">
            <font-awesome-icon :icon="['fas', 'fire']" size="xl" />
            <span class="mx-3 fs-3 fw-semibold">Calorie Tracker</span>
        </div>
        <div class="text-center text-white p-2">
            Daily Calories:<div class="fw-semibold">{{ dailyCalories }} / {{ maxCalories }}</div> 
        </div>
    </div>

  </div>
</template>

<script>
export default {
    props:["userName"],
    data(){return{
        dailyCalories:1400,
        maxCalories:2600
    }},
    methods:{
        async logout(){
            await this.$smAPI.logout();
            this.$router.push({path:'/login'}).then(() => { this.$router.go() })
        }
    }

}
</script>

<style>

</style>