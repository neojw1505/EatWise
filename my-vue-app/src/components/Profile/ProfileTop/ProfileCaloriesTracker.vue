<template>
  <div
    class="col col-lg col-sm-12 "
  >
    <div
      style="
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.71) 100%,
          rgba(0, 0, 0, 0.21) 99.99%,
          rgba(0, 0, 0, 0.17) 100%
        );
      "
      class="rounded-4 border border-2 border-dark "
    >
      <div class="mx-0 rounded-3 p-2 text-center" style="color: white">
        <h4>
          <font-awesome-icon :icon="['fas', 'chart-simple']" /> Calories
          consumed
        </h4>
      </div>
      <CalorieIntakeChart class="rounded-4"/>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>


</style>
