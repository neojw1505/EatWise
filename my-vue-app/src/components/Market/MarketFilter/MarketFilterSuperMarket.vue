<template>
    <div>
        <div class="fw-bold mt-4">Supermarket:</div>
        <div class=" my-2 d-flex  flex-wrap">
            <input @click="checked" :class="filterOption" value="FairPrice"  type="button">
            <input @click="checked" :class="filterOption" value="Cold Storage"  type="button">
            <input @click="checked" :class="filterOption" value="Sheng Shiong"  type="button">
        </div>
    </div>
</template>
  
  <script>
  export default {
    data(){return{
      filterOption:"btn rounded-3 mx-1  bg-light border ",
      filterOptionCheck:"btn rounded-3  mx-1 bg-warning border",
      filterBy: []
    }
    },
    methods:{
      checked(e){
        if (this.filterBy.includes(e.target.value)){
          e.target.className=this.filterOption;
          let index = this.filterBy.indexOf(e.target.value);
          this.filterBy.splice(index,1);
          console.log(this.filterBy)
        }
        else{
          e.target.className=this.filterOptionCheck;
          this.filterBy.push(e.target.value)
          console.log(this.filterBy)
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
  