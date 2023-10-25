<template>
  <div>
    <div class="background-image">
      <div class="container mx-auto text-center my-5 rounded-4 col-8">
        <h1>Select Your Gender</h1>
      </div>
      <div class="mx-auto border rounded-4 d-flex flex-wrap shadow bg-white col-8">
        <!-- male -->
        <div @click="checked('male')" id="male" class="col d-flex card border-0 mx-auto text-center p-4" :class="{ 'selected': selectedGender === 'male' }">
          <font-awesome-icon :icon="['fas', 'mars']" style="color: #000000;" class="fa-10x" />
          <h3>Male</h3>
        </div>
        <!-- female -->
        <div @click="checked('female')" id="female" class="col d-flex card border-0 mx-auto text-center p-4" :class="{ 'selected': selectedGender === 'female' }">
          <font-awesome-icon :icon="['fas', 'venus']" style="color: #000000;" class="fa-10x" />
          <h3>Female</h3>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedGender: "",
    };
  },
  methods: {
    checked(gender) {
      this.selectedGender = gender;
      console.log(gender)
    },
    nextPage() {
      this.$emit('buttonAction',"next")
      // Handle next page navigation here
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: #FFB18D; 
}
.container {
  background-color: #FFB18D; 
}
.btn {
  background-color: #FFB18D; 
}
.card {
  width: 300px; /* Set the card width */
}

</style>