<template>
  <div class="text-center mx-2">
    <li style="list-style: none">
      <router-link class="navbar-brand p-0 m-0" to="/">
        <img class="logo" src="../images/companyLogo.png" alt="" type="button" />
        <div>EATWISE</div>
      </router-link>
    </li>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.logo{
    width: 25px;
    height: 25px;
}
li:hover{
            background-color: #AED4B7;
            border-radius: 25px;
        }
</style>
