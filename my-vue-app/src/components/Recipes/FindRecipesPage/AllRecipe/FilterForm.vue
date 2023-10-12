<template>
  <div class="collapse my-2 mx-auto" id="filter" style="max-width: 800px;">
    <div>
        <FilterMealType />
        <FilterDietType />
        <FilterByKeyword />
    </div>
  </div>
</template>

<script>
import FilterDietType from "./FilterDietType.vue";
import FilterMealType from "./FilterMealType.vue";

export default { components: { FilterDietType, FilterMealType } };
</script>

<style></style>
