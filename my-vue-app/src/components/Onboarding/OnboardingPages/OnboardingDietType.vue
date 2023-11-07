<template>
  <div>
    <div class="mx-auto text-center my-5 py-1 shadow rounded-4 col-3" style="background-color:#7A8CEA ;">
      <h1 class="fw-bold fs-5">WHAT'S YOUR DIET TYPE</h1>
    </div>
    <div class="container mx-auto border rounded-4 d-flex shadow bg-white col-6">
      <div class="row">
        <div class="d-flex py-2 text-center col-md-6 col-sm-12 " v-for="(diet, index) in dietTypes" :key="index">
          <input name="option" type="radio" :id="diet.id" :value="diet.value" v-model="dietType" style="display: none;" />
          <label :for="diet.id" class="card border" :class="{ 'selected': dietType === diet.value }" style="width: 100%;">
            {{ diet.label }}
            <h6 class="text-muted fw-normal">{{ diet.description }}</h6>
          </label>
        </div>
      </div>
    </div>
    <div class="mx-auto text-center">
      <button id="previous" class="btn my-5 mx-2 px-5 fw-semibold" type="submit" @click="goPrevious" style="background-color:#7A8CEA ;">Previous</button>
      <button id="next" class="btn my-5 mx-2 px-5 fw-semibold" type="submit" @click="goNext" style="background-color:#7A8CEA ;">Next</button>
    </div>
  </div>
</template>


<script>
import Swal from 'sweetalert2'; // Import SweetAlert2
export default {
  data() {
    return {
      dietType: null,
      dietTypes: [
        {
          id: "vegetarian",
          label: "Vegetarian",
          value: "vegetarian",
          description: "No meat or fish",
        },
        {
          id: "standard",
          label: "Standard",
          value: "standard",
          description: "I'm Easy",
        },
        {
          id: "vegan",
          label: "Vegan",
          value: "vegan",
          description: "No Animal Products",
        },
        {
          id: "pescetarian",
          label: "Pescetarian",
          value: "pescetarian",
          description: "Vegetarian + Seafood",
        },
        {
          id: "dairy-free",
          label: "Dairy-Free",
          value: "dairy-free",
          description: "No Dairy Products",
        },
        {
          id: "paleolithic",
          label: "Paleolithic",
          value: "paleolithic",
          description: "Meat, Fish, Nuts, Veggies",
        },
        {
          id: "primal",
          label: "Primal",
          value: "primal",
          description: "Meat Only",
        },
        {
          id: "gluten-free",
          label: "Gluten-Free",
          value: "gluten-free",
          description: "No products with gluten",
        },
        {
          id: "others",
          label: "Others",
          value: "others",
          description: "Pick Ingredients to Exclude",
        },
        {
          id: "whole30",
          label: "Whole 30",
          value: "whole30",
          description: "No Alcohol, Sugar, Grains, Legumes, dairy",
        },
      ],
      otherOption: null,
    };
  },
  methods: {
    goPrevious() {
      this.$emit('buttonAction', "previous");
    },

    goNext() {
      if (this.otherOption == "others") {
        console.log("values : ", this.otherOption);
        // routing to Other page
      } else if (this.dietType == null && this.otherOption == null) {
        // Show an alert if no gender is selected
        Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Please select an option!',
                });
      } else {
        console.log("values : ", this.dietType);
        this.$emit('buttonAction', "next");
        this.$emit('addDietType', this.dietType);
        // routing to the final page
      }

    },
  },
};
</script>

<style scoped>
/* Your existing styling remains the same */
.container {
  direction: rtl;
  text-align: right !important;
  font-size: larger;
  font-weight: bold;
}
.card {
  cursor: pointer;
  border: none;
  transition: box-shadow 0.1s;
}

/* Apply styles to the selected card */
.card.selected {
  box-shadow: 0 0 2px 2px #007459;
}
</style>
