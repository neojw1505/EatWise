<template>
  <div class="card" v-if="recipeData">
    <div class="card-body">
      <h4 class="card-title">{{ recipeData.title }}</h4>
      <p class="card-text">Text</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipeData: {
      type: Object,
      required: true,
    },
    nutritionData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
