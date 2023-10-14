<template>
  <div class="text-center mx-2">
    <router-link class="navbar-brand p-0 m-0" to="/">
    <li :class="this.$route.path==='/' ? 'highlightBackground' : ''" @click="highlighLink" style="list-style: none">
        <img class="logo" src="../images/companyLogo.png" alt="" type="button" />
        <div class="fw-semibold">EATWISE</div>
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
    background-color: #7AAAB4;
    border-radius: 25px;
}
.logo{
    width: 25px;
    height: 25px;
}
li:hover{
            background-color: #7AAAB4;
            border-radius: 25px;
        }
</style>
