<template>
  <div>
    <div class="col-8 mx-auto mt-5">
      <div class="card-body text-center py-4">
        <div class="card-title">
          <h2>Congratulations!</h2>
        </div>
        <div class="card-text">
          <p>Your custom plan is ready, and you're one step closer to healthy eating.</p>
          <h3>Your net kilojoule goal is:</h3>
        </div>
        <div class="text-group">
          <div class="d-flex justify-content-between align-items-center">
            <h1 class="col-6">{{ value }}</h1>
            <button class="btn btn-primary col-6" @click="convertToCalories()">
              {{ default_state ? 'Kilojoules' : 'Calories' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto text-center">
      <button
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color:#FFB18D ;"
        type="submit"
        @click="goPrevious"
      >
        Previous
      </button>
      <button
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color:#FFB18D ;"
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
  data() {
    return {
      value: 19999,
      default_state: true
    };
  },
  methods: {
    convertToCalories() {
      if (this.default_state) {
        this.value = this.value * 239;
        this.default_state = false;
      } else {
        this.value = this.value / 239;
        this.default_state = true;
      }
    },
    goNext() {
      this.$emit('buttonAction', 'next');
    },
    goPrevious() {
      this.$emit('buttonAction', 'previous');
    }
  }
};
</script>

<style scoped>
.card {
  width: 80%;
  margin: 0 auto;
}

.card-body {
  background-color: #F9F7F7;
  border-radius: 40px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  padding: 5% 5% 0 5%;
}

.btn-primary {
  background-color: #f38e5f;
  color: white;
  border-radius: 20px;
  padding: 20px;
  max-width: 50%;
  border: none;
}

.btn-primary:hover {
  background-color: #ee6221;
  transition: 0.7s;
  color: white;
}
</style>
