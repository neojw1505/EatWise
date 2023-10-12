<template>
    <div class="my-1">
    <b> Price Range:</b>
    <input
        v-model="minPrice"
        class="form-control d-inline"
        type="number"
        style="width: 100px"
    />
    to
    <input
        v-model="maxPrice"
        class="form-control d-inline"
        type="number"
        style="width: 100px"
    />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        minPrice: "",
        maxPrice: "",
      };
    },
    methods: {
    },
  };
  </script>
  
  <style></style>
  