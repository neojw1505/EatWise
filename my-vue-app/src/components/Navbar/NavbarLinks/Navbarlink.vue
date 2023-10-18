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
    background-color: #FFB18D;
    border-radius: 25px;
}
.logo{
    width: 25px;
    height: 25px;
}
li:hover{
            background-color: #FBE8A6;
            border-radius: 25px;
        }
</style>
