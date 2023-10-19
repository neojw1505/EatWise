<template>
  <div>
    <div class="d-flex align-items-center">
      <h5 class="d-inline px-2 m-0 fw-bold">Filter</h5>
      <button
        class="btn align-items-center rounded-4 dropdown-toggle"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#marketFilter"
        style="background-color: #FFB18D"
      >
        <img src="./filter.png" style="width: 50px" />
      </button>
    </div>
    <!-- filter -->
    <div class="collapse show" id="marketFilter">
      <MarketFilterInput/>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
