<template>
  <div class="my-1">
    <div
      class="d-block p-2  text-black fw-semibold  rounded-4 d-flex justify-content-between align-items-center"
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
        <input @click="checked" :class="filterOption" value="breakfast" type="button" >
        <input @click="checked" :class="filterOption" value="lunch" type="button" >
        <input @click="checked" :class="filterOption" value="dinner" type="button" >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      filterOption:" col-3 rounded-3 mx-auto bg-light border  text-center justify-content-center d-flex align-items-center ",
      filterOptionCheck:" col-3 rounded-3 mx-auto  bg-warning border  text-center justify-content-center d-flex align-items-center",
      filterBy: []
    }
  },
  methods:{
    checked(e){
      if (this.filterBy.includes(e.target.value)){
        e.target.className=this.filterOption;
        let index = this.filterBy.indexOf(e.target.value);
        this.filterBy.splice(index,1);
        // console.log(this.filterBy);
        this.$emit('getMealTypeInput', this.filterBy)
      }
      else{
        e.target.className=this.filterOptionCheck;
        this.filterBy.push(e.target.value)
        // console.log(this.filterBy);
        this.$emit('getMealTypeInput', this.filterBy)
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
