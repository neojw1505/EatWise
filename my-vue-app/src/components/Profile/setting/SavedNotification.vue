<template>
  <div
    v-if="show"
    class="alert alert-success alert-dismissible message "
    role="alert"
  >
    Your settings have been saved.
    <button
      @click="hideNotification"
      type="button"
      class="btn-close"
      aria-label="Close"
    ></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showNotification() {
      this.show = true;
    },
    hideNotification() {
      this.show = false;
    },
  },
  watch: {
    show() {
      setTimeout(() => {
        this.show = false;
      }, 1500); // Disappear after 1 second
    },
  },
};
</script>
<style>
.message {

  animation:savedSettingalert 0.5s 1;
    -webkit-animation:savedSettingalert 0.5s 1;
    animation-fill-mode: forwards;

    animation-delay:2s;
    -webkit-animation-delay:1s; /* Safari and Chrome */
    -webkit-animation-fill-mode: forwards;
}


@keyframes savedSettingalert{
    from {opacity :1;}
    to {opacity :0;}
}
@-webkit-keyframes savedSettingalert{
    from {opacity :1;}
    to {opacity :0;}
}
</style>
