<template>
    <div>
      <div class="d-flex align-items-center">
        <span class="fw-bold">Supermarket:</span>
        <span class="d-flex  my-2 ">
            <input @click="checked" :class="filterOption" value="Sheng Xiong"  type="button">
            <input @click="checked" :class="filterOption" value="FairPrice"  type="button">
            <input @click="checked" :class="filterOption" value="Cold Storage"  type="button">
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filterOption:"btn col-4 mx-1 rounded-3 mx-auto bg-light border  text-center justify-content-center d-flex align-items-center",
    filterOptionCheck:"btn col-4 mx-1 rounded-3 mx-auto  bg-warning border  text-center justify-content-center d-flex align-items-center",
    filterBy: []
      };
    },
    methods: {
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
    },
  };
  </script>
  
  <style></style>
  