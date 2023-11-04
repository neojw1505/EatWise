<template>
  <div class="text-center">
    <router-link class="navbar-brand p-0 m-0" to="/">
    <li :class="this.$route.path==='/' ? 'highlightBackground' : ''" @click="highlighLink" style="list-style: none">
        <font-awesome-icon :icon="['fas', 'egg']" size="xl"/>
        <!-- money-bill-wheat -->
        <div class="fw-semibold fs-5 text-black">EatWise</div>
    </li>
  </router-link>
  </div>
</template>

<script>
export default {

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
</style>
