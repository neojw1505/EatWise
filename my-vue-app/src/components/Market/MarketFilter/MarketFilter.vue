<template>
  <div>
    <div class="d-flex align-items-center">
      <h5 class="d-inline px-2 m-0 fw-bold fs-1" style="color:white">Filter</h5>
      <button
        class="btn align-items-center rounded-4 dropdown-toggle"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#marketFilter"
        style="background-color: #fff"
      >
        <img src="./filter.png" style="width: 50px" />
      </button>
    </div>
    <!-- filter -->
    <div class="collapse show bg-white rounded-4" id="marketFilter">
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
