<template>
  <div>
    <div class="d-flex align-items-center pt-3">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      <span class="fw-bold mx-1">Search:</span>
      <input
        v-model="search"
        class="form-control d-inline px-2"
        @keyup="passSearch"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    passSearch() {
      this.$emit("getSearch", this.search);
    },
  },
};
</script>

<style></style>
