<template>
  <div>
    <div class="d-flex align-items-center">
      <span class="d-inline px-2 m-0 fw-bold fs-3 mt-2 mb-3" style="color:black">Filter</span>
    </div>
    <!-- filter -->
    <div class="bg-white rounded-4 mt-5" id="marketFilter">
      <MarketFilterInput @getInput="handleInput"/>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    handleInput(data){
      this.$emit('getInput',data)
    }
  }
};
</script>

<style></style>
