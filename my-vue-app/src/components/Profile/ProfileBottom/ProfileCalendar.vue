<template>
  <div class="col-lg col-md-12 px-0 mx-2 rounded-4  border border-2 border-dark mb-2" style="background-color: #FBE8A6;">
    <div class="m-2 p-2 fw-semibold" style="width: 100px;">
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