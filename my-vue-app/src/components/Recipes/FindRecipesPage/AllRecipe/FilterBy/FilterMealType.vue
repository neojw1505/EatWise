<template>
  <div class="my-1">
    <div class="" id="FilterMealTypeOptions">
      <span class="fw-bold">Meal Type:</span>
      <div class="d-flex my-2">
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
      filterOption:"  rounded-3 col-3 bg-light border  text-center justify-content-center  align-items-center ",
      filterOptionCheck:"  rounded-3 col-3  bg-warning border  text-center justify-content-center  align-items-center",
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
