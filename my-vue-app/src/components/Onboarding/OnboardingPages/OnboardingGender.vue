<template>
  
  <div>
    <div class="mx-auto text-center py-1 shadow rounded-4 col-5" style="background-color:#7A8CEA ;">
      <h1 class="fw-bold fs-4">Select Your Gender</h1>
    </div>
    <div class="mx-auto border rounded-4 d-flex flex-wrap shadow bg-white col-8">
      <!-- male -->
      <div @click="checked('male')" id="male" class="col d-flex card border-0 mx-auto text-center p-4 me-1" :class="{ 'selected': selectedGender === 'male' }">
        <font-awesome-icon :icon="['fas', 'mars']" style="color: #000000;" class="fa-10x" />
        <h4>Male</h4>
      </div>
      <!-- female -->
      <div @click="checked('female')" id="female" class="col d-flex card border-0 mx-auto text-center p-4" :class="{ 'selected': selectedGender === 'female' }">
        <font-awesome-icon :icon="['fas', 'venus']" style="color: #000000;" class="fa-10x" />
        <h4>Female</h4>
      </div>
    </div>
    <div class="mx-auto text-center">
      <button
        id="submit"
        class="btn my-5 px-5 fs-5 fw-semibold"
        type="submit"
        @click="nextPage()"
      >
        Next
      </button>
      <router-view></router-view>
    </div>
  </div>
  
</template>

<script>
import Swal from 'sweetalert2'; // Import SweetAlert2

export default {
  data() {
    return {
      selectedGender: "",
    };
  },
  methods: {
    checked(gender) {
      this.selectedGender = gender;
      console.log(gender);
    },
    nextPage() {
      if (!this.selectedGender) {
        // Show an alert if no gender is selected
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please indicate your gender!',
        });
      } 
      else {
      this.$emit('buttonAction', "next");
      this.$emit('addGender', this.selectedGender);
      }
      // Handle next page navigation here
    },
  },
};
</script>

<style scoped>
.selected {
  box-shadow: 0 0 2px 2px #007459;
}

.container {
  background-color: #7A8CEA;
}

.btn {
  background-color: #7A8CEA;
}

.card {
  width: 300px; /* Set the card width */
}
</style>
