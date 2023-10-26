<template>
  <div>
    <div class="container my-5">
      <div class="rounded-4 p-3 text-center" style="background-color: #FFB18D;">
    <h1 class="fw-bold fs-4">TELL US MORE ABOUT YOURSELF</h1>
  </div>
  <div class="border rounded-4 p-3 shadow bg-white mt-3">
    <h3 class="fw-bold fs-4 py-3">Basic Information</h3>
    <div class="row">
      <div class="col-12 col-sm-4 mb-3">
        <input type="text" class="form-control" name="age" placeholder="Age" v-model="inputAge" required>
      </div>
      <div class="col-12 col-sm-4 mb-3">
        <input type="text" class="form-control" name="weight" placeholder="Your Weight (kg)" v-model="inputWeight" required>
      </div>
      <div class="col-12 col-sm-4 mb-3">
        <input type="text" class="form-control" name="height" placeholder="Your Height (cm)" v-model="inputHeight" required>
      </div>
    </div>
</div>
    </div>
    <div class="mx-auto text-center my-5 rounded-4 col-6 py-2" style="background-color: #FFB18D;">
      <h1 class="fw-bold fs-5">WHAT IS YOUR GOAL?</h1>
      <h3 class="fw-semibold fs-6">(Select one only)</h3>
    </div>
    <div class="border rounded-4 p-4 mx-auto shadow bg-white text-center" style="width: 300px;">
      <div class="mx-auto" v-for="(goal, index) in goals" :key="goal.value">
        <input
          type="radio"
          class="mx-2"
          :id="goal.value"
          :value="goal.value"
          name="weightChoice"
          v-model="inputGoal"
        />
        <label :for="goal.value" class="pe-2" :style="'color: ' + goal.color + '; font-weight: ' + fontWeight(index)">
          {{ goal.label }}
        </label>
      </div>
    </div>
    <div class="mx-auto text-center">
      <button
        id="previous"
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color: #FFB18D;"
        type="submit"
        v-on:click="goPrevious"
      >
        Previous
      </button>
      <button
        id="next"
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color: #FFB18D;"
        type="submit"
        v-on:click="goNext"
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
      inputAge: null,
      inputWeight: null,
      inputHeight: null,
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
      if (this.inputAge == null || this.inputWeight == null || this.inputHeight == null || this.inputGoal == null) {
        alert('You must fill out all fields!');
      } else {
        console.log('values : ', this.inputAge, this.inputWeight, this.inputHeight, this.inputGoal);
        this.$emit('buttonAction', 'next');
        this.$emit('addAge', this.inputAge);
        this.$emit('addHeight', this.inpuHeight);
        this.$emit('addWeight', this.inputWeight);
        this.$emit('addGoal', this.inputGoal);
      }
    },
  },
};
</script>
