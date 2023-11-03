<template>
<div class="col-lg-4 col-md-12 mx-2 rounded-4 px-0 border border-2 border-dark mb-2" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.71) 100%, rgba(0, 0, 0, 0.21) 99.99%, rgba(0, 0, 0, 0.17) 100%);">
    <!-- username -->
    <div class="mx-0 rounded-4 p-2 py-1 border border-2 border-dark" style="background-color:transparent;"><h3 style="color:white" >{{userName}}</h3></div>
        <!-- Daily Calorie Counter -->
        <div class="m-2 rounded-4 "  style="background-color: transparent;">
        <div class=" d-flex align-items-center justify-content-center rounded-4"  style="background-color: transparent;">
            <font-awesome-icon :icon="['fas', 'fire']" size="xl" style="color: orangered;"/>
            <span class="mx-3 fs-3 fw-semibold" style="color:white">Your <span style="color:#7A8CEA">Calories</span> today:</span>
        </div>
        <div class="text-center text-white p-1 rounded-4 border border-2 bg-white mt-3">
            <div class="fw-semibold fs-1"><span style="color:black">{{ dailyCalories }} /</span> <span style="color:#7A8CEA">{{ maxCalories }}</span></div> 
        </div>
    </div>
    <div class="d-flex">
      <!-- setting button -->
      <router-link
        class="text-decoration-none text-dark"
        to="/profile/setting"
        style="cursor: pointer"
      >
        <div
          class="m-2 border border-2 border-dark rounded-4 bg-light p-2"
          style="width: 100px"
        >
          <font-awesome-icon :icon="['fas', 'gear']" />
          <span class="fw-semibold">Settings</span>
        </div>
      </router-link>
      <!-- logout button -->
      <div
        class="m-2 border border-2 border-dark rounded-4 bg-light p-2"
        style="width: 100px; cursor: pointer"
        @click="logout"
      >
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        <span class="fw-semibold">Logout</span>
      </div>
    </div>

    <div
      class="m-2 border border-dark border-2 rounded-4"
      style="background-color: #303c6c"
    >
      <div
        class="d-flex align-items-center justify-content-center rounded-4"
        style="background-color: #ffb18d"
      >
        <font-awesome-icon :icon="['fas', 'fire']" size="xl" />
        <span class="mx-3 fs-3 fw-semibold">Calorie Tracker</span>
      </div>
      <div class="text-center text-white p-2">
        Daily Calories:
        <div class="fw-semibold">{{ dailyCalories.toFixed(0) }} / {{ maxCalories.toFixed(0) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userName"],
  data() {
    return {
      dailyCalories: 0,
      maxCalories: 0,
    };
  },
  methods: {
    async logout() {
      await this.$smAPI.logout();
      this.$store.dispatch("setShowLoginNotification", false);
      this.$router.push({ path: "/login" }).then(() => {
        this.$router.go();
      });
    },
    async getMaxCalories() {
      let user = await this.$smAPI.getLoginUserProfile();
      this.maxCalories = user.DailyCalories;
    },
    async GetCalConsumed(dateToPassinFB) {
      let mealplan = await this.$smAPI.GetConsumptionHistoryForDate(
        dateToPassinFB
      );
      console.log(mealplan);
      //  reset values
      let totalCalories = 0;
      for (const key in mealplan) {
        // totalCalories += this.mealplan.key.recipe.calories
        let totalCal =
          mealplan[key]["recipe"]["nutrition"]["calories"] ??
          mealplan[key]["recipe"]["nutrition"]["nutrients"][0].amount;
        // console.log(mealplan[key]['recipe']['nutrition'])
        totalCalories += Number(totalCal);
      }
      this.dailyCalories=totalCalories
    },
  },
  created() {
    this.getMaxCalories();
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let dateToPassinFB = year + "-" + month + "-" + date;
    // console.log(dateToPassinFB);
    this.GetCalConsumed(dateToPassinFB.toString());
  },
};
</script>

<style></style>
