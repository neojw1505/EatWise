<template>
<div class="col-lg col-md-12 px-0 mx-2 rounded-4  mb-2" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.51) 100%, rgba(157, 156, 183, 0.00) 100%, rgba(142, 120, 170, 0.00) 100%);">
    <div class="m-2 p-2 fw-semibold" style="width: 100px;color:white">
        <font-awesome-icon :icon="['fas', 'clock-rotate-left']" size="xl" />
        History
    </div>
    <!-- calendar below -->
    <calendar @getCalendarDate="handleCalendarDate"/>
  </div>
</template>

<script>

export default {
    // data(){return{
    //     date: ""
    // }}
    methods:{
        handleCalendarDate(data){
            this.$emit('getCalendarDate',data)
        }
    }
}
</script>

<style>

</style>