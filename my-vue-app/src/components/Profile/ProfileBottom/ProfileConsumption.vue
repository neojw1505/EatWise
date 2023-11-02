<template>
  <div class="col-lg-7 col-md-12 px-0 mx-2 rounded-4" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.51) 0%, rgba(157, 156, 183, 0.00) 100%, rgba(142, 120, 170, 0.00) 100%);">
    <!-- date of consumption -->
    <div class="mx-0 rounded-4 p-2 py-1  text-center" style="background-color:transparent; color:white;"><h4>{{formattedDate}}</h4></div>
    <!-- information on consumed recipe -->
    <div class="mx-auto m-2 col-8 text-center rounded-4 p-2" style="background-color: #94a1e2;">
      <div class=" rounded-4 text-center fs-5 fw-semibold mx-auto m-2" style="background-color: #7A8CEA; width: 80%;">Nutritional Info:</div>
      <!-- nutritional table -->
      <table class="table mx-auto text-center">
        <tr v-for="value,nutrient in NutritionalInfo" :key="nutrient">
          <th class="text-start mx-2">{{ nutrient }}</th>
          <td>{{ value }}</td>
        </tr>
      </table>
    </div>
    <!-- recipe consumed -->
    <div class="row justify-content-center my-3">
      <mealCard v-for="meal,mealtype in dummyMeal" :key="meal.title" :recipe="meal" :routerTO="meal.title" :mealType="mealtype"/>
    </div>

  </div>
</template>

<script>

import healthymeal from "./healthymeal.jpeg";

export default {
    props:['consumptionDate'],
    data(){return{
      NutritionalInfo:{
        "Calories":2000,
        "Carbohydrates":100,
        "Fat": 100,
        "Protein":100
      },
      dummyMeal:{
        "Breakfast":{
          "title":"Junwei",
          "image": healthymeal,
          "cal": 100
        },
        "Lunch":{
          "title":"Junwei",
          "image": healthymeal,
          "cal": 100
        },
        "Dinner":{
          "title":"Junwei",
          "image": healthymeal,
          "cal": 100
        },
      }
    }},
    computed:{
      formattedDate(){
        let tempDate= this.consumptionDate.toLocaleString().split(",")[0].split("/");
        // console.log(tempDate)
        let month={
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
        return tempDate[1]+" "+month[tempDate[0]]+" "+tempDate[2];
      }
    }

      
    }

</script>

<style>

</style>