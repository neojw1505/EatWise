<template>
  <div class="text-center">
    <router-link class="navbar-brand p-0 m-0" to="/">
    <li :class="this.$route.path==='/' ? 'highlightBackground' : ''" @click="highlighLink" style="list-style: none">
        <font-awesome-icon :icon="['fas', 'egg']" size="xl" v-if="isLargeScreen"/>
        <font-awesome-icon :icon="['fas', 'egg']" v-else/>
        <!-- money-bill-wheat -->
        <div class="fw-semibold text-black" :class="{'companyName':!isLargeScreen}" >EatWise</div>
    </li>
  </router-link>
  </div>
</template>

<script>
export default {
  data(){return{
    isLargeScreen: window.innerWidth > 992,
  }},
  methods:{
    checkScreenSize() {
      this.isLargeScreen = window.innerWidth > 992;
      console.log(this.isLargeScreen)
    },
  },
  async created() {
    window.addEventListener("resize", this.checkScreenSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
}
</script>

<style scoped>
.highlightBackground{
    color: #e0c580;
    border-radius: 25px;
}
.logo{
    width: 25px;
    height: 25px;
}
li:hover{
    color: #e0c580;
    border-radius: 25px;
}
.companyName{
  font-size: small;
}
</style>
