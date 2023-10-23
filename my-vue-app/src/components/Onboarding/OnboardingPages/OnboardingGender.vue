<template>
  <div>
    <div class="container background-image ">
      <div class="mx-auto text-center my-5 rounded-4 bg-warning col-8">
        <h1>Select Your Gender</h1>
      </div>
      <div
        class="mx-auto border rounded-4 justify-content-center py-2 px-5 d-flex shadow bg-white col-8"
      >
        <!-- male -->
        <div @click="checked('male')" id="male" :class="filterOption">
          <img src="../img/male.png" />
          <h3>Male</h3>
        </div>
        <!-- female -->
        <div @click="checked('female')" id="female" :class="filterOption">
          <img  src="../img/female.png" />
          <h3>Female</h3>
        </div>
      </div>
      <div class="mx-auto text-center">
        <button
          id="submit"
          class="btn my-5 bg-warning px-5 fs-5 fw-semibold"
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
      filterOption: " border rounded-4 p-3 mx-md-5 bg-light shadow text-center",
      filterOptionCheck: " border rounded-4 p-3 mx-md-5 bg-warning shadow text-center",
      selectedGender: "",
    };
  },
  methods: {
    checked(gender) {
      if (this.selectedGender == gender) {
        this.selectedGender = "";
        document.getElementById(gender).className = this.filterOption;
      } else {
        this.selectedGender = gender;
        document.getElementById(gender).className = this.filterOptionCheck;
        if (gender == "male") {
          document.getElementById("female").className = this.filterOption;
        } else {
          document.getElementById("male").className = this.filterOption;
        }
      }
      // console.log(this.selectedGender);
    },
    nextPage(){
      
    }
  },
};
</script>

<style>

</style>
