<template>
<!-- This code has some errors, the images are not showing -->
  <div>
    <div class="mx-auto text-center my-5 rounded-4 col-6 py-2" style="background-color: #FFB18D;">
      <h1 class="fw-bold fs-5">WHAT IS YOUR DAILY ACTIVITY LEVEL?</h1>
      <h3 class="fw-semibold fs-6">(Select one only)</h3>
    </div>
    <div class="container mx-auto border rounded-4 justify-content-center py-2 px-5 d-flex shadow bg-white col-8">
      <div class="row">
        <div class="col-lg-4 col-sm-6" v-for="(level, index) in activityLevels" :key="index">
          <label>
            <input
              type="radio"
              name="product"
              class="card-input-element"
              :id="level.id"
              :value="level.value"
              v-model="activityLevel"
            />

            <div class="card card-default card-input">
              <div class="card-header text-center">
                <span class="fw-bold">{{ level.label }}</span> <br />
                <p>{{ level.description }}</p>
              </div>
              <div class="card-body text-center">
                <img :src="level.imgSrc" />
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
        style="background-color: #FFB18D;"
        type="submit"
        @click="goPrevious"
      >
        Previous
      </button>
      <button
        id="next"
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color: #FFB18D;"
        type="submit"
        @click="goNext"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import heavy from '../img/heavy.png';
import light from "../img/light.png";
import sendentary from "../img/sedentary.png";
import moderate from "../img/moderate.png";
import veryHeavy from "../img/very-heavy.png";
import intense from "../img/extreme.png";

export default {
  data() {
    return {
      activityLevel: null,
      activityLevels: [
        {
          id: "2",
          label: "Sedentary:",
          description: "Little to no exercise",
          value: "Sedentary: little or no exercise",
          imgSrc: sendentary,
        },
        {
          id: "3",
          label: "Light",
          description: "Regular Exercise 1-3 times/week",
          value: "Exercise 1-3 times/week",
          imgSrc: light,
        },
        {
          id: "4",
          label: "Moderate",
          description: "Regular Exercise 4-5 times/week",
          value: "Exercise 4-5 times/week",
          imgSrc: moderate,
        },
        {
          id: "5",
          label: "Heavy",
          description: "Intense Exercise 3-4 times/week",
          value: "Daily exercise or intense exercise 3-4 times/week",
          imgSrc: heavy,
        },
        {
          id: "6",
          label: "Very Heavy",
          description: "Intense Exercise 5-6 times/week",
          value: "Intense exercise 6-7 times/week",
          imgSrc: veryHeavy,
        },
        {
          id: "7",
          label: "Extreme",
          description: "Intense Daily Exercise",
          value: "Very intense exercise daily, or physical job",
          imgSrc: intense,
        },
      ],
    };
  },
  methods: {
    goPrevious() {
      this.$emit("buttonAction", "previous");
    },

    goNext() {
      console.log("values : ", this.activityLevel);
      this.$emit("buttonAction", "next");
      this.$emit('addActivityLevel', this.activityLevel);
    },
  },
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
  box-shadow: 0 0 2px 2px #007459;
}

</style>
