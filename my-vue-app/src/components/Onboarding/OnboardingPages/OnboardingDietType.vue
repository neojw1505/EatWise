<template>
  <div>
    <NavbarLandingPage></NavbarLandingPage>
    <div
      class="mx-auto text-center my-5 py-1 shadow rounded-4 bg-warning col-7"
    >
      <h1 class="fw-bold fs-5">WHAT'S YOUR DIET TYPE</h1>
    </div>
    <div
      class="container mx-auto border rounded-4 text-start justify-content-end py-2 pe-5 d-flex shadow bg-white col-8"
    >
      <div class="row">
        <div class="col-6 p-4 text-center">
          <input name="option" type="radio" id="vegetarian" class="hide" value="vegetarian" v-model="dietType"/>
          <label for="vegetarian" class="">Vegetarian <h6 class="text-muted fw-normal">No meat or fish</h6></label>
        </div>
        <div class="col-6 p-4 text-center">
          <input
            name="option"
            type="radio"
            id="standard"
            value="standard"
            v-model="dietType"
          />
          <label for="standard">Standard <br/> <h6 class="text-muted fw-normal">I'm Easy</h6> </label>
        </div>
        <div class="col-6 p-4 text-center">
          <input name="option" type="radio" id="vegan" class="hide" value="vegan" v-model="dietType"/>
          <label for="vegan">Vegan <h6 class="text-muted fw-normal">No Animal Products</h6></label>
        </div>
        <div class="col-6 p-4 text-center">
          <input name="option" type="radio" id="pescetarian" class="hide" value="pescetarian" v-model="dietType"/>
          <label for="pescetarian">Pescetarian <h6 class="text-muted fw-normal">Vegetarian + Seafood</h6></label>
        </div>
        <div class="col-6 p-4 text-center">
          <input name="option" type="radio" id="dairy-free" class="hide" value="dairy-free" v-model="dietType"/>
          <label for="dairy-free" class="">Dairy-Free <h6 class="text-muted fw-normal">No Dairy Products</h6></label>
        </div>
        <div class="col-6 p-4 text-center">
          <input name="option" type="radio" id="paleolithic" class="hide" value="paleolithic" v-model="dietType"/>
          <label for="paleolithic">Paleolithic <h6 class="text-muted fw-normal">Meat, Fish, Nuts, Veggies</h6></label>
        </div>
        <div class="col-6 p-4 text-center">
          <input name="option" type="radio" id="primal" class="hide" value="primal" v-model="dietType"/>
          <label for="primal">Primal <h6 class="text-muted fw-normal">Meat Only</h6></label>
        </div>
        <div class="col-6 p-4 text-center">
          <input name="option" type="radio" id="gluten-free" class="hide" value="gluten-free" v-model="dietType"/>
          <label for="gluten-free">Gluten-Free <h6 class="text-muted fw-normal">No products with gluten</h6></label>
        </div>
        <div class="col-6 p-4 text-center">
          <input name="option" type="radio" id="others" class="hide" value="others" v-model="otherOption"/>
          <label for="others">Others <h6 class="text-muted fw-normal">Pick Ingredients to Exclude</h6></label>
        </div>
        <div class="col-6 p-4 text-center">
          <input name="option" type="radio" id="whole 30" class="hide" value="whole 30" v-model="dietType"/>
          <label for="whole 30">Whole 30 <h6 class="text-muted fw-normal">No Alcohol, Sugar, Grains, <br/>Legumes, dairy</h6></label>
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
      dietType: null,
      otherOption: null,
    };
  },
  methods: {
    goPrevious() {},

    goNext() {
      if(this.otherOption == "others"){
        console.log("values : ", this.otherOption)
        // routing to Other page
      }
    
      else if (this.dietType == null && this.otherOption == null) {
        alert("You must select an option!");
      } 
      else {
        console.log("values : ", this.dietType);
        // routing to final page
      }

    },
  }, // methods
};
</script>

<style scoped>
label {
  margin-right: 5vw;
  margin-left: 5vw;
  cursor: pointer;
}

.container {
  direction: rtl;
  text-align: right !important;
  font-size: larger;
  font-weight: bold;
  /* min-width: ; */
}

input[type=radio] {
    border: 0px;
    width: auto;
    height: 2em;
    
}

</style>
