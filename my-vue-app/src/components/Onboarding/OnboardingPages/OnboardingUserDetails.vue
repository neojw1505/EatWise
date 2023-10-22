<template>
  <div>
    <NavbarLandingPage></NavbarLandingPage>
    <div class="mx-auto text-center my-5 rounded-4 bg-warning col-6 py-2">
      <h1 class="fw-bold fs-5">TELL US MORE ABOUT YOURSELF</h1>
    </div>
    <div
      class="mx-auto border rounded-4 py-2 text-center justify-content-center d-block shadow bg-white col-8"
      id="basicInfoBox"
    >
      <h3 class="fs-5 fw-semibold py-3">Basic Information</h3>
      <div class="inputContainer justify-content-center">
        <input
          type="text"
          class="mx-4 mb-3 col-2 col-sm-2"
          name="age"
          placeholder="Age"
          v-model="inputAge"
        />

        <input
          type="text"
          class="mx-4 mb-3 col-lg-2 col-sm-2"
          name="weight"
          placeholder="Your Weight (kg)"
          v-model="inputWeight"
        />

        <input
          type="text"
          class="mx-4 mb-3 col-lg-2 col-sm-2"
          name="height"
          placeholder="Your Height (cm)"
          v-model="inputHeight"
        />
      </div>
    </div>
    <div class="mx-auto text-center my-5 rounded-4 bg-warning col-6 py-2">
      <h1 class="fw-bold fs-5">WHAT IS YOUR GOAL?</h1>
      <h3 class="fw-semibold fs-6">(Select one only)</h3>
    </div>
    <div
      class="mx-auto border rounded-4 mt-5 py-2 px-5 text-center justify-content-center d-block shadow bg-white col-8"
      id="weightGoalBox"
    >
      <div class="col-12">
        <input
          type="radio"
          class="mx-1"
          id="extremelose"
          value="extremelose"
          name="weightChoice"
          v-model="inputGoal"
        />
        <label for="extremelose" class="pe-2" style="color: red;">Extreme Weight Loss</label>
        <input
          type="radio"
          class="mx-1"
          id="weightlose"
          value="weightlose"
          name="weightChoice"
          v-model="inputGoal"
        />
        <label for="weightlose" class="pe-2" style="color: orange;">Weight Loss </label>
        <input
          type="radio"
          class="mx-1"
          id="mildlose"
          value="mildlose"
          name="weightChoice"
          v-model="inputGoal"
        />
        <label for="mildlose" class="pe-2" style="color: lightsalmon;">Mild Weight Loss</label>
        <br />
        <input
          type="radio"
          class="mx-1"
          id="maintain"
          value="maintain"
          name="weightChoice"
          v-model="inputGoal"
        />
        <label for="maintain" class="pe-2" style="color: green;">Mantain Weight</label>
        <input
          type="radio"
          class="mx-1"
          id="mildgain"
          value="mildgain"
          name="weightChoice"
          v-model="inputGoal"
        />
        <label for="mildgain" class="pe-2" style="color: lightsalmon;">Mild Weight Gain</label>
        <input
          type="radio"
          class="mx-1"
          id="weightgain"
          value="weightgain"
          name="weightChoice"
          v-model="inputGoal"
        />
        <label for="weightgain" class="pe-2" style="color: orange;">Weight Gain</label>
        <input
          type="radio"
          class="mx-1"
          id="extremegain"
          value="extremegain"
          name="weightChoice"
          v-model="inputGoal"
        />
        <label for="extremegain" class="pe-2" style="color: red;">Extreme Weight Gain</label>
      </div>
    </div>
    <div class="mx-auto text-center">
      <button
        id="previous"
        class="btn my-5 mx-2 px-5 bg-warning fw-semibold"
        type="submit"
        v-on:click="goPrevious()"
      >
        Previous
      </button>
      <button
        id="next"
        class="btn my-5 mx-2 px-5 bg-warning fw-semibold"
        type="submit"
        v-on:click="goNext()"
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
    };
  },
  methods: {
    goPrevious() {},

    goNext() {
      console.log(
        "values : ",
        this.inputAge,
        this.inputWeight,
        this.inputHeight,
        this.inputGoal
      );
    },
  }, // methods
};
</script>
