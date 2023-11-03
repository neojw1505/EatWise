<template>
  <div
    class="col-lg-7 col-md-12 px-0 mx-2 rounded-4 border border-2 border-dark"
    style="background-color: #fbe8a6"
  >
    <!-- date of consumption -->
    <div
      class="mx-0 rounded-4 p-2 py-1 border border-2 border-dark text-center"
      style="background-color: #ffe1e1"
    >
      <h4>{{ formattedDate }}</h4>
    </div>
    <!-- information on consumed recipe -->
    <div
      class="mx-auto border border-2 border-dark m-2 col-8 rounded-4 p-4"
      style="background-color: white"
    >
      <div
        class="border rounded-4 text-center fs-5 fw-semibold mx-auto m-2"
        style="background-color: #fbe8a6; width: 80%"
      >
        Nutritional Info:
      </div>
      <!-- nutritional table -->
      <table class="table mx-auto">
        <tr>
          <th>Total Calories:</th>
          <td>{{ totalCalories.toFixed(1) }} kcal</td>
        </tr>
        <tr>
          <th>Total Carbs:</th>
          <td>{{ totalCarbs.toFixed(1) }} g</td>
        </tr>
        <tr>
          <th>Total Fats:</th>
          <td>{{ totalFats.toFixed(1) }} g</td>
        </tr>
        <tr>
          <th>Total Protein:</th>
          <td>{{ totalProtein.toFixed(1) }} g</td>
        </tr>
      </table>
    </div>
    <!-- recipe consumed -->
    <div class="row justify-content-center my-3">
      <mealCard
        v-for="(mealDetails, mealtype) in mealplan"
        :key="mealtype"
        :mealType="mealtype"
        :mealDetails="mealDetails"
        >{{ mealtype }}</mealCard
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["consumptionDate"],
  data() {
    return {
      mealplan: null,
      totalCalories: 0,
      totalCarbs: 0,
      totalFats: 0,
      totalProtein: 0,
    };
  },
  methods: {
    async GetConsumptionHistoryForDate(dateToPassinFB) {
      this.mealplan = await this.$smAPI.GetConsumptionHistoryForDate(
        dateToPassinFB
      );
      console.log(this.mealplan)
      //  reset values
       this.totalCalories = 0;
       this.totalCarbs = 0;
       this.totalFats = 0;
       this.totalProtein = 0;

      for (const key in this.mealplan) {
          // this.totalCalories += this.mealplan.key.recipe.calories
        let diffFormat=false;
        if(this.mealplan[key]['recipe']['nutrition']['calories']){
          diffFormat=true;
        }
        let totalCal= this.mealplan[key]['recipe']['nutrition']['calories'] ?? this.mealplan[key]['recipe']['nutrition']['nutrients'][0].amount
        let carbs=this.mealplan[key]['recipe']['nutrition']['carbs'] ??  this.mealplan[key]['recipe']['nutrition']['nutrients'][3].amount
        let protein=this.mealplan[key]['recipe']['nutrition']['protein'] ??  this.mealplan[key]['recipe']['nutrition']['nutrients'][8].amount
        let fat=this.mealplan[key]['recipe']['nutrition']['fat'] ??  this.mealplan[key]['recipe']['nutrition']['nutrients'][1].amount
        // console.log(this.mealplan[key]['recipe']['nutrition'])
        if(diffFormat){
          carbs=carbs.replace('g','')
          protein=protein.replace('g','')
          fat=fat.replace('g','')
        }
        this.totalCalories += Number(totalCal);
        this.totalCarbs += Number(carbs);
        this.totalFats += Number(fat);
        this.totalProtein += Number(protein);
      }
      
    },
  },
  computed: {
    formattedDate() {
      let date=this.consumptionDate.getDate();
      let month=this.consumptionDate.getMonth();
      let year=this.consumptionDate.getFullYear();

      let monthObj={
        '1':"January",
        '2':"February",
        '3':"March",
        '4':"April",
        '5':"May",
        '6':"June",
        '7':"July",
        '8':"August",
        '9':"September",
        '10':"October",
        '11':"November",
        '12':"December",
      };
      return date+" "+monthObj[month]+" "+year;
    },
  },
  watch: {
    consumptionDate: {
      handler(newDate, oldDate) {
        // Call the API when consumptionDate changes
        let passdate=newDate.getDate();
        let passmonth=newDate.getMonth()+1;
        let passyear=newDate.getFullYear();
        let dateToPassinFB = passyear + "-" + passmonth + "-" + passdate;
          console.log(dateToPassinFB)
        this.GetConsumptionHistoryForDate(dateToPassinFB.toString());
      },
      immediate: true, // To trigger the handler when the component is first created
    },
  },
};
</script>

<style></style>
