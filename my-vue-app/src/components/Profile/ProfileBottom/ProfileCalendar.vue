<template>
  <div class="col-lg col-md-12 px-0 mx-2  mb-2">
    <div
      style="
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.51) 100%,
          rgba(157, 156, 183, 0) 100%,
          rgba(142, 120, 170, 0) 100%
        );
      "
      class="rounded-4 "
    >
      <div
        class="m-2 p-2 fw-semibold d-flex"
        style="width: 100px; color: white"
      >
        <font-awesome-icon :icon="['fas', 'clock-rotate-left']" size="xl" />
        <span class="mx-2">History</span>
      </div>
      <!-- calendar below -->
      <calendar @getCalendarDate="handleCalendarDate" />
    </div>
  </div>
</template>

<script>
export default {
  // data(){return{
  //     date: ""
  // }}
  methods: {
    handleCalendarDate(data) {
      this.$emit("getCalendarDate", data);
    },
  },
};
</script>

<style></style>
