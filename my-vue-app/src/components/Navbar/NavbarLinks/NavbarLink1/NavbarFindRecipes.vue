<template>
  <li class="nav-item mx-2">
    <img class="logo" src="../../images/find_recipe.png" alt="" type="button" />
    <router-link class="nav-link active py-0" aria-current="page" to="/find-recipes">
        Find Recipes
    </router-link>
  </li>
</template>

<script>
export default {};
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
