<template>
    <li class="nav-item mx-2">
        <img class="logo" :src="eachLink.linkLogo" alt="" type="button" />
        <router-link class="nav-link active py-0" aria-current="page" :to="eachLink.routeTo">
            {{eachLink.linkName}}
        </router-link>
    </li>
  </template>
<script>
export default {
    name: "NavbarLink",
    props:['eachLink']
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
