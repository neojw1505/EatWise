<template>
  <div>
    <div class="col-8 mx-auto mt-5">
      <div class="card-body text-center py-4">
        <div class="card-title">
          <h2>Congratulations!</h2>
        </div>
        <div class="card-text">
          <p>
            Your custom plan is ready, and you're one step closer to healthy
            eating.
          </p>
          <h3>Your net {{ default_state ? "Calories" : "Kilojoules" }} goal is:</h3>
        </div>
        <div class="text-group">
          <div class="d-flex justify-content-between align-items-center">
            <h1 class="col-6">{{ value }} {{ default_state ? "(kcal)" : "(kJ)" }}</h1>
            <button class="btn btn-primary col-6" @click="toggleConversion()">
              {{ default_state ? "Calories" : "Kilojoules" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto text-center">
      <button
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color: #7A8CEA"
        type="submit"
        @click="goPrevious"
      >
        Previous
      </button>
      <button
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color: #7A8CEA"
        type="submit"
        @click="goNext"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["registerUser"],
  data() {
    return {
      calorie: '',
      value: "Calculating...",
      default_state: true,
    };
  },
  methods: {
    toggleConversion() {
      if (this.default_state) {
        this.value = (this.value * 4.18).toFixed(2);
      } else {
        this.value = (this.value / 4.18).toFixed(2);
      }
      this.default_state = !this.default_state;
    },
    formatValue() {
      return this.default_state ? this.value : this.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    goNext() {
      this.$emit("buttonAction", "next");
      this.$emit("passDailyCalorie", this.calorie);
    },
    goPrevious() {
      this.$emit("buttonAction", "previous");
    },
    async getDailyCaloriesMacros() {
      let temp= await this.$fitCalcAPI.getDailyCaloriesMacros(
        this.registerUser.age,
        this.registerUser.gender,
        this.registerUser.height,
        this.registerUser.weight,
        this.registerUser.activityLevel,
        this.registerUser.goal
      );
      this.calorie=Math.floor(temp.calorie);
      this.value=Math.floor(temp.calorie);
    },
  },
  created() {
    this.getDailyCaloriesMacros()
  },
};
</script>

<style scoped>
.card {
  width: 80%;
  margin: 0 auto;
}

.card-body {
  background-color: #f9f7f7;
  border-radius: 40px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  padding: 5% 5% 0 5%;
}

.btn-primary {
  background-color: #7A8CEA;
  color: white;
  border-radius: 20px;
  padding: 20px;
  max-width: 50%;
  border: none;
}

.btn-primary:hover {
  background-color: #7A8CEA;
  transition: 0.7s;
  color: white;
}
</style>
