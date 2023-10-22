<template>
  <div class="text-center mx-2">
    <router-link class="navbar-brand p-0 m-0" to="/">
    <li :class="this.$route.path==='/' ? 'highlightBackground' : ''" @click="highlighLink" style="list-style: none">
        <font-awesome-icon :icon="['fas', 'money-bill-wheat']" size="xl" />
        <div class="fw-semibold">EatWise</div>
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
    color: #FBE8A6;
    border-radius: 25px;
}
.logo{
    width: 25px;
    height: 25px;
}
li:hover{
    color: #FBE8A6;
    border-radius: 25px;
}
</style>
