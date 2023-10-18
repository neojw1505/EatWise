<template>
  <div class="text-center mx-2">
    <li :class="this.$route.path==='/' ? 'highlightBackground' : ''" @click="highlighLink" style="list-style: none">
      <router-link class="navbar-brand p-0 m-0" to="/">
        <img class="logo" src="../images/companyLogo.png" alt="" type="button" />
<<<<<<< Updated upstream
        <div>EATWISE</div>
      </router-link>
=======
        <div class="fw-semibold">EatWise</div>
>>>>>>> Stashed changes
    </li>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.highlightBackground{
<<<<<<< Updated upstream
    background-color: #AED4B7;
=======
    background-color: #FFB18D;
>>>>>>> Stashed changes
    border-radius: 25px;
}
.logo{
    width: 25px;
    height: 25px;
}
li:hover{
<<<<<<< Updated upstream
            background-color: #AED4B7;
=======
            background-color: #FBE8A6;
>>>>>>> Stashed changes
            border-radius: 25px;
        }
</style>
