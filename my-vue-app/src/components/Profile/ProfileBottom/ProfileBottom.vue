<template>
  <div class="bg">
  <div class="header text-center fs-1 fw-bold">  
    <h1 class="main-text"><span style="color:white">Meal <span style="color:#7A8CEA">History</span></span></h1>
  </div>
  <div data-aos="fade-left" data-aos-duration="1000" class="row mx-3 container mx-auto py-5" style="max-width: 1200px;">
    <ProfileCalendar @getCalendarDate="handleCalendarDate"/>
    <ProfileConsumption :consumptionDate="selectedDate" />
  </div>
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

<style scoped>
@media screen and (min-width: 601px) {
  h1.main-text {
    font-size: 60px;
  }
}

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
@media screen and (max-width: 600px) {
  h1.main-text {
    font-size: 40px;
  }
}
</style>

