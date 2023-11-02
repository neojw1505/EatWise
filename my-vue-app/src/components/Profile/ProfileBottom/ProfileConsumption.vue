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
          <td>{{ totalCalories }} kcal</td>
        </tr>
        <tr>
          <th>Total Carbs:</th>
          <td>{{ totalCarbs }} g</td>
        </tr>
        <tr>
          <th>Total Fats:</th>
          <td>{{ totalFats }} g</td>
        </tr>
        <tr>
          <th>Total Protein:</th>
          <td>{{ totalProtein }} g</td>
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

      //  reset values
       this.totalCalories = 0;
       this.totalCarbs = 0;
       this.totalFats = 0;
       this.totalProtein = 0;

      for (const key in this.mealplan) {
          // this.totalCalories += this.mealplan.key.recipe.calories
        this.totalCalories += Number(this.mealplan[key]['recipe']['nutrition']['calories']);
        this.totalCarbs += Number(this.mealplan[key]['recipe']['nutrition']['carbs'].replace('g',''));
        this.totalFats += Number(this.mealplan[key]['recipe']['nutrition']['fat'].replace('g',''));
        this.totalProtein += Number(this.mealplan[key]['recipe']['nutrition']['protein'].replace('g',''));
      }
      
    },
  },
  computed: {
    formattedDate() {
      let tempDate = this.consumptionDate
        .toLocaleString()
        .split(",")[0]
        .split("/");
      let month = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
      };
      return tempDate[1] + " " + month[tempDate[0]] + " " + tempDate[2];
    },
  },
  watch: {
    consumptionDate: {
      handler(newDate, oldDate) {
        // Call the API when consumptionDate changes
        let tempDate = newDate.toLocaleString().split(",")[0].split("/");
        let dateToPassinFB =
          tempDate[2] + "-" + tempDate[0] + "-" + tempDate[1];
        this.GetConsumptionHistoryForDate(dateToPassinFB);
      },
      immediate: true, // To trigger the handler when the component is first created
    },
  },
};
</script>

<style></style>
