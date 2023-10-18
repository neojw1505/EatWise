<template>
    <li :class="highlighLink(eachLink)" >
        <img class="logo" :src="eachLink.linkLogo" alt="" type="button" />
        <router-link class="nav-link active py-0" aria-current="page" :to="eachLink.routeTo">
            {{eachLink.linkName}}
        </router-link>
    </li>
  </template>
<script>
export default {
    name: "NavbarLink",
    props:['eachLink'],
    methods:{
        highlighLink(eachLink){
            // console.log(this.$route.path);
            // console.log(eachLink.routeTo);
            return this.$route.path.startsWith(eachLink.routeTo)   ? 'nav-item mx-2 highlightBackground' : 'nav-item mx-2';
        }
    }
}
</script>

<style scoped>
.highlightBackground{
<<<<<<< Updated upstream:my-vue-app/src/components/Navbar/NavbarLinks/Navbarlink.vue
    background-color: #AED4B7;
=======
    background-color: #FFB18D;
>>>>>>> Stashed changes:my-vue-app/src/components/Navbar/NavbarLinks/NavbarlinkCard.vue
    border-radius: 25px;
}
.logo{
    width: 25px;
    height: 25px;
}
li:hover{
<<<<<<< Updated upstream:my-vue-app/src/components/Navbar/NavbarLinks/Navbarlink.vue
            background-color: #AED4B7;
=======
            background-color: #FBE8A6;
>>>>>>> Stashed changes:my-vue-app/src/components/Navbar/NavbarLinks/NavbarlinkCard.vue
            border-radius: 25px;
        }
</style>
