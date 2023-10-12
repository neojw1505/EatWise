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
    <div> Diet Type</div>
    <div class="arrow-down"></div>
    </div>

    <div class="collapse" id="FilterDietTypeOptions">
      <div class="d-flex justify-content-between my-2 row text-center mx-auto ">
        <input @click="checked" :class="filterOption" value="Gluten Free"  type="button">
        <input @click="checked" :class="filterOption" value="Pescatarian"  type="button">
        <input @click="checked" :class="filterOption" value="Paleolithic"  type="button">
        <input @click="checked" :class="filterOption" value="Dairy Free"  type="button">
        <input @click="checked" :class="filterOption" value="Lacto Ovo Vegetarian"  type="button">
        <input @click="checked" :class="filterOption" value="Primal"  type="button">
        <input @click="checked" :class="filterOption" value="Whole 30"  type="button">
        <input @click="checked" :class="filterOption" value="Vegan"  type="button">
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  data(){return{
    filterOption:"btn col-3 rounded-3 mx-auto bg-light border  text-center justify-content-center d-flex align-items-center",
    filterOptionCheck:"btn col-3 rounded-3 mx-auto  bg-warning border  text-center justify-content-center d-flex align-items-center",
    filterBy: []
  }
  },
  methods:{
    checked(e){
      if (this.filterBy.includes(e.target.value)){
        e.target.className=this.filterOption;
        let index = this.filterBy.indexOf(e.target.value);
        this.filterBy.splice(index,1);
      }
      else{
        e.target.className=this.filterOptionCheck;
        this.filterBy.push(e.target.value)
      }
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

</style>
