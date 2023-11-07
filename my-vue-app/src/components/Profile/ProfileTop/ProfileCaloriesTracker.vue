<template>
  <div
    class="col col-lg col-md-12 px-0 mx-2 rounded-4 border border-2 border-dark"
    style="
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.71) 100%,
        rgba(0, 0, 0, 0.21) 99.99%,
        rgba(0, 0, 0, 0.17) 100%
      );
    "
  >
    <div class="mx-0 rounded-3 p-2 text-center" style="color: white">
      <h4>
        <font-awesome-icon :icon="['fas', 'chart-simple']" /> Calories consumed
      </h4>
    </div>
    <CalorieIntakeChart />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
