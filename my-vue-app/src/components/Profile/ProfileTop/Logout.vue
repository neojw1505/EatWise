<template>

    <!-- logout button -->
    <div class="m-2 border border-2 border-dark rounded-4 bg-light p-2" style="width: 100px;" @click="logout">
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        <span class="fw-semibold"> Logout</span>
    </div>
</template>

<script>
export default {
    props:["userName"],
    data(){return{
    }},
    methods:{
        async logout(){
            await this.$smAPI.logout();
            this.$router.push({path:'/login'}).then(() => { this.$router.go() })
        }
    }

}
</script>

<style>

</style>