<template>
  <div class="bg">
  <div class="header text-center fs-1 mt-3 mb-3 fw-bold">  
    <span style="color:white">Meal <span style="color:#7A8CEA">History</span></span>
  </div>
  <div class="row mx-3 container mx-auto mb-5" style="max-width: 1200px;">
    <ProfileCalendar @getCalendarDate="handleCalendarDate"/>
    <ProfileConsumption :consumptionDate="selectedDate"/>
  </div>
</div>
</template>

<script>
export default {
    data(){return{
        selectedDate: new Date().toLocaleString().split(",")[0],
    }},
    methods:{
        handleCalendarDate(data){
            this.selectedDate=data
        }
    }
}
</script>

<style scoped>
</style>