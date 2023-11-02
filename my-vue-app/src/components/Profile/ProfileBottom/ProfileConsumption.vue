<template>
  <div class="col-lg-7 col-md-12 px-0 mx-2 rounded-4 border  border-2 border-dark" style="background-color: #FBE8A6;">
    <!-- date of consumption -->
    <div class="mx-0 rounded-4 p-2 py-1 border border-2 border-dark text-center" style="background-color: #FFE1E1;"><h4>{{formattedDate}}</h4></div>
    <!-- information on consumed recipe -->
    <div class="mx-auto border border-2 border-dark m-2 col-8 rounded-4 p-4" style="background-color: white;">
      <div class="border rounded-4 text-center fs-5 fw-semibold mx-auto m-2" style="background-color: #FBE8A6; width: 80%;">Nutritional Info:</div>
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
        "calories":2000,
        "carbohydrates":100,
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
        console.log(tempDate)
        return tempDate[0]+" "+month[tempDate[1]]+" "+tempDate[2];
      }
    }

      
    }

</script>

<style>

</style>