<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="fw-bold" style="color: #7aaab4">All Result:</h5>
      <div class="d-flex align-items-center">
        <h5 class="d-inline px-2 m-0">Filter Recommendations:</h5>
        <button
          class="btn align-items-center rounded-4 dropdown-toggle"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#filter"
          style="background-color: #7aaab4"
          aria-expanded="false"
          aria-controls="filter"
        >
          <img src="./filter.png" style="width: 50px;" />
        </button>
      </div>
    </div>
    
    <FilterForm/>

  </div>
</template>

<script>
export default {};
</script>

<style></style>
