<template>
  <div>
<<<<<<< Updated upstream
    <NavbarLandingPage></NavbarLandingPage>
    <div class="mx-auto text-center my-5 shadow rounded-4 bg-warning col-6 py-2">
=======
    <div>      
      <NavbarLandingPage></NavbarLandingPage>
  </div>
    
    <div class="mx-auto text-center my-5 rounded-4 bg-warning col-6 py-2">
>>>>>>> Stashed changes
      <h1 class="fw-bold fs-5">WHAT IS YOUR DAILY ACTIVITY LEVEL?</h1>
      <h3 class="fw-semibold fs-6">(Select one only)</h3>
    </div>
    <div
      class="container mx-auto border rounded-4 justify-content-center py-2 px-5 d-flex shadow bg-white col-8"
    >
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <label>
            <input
              type="radio"
              name="product"
              selected
              checked
              class="card-input-element"
              id="2"
              value="Sedentary: little or no exercise"
              v-model="activityLevel"
            />

            <div class="card card-default card-input">
              <div class="card-header text-center">
                <span class="fw-bold">Sedentary:</span> <br />
                <p>Little to no exercise</p>
              </div>
              <div class="card-body text-center">
                <img src="../img/sedentary.png" />
              </div>
            </div>
          </label>
        </div>
        <div class="col-lg-4 col-sm-6">
          <label>
            <input
              type="radio"
              name="product"
              class="card-input-element"
              id="3"
              value="Exercise 1-3 times/week"
              v-model="activityLevel"
            />

            <div class="card card-default card-input">
              <div class="card-header text-center">
                <span class="fw-bold">Light</span><br />
                <p>Regular Exercise 1-3 times/week </p>
              </div>
              <div class="card-body text-center">
                <img src="../img/light.png" />
              </div>
            </div>
          </label>
        </div>
        <div class="col-lg-4 col-sm-6">
          <label>
            <input
              type="radio"
              name="product"
              class="card-input-element"
              id="4"
              value="Exercise 4-5 times/week"
              v-model="activityLevel"
            />

            <div class="card card-default card-input">
              <div class="card-header text-center">
                <span class="fw-bold">Moderate</span><br />
                <p>Regular Exercise 4-5
                times/week</p>
              </div>
              <div class="card-body text-center">
                <img src="../img/moderate.png" />
              </div>
            </div>
          </label>
        </div>
        <div class="col-lg-4 col-sm-6">
          <label>
            <input
              type="radio"
              name="product"
              selected
              checked
              class="card-input-element"
              id="5"
              value="Daily exercise or intense exercise 3-4 times/week"
              v-model="activityLevel"
            />

            <div class="card card-default card-input">
              <div class="card-header text-center">
                <span class="fw-bold">Heavy</span><br />
                <p>Intense Exercise 3-4 times/week</p>
              </div>
              <div class="card-body text-center">
                <img src="../img/heavy.png" />
              </div>
            </div>
          </label>
        </div>
        <div class="col-lg-4 col-sm-6">
          <label>
            <input
              type="radio"
              name="product"
              class="card-input-element"
              id="6"
              value="Intense exercise 6-7 times/week"
              v-model="activityLevel"
            />

            <div class="card card-default card-input">
              <div class="card-header text-center">
                <span class="fw-bold">Very Heavy</span><br />
                <p>Intense Exercise
                5-6 times/week</p>
              </div>
              <div class="card-body text-center">
                <img src="../img/very-heavy.png" />
              </div>
            </div>
          </label>
        </div>
        <div class="col-lg-4 col-sm-6">
          <label>
            <input
              type="radio"
              name="product"
              class="card-input-element"
              id="7"
              value="Very intense exercise daily, or physical job"
              v-model="activityLevel"
            />

            <div class="card card-default card-input">
              <div class="card-header text-center">
                <span class="fw-bold">Extreme</span><br />
                <p>Intense Daily
                Exercise</p>
              </div>
              <div class="card-body text-center">
                <img src="../img/extreme.png" />
              </div>
            </div>
          </label>
        </div>
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
      activityLevel: null,
    };
  },
  methods: {
    goPrevious() {},

    goNext() {
      console.log("values : ", this.activityLevel);
    },
  }, // methods
};
</script>

<style scoped>


.container {
  margin: 0 auto;
  max-width:1000px;
  min-width: 600px;
  width:80%;
}
p{
  max-width:inherit;
  overflow-wrap: break-word;
}
/**
  Component
**/

label {
  width: 100%;
}

.card-header {
  text-align: center;
  height:100px;
}

.card-body {
  object-fit: cover;
  width:inherit;

}

.card-input-element {
  display: none;
}

.card-input {
  margin: 10px;
  padding: 0px;
  width:100%;
}
.card-input:hover {
  cursor: pointer;
}

.card-input-element:checked + .card-input {
  box-shadow: 0 0 1px 1px #2ecc71;
}

</style>
