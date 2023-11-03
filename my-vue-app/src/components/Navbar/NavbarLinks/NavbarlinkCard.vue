<template>
    <router-link class="nav-link active py-0 d-flex mx-auto p-2 " aria-current="page" :to="eachLink.routeTo">
    <li :class="highlighLink(eachLink)" >
        <div>
        <font-awesome-icon :icon="icon" size="lg" /> <!-- Use icon prop to set the Font Awesome icon -->
        </div>
        <div class="fw-semibold" v-html="`&nbsp;&nbsp;${eachLink.linkName}&nbsp;&nbsp;`"></div> 
    </li>
    </router-link>
</template>
<script>
export default {
    name: "NavbarLink",
    props:['eachLink','icon'],
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
