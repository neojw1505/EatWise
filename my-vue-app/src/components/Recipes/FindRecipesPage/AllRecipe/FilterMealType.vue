<template>
  <div class="my-1">
    <div
      class="d-block p-2 text-white rounded-4 d-flex justify-content-between align-items-center"
      data-bs-toggle="collapse"
      data-bs-target="#FilterMealTypeOptions"
      aria-expanded="false"
      aria-controls="FilterMealTypeOptions"
      style="background-color: #4F919F;"
    >
    <div> Meal Type</div>
    <div class="arrow-down"></div>
    </div>

    <div class="collapse" id="FilterMealTypeOptions">
      <div class="d-flex justify-content-between mx-5 my-2">
        <div @click="checked" class="filterOption col">Breakfast</div>
        <div @click="checked" class="filterOption col">Lunch</div>
        <div @click="checked" class="filterOption col">Dinner</div>
        <div @click="checked" class="filterOption col">Snack</div>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  methods:{
    checked(e){
      console.log(e.target)
      e.target.className= e.target.className=="filterOption col" ? "filterOptionCheck col" : "filterOption col"
    }
  }
};
</script>

<style scoped>
.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid ; /* Change the color as needed */
}
.filterOption{
  border-radius: 10px;
  background-color: white;
  border: 1px solid black;
  padding: 3px;
  text-align: center;
  max-width: 100px;
}

.filterOptionCheck{
  border-radius: 10px;
  background-color: #ECCAAE;
  border: 1px solid black;
  padding: 3px;
  text-align: center;
  max-width: 100px;
}
</style>
