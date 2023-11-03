<template>
  <div class="row mx-3 container mx-auto mb-5" style="max-width: 1200px;">
    <ProfileCalendar @getCalendarDate="handleCalendarDate"/>
    <ProfileConsumption :consumptionDate="selectedDate" />
  </div>
</template>

<script>
export default {
    data(){return{
        selectedDate: new Date(),
    }},
    methods:{
        handleCalendarDate(data){
            this.selectedDate=data
        },
    }
}
</script>

<style>

</style>