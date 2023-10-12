<template>
  <div class="my-1">
    <div
      class="d-block p-2 text-white rounded-4 d-flex justify-content-between align-items-center"
      data-bs-toggle="collapse"
      data-bs-target="#FilterDietTypeOptions"
      aria-expanded="false"
      aria-controls="FilterDietTypeOptions"
      style="background-color: #4F919F;"
    >
    <div> Meal Type</div>
    <div class="arrow-down"></div>
    </div>

    <div class="collapse" id="FilterDietTypeOptions">
      <div class="d-flex justify-content-between my-2 row text-center mx-auto ">
        <div @click="checked" :class="filterOption">Gluten Free</div>
        <div @click="checked" :class="filterOption">Pescatarian</div>
        <div @click="checked" :class="filterOption">Paleolithic</div>
        <div @click="checked" :class="filterOption">Dairy Free</div>
        <div @click="checked" :class="filterOption">Lacto Ovo Vegetarian</div>
        <div @click="checked" :class="filterOption">Primal</div>
        <div @click="checked" :class="filterOption">Whole 30</div>
        <div @click="checked" :class="filterOption">Vegan</div>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  data(){return{
    filterOption:"col-3 rounded-3 mx-auto bg-light border  text-center justify-content-center d-flex align-items-center ",
    filterOptionCheck:"col-3 rounded-3 mx-auto  bg-warning border  text-center justify-content-center d-flex align-items-center",
  }
  },
  methods:{
    checked(e){
      console.log(e)
      let currentStyle=e.target.className;
      e.target.className= this.filterOptionCheck;
      

      console.log(e.target.className)
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
.maxWidth{
  max-width: 100px;
}


</style>
