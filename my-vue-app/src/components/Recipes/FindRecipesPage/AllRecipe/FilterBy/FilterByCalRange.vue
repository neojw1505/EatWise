<template>
  <div class="my-1">
    <div
      class="d-block p-2  text-black fw-semibold  rounded-4 d-flex justify-content-between align-items-center"
      data-bs-toggle="collapse"
      data-bs-target="#FilterByCaloriesOptions"
      aria-expanded="false"
      aria-controls="FilterByCaloriesOptions"
      style="background-color: #4f919f"
    >
      <div>By Calories</div>
      <div class="arrow-down"></div>
    </div>

    <div class="collapse" id="FilterByCaloriesOptions">
      <div class="my-2">
        <b> Calories: </b>
        <input
          v-model="minPrice"
          class="form-control d-inline"
          type="number"
          style="width: 100px"
          @change="this.$emit('getMinCalInput',minPrice)"
        />
        to
        <input
          v-model="maxPrice"
          class="form-control d-inline"
          type="number"
          style="width: 100px"
          @change="this.$emit('getMaxCalInput',maxPrice)"
        />
      </div>
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
