<template>
  <div class="my-1">
    <div class="" id="FilterByCaloriesOptions">
      <div class="my-2">
        <b> Calories: </b>
        <input
          v-model="minCal"
          class="form-control d-inline"
          type="number"
          style="width: 100px"
          @change="this.$emit('getMinCalInput',minCal)"
        />
        to
        <input
          v-model="maxCal"
          class="form-control d-inline"
          type="number"
          style="width: 100px"
          @change="this.$emit('getMaxCalInput',maxCal)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minCal: "",
      maxCal: "",
    };
  },
  methods: {
  
  },
};
</script>

<style></style>
