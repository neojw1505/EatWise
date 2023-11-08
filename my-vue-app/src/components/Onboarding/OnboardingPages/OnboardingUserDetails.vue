<template>
  <div>
    <div class="container ">
      <div class="mx-auto text-center py-1 shadow rounded-4 col-6" style="background-color:#7A8CEA ;">
        <h1 class="fw-bold fs-4">TELL US MORE ABOUT YOURSELF</h1>
      </div>
      <div class="border rounded-4 p-3 shadow bg-white mt-3">
        <h3 class="fw-bold fs-4 py-3">Basic Information</h3>
        <div class="row d-flex align-items-end">
          <div class="col col-sm-4 mb-3">
            <label for="customRange3" class="form-label">Age</label>
            <input type="range" name="age" class="form-range" min="0" max="80" step="1" v-model="inputAge" @input="updateAge" required>
            <span class="fs-5">{{ inputAge }}</span>
          </div>
          <div class="col col-sm-4 mb-3">
            <label for="customRange3" class="form-label">Weight (kg)</label>
            <input type="range" name="weight" class="form-range" min="40" max="160" step="1" v-model="inputWeight" required>
            <span class="fs-5">{{ inputWeight }}</span>
          </div>
          <div class="col col-sm-4 mb-3">
            <label for="customRange3" class="form-label">Height (cm)</label>
            <input type="range" name="height" class="form-range" min="130" max="230" step="1" v-model="inputHeight" required>
            <span class="fs-5">{{ inputHeight }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto text-center py-1 shadow rounded-4 col-5 mt-4" style="background-color:#7A8CEA ;">
      <h1 class="fw-bold fs-4">WHAT IS YOUR GOAL?</h1>
      <h3 class="fw-semibold fs-6">(Select one only)</h3>
    </div>
    <div class="border rounded-4 p-4 mx-auto shadow bg-white text-center col-10">
      <div class="row">
        <div class="col m-0 p-0" v-for="(goal, index) in goals" :key="goal.value">
          <label>
            <input
              type="radio"
              class="card-input-element"
              :id="goal.value"
              :value="goal.value"
              name="weightChoice"
              v-model="inputGoal"
            />
            <div class="card card-input my-2 mx-0">
              <div style="height: 70px; width: 120px;" class="card-header text-center d-flex align-items-center justify-content-center">
                <span :style="'color: ' + goal.color + '; font-weight: ' + fontWeight(index)">
                  {{ goal.label }}
                </span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="mx-auto text-center">
      <button
        id="previous"
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color: #7A8CEA;"
        type="submit"
        v-on:click="goPrevious"
      >
        Previous
      </button>
      <button
        id="next"
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color: #7A8CEA;"
        type="submit"
        v-on:click="goNext"
      >
        Next
      </button>
    </div>
  </div>
</template>



<script>
import Swal from 'sweetalert2'; // Import SweetAlert2

export default {
  data() {
    return {
      inputAge: 0,
      inputWeight: 40,
      inputHeight: 130,
      inputGoal: null,
      goals: [
        { value: 'extremelose', label: 'Extreme Weight Loss', color: 'red' },
        { value: 'weightlose', label: 'Weight Loss', color: 'orange' },
        { value: 'mildlose', label: 'Mild Weight Loss', color: 'lightsalmon' },
        { value: 'maintain', label: 'Maintain Weight', color: 'green' },
        { value: 'mildgain', label: 'Mild Weight Gain', color: 'lightsalmon' },
        { value: 'weightgain', label: 'Weight Gain', color: 'orange' },
        { value: 'extremegain', label: 'Extreme Weight Gain', color: 'red' },
      ],
    };
  },
  computed: {
    fontWeight() {
      const baseWeight = 400; // Default font weight for "Maintain Weight"
      const weightStep = 100; // Adjust this value to control font weight intensity
      const maintainIndex = this.goals.findIndex((goal) => goal.value === 'maintain');
      
      return (index) => {
        const distanceFromMaintain = Math.abs(index - maintainIndex);
        return baseWeight + distanceFromMaintain * weightStep;
      };
    },
  },
  methods: {
    goPrevious() {
      this.$emit('buttonAction', 'previous');
    },
    goNext() {
      const errors = [];
      if (this.inputAge == '' || this.inputWeight == '' || this.inputHeight == '' || this.inputGoal == null) {
        errors.push('Please fill in all fields!')
      }
      if (isNaN(this.inputAge)) {
        errors.push('Age must be numeric!');
        this.inputAge = '';
      }
      if (isNaN(this.inputWeight)) {
        errors.push('Weight must be numeric!');
        this.inputWeight = '';
      }
      if (isNaN(this.inputHeight)) {
        errors.push('Height must be numeric!');
        this.inputHeight = '';
      }
      
      if (errors.length > 0) {
        const errorMessage = errors.join('\n');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
      else {
        console.log('values : ', this.inputAge, this.inputWeight, this.inputHeight, this.inputGoal);
        this.$emit('buttonAction', 'next');
        this.$emit('addAge', this.inputAge);
        this.$emit('addHeight', this.inputHeight);
        this.$emit('addWeight', this.inputWeight);
        this.$emit('addGoal', this.inputGoal);
      }
    },
  },
  created(){
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>

<style scoped>

.card-input-element {
  display: none;
}
.card-input:hover {
  cursor: pointer;
}

.card-input-element:checked + .card-input {
  box-shadow: 0 0 2px 2px #007459;
}
</style>
