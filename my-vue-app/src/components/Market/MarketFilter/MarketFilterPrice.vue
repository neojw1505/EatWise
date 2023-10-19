<template>
    <div>
        <div class="my-2">
          <b> Price Range: </b>
          <input
            v-model="minPrice"
            class="form-control d-inline"
            type="number"
            style="width: 80px"
          />
          to
          <input
            v-model="maxPrice"
            class="form-control d-inline"
            type="number"
            style="width: 80px"
          />
        </div>
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
  