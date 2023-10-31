<template>
  <div class="container">
  <!-- Main card -->
  <div class="MainBody">
    <div class="header text-center mx-auto my-5 py-1 col-6 rounded " style="background-color:#7A8CEA ;">
      <h2>Ingredients to Exclude</h2>
    </div>
    <div class="card text-center mx-auto col-10 rounded shadow">
      <div class="card-body">
        <h5 class="card-title">Remove Ingredients you may dislike or are allergic to:</h5>
        <ul class="list list-unstyled list-inline">
          <!-- <li v-for= "(item, index) in itemList" :key="index" @click="DeleteItem(index)">{{ item }}</li> -->


          <li v-for="(item, index) in itemList" :key="index" @mouseover="showDeleteButton(index)" @mouseleave="hideDeleteButton(index)">
              {{ item }}
              <button class="btn btn-sm" v-show="showDelete[index]" @click="DeleteItem(index)" style="background-color: #939393;">X</button>
            </li>


          <button class="btn btn-sm " @click="AddItem" style="background-color: #7A8CEA;">Add more +</button>

        </ul>
      </div>
    </div>
  </div>

  <!-- Bottom Buttons -->
    <div class="mx-auto text-center">
      <button
        id="previous"
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color:#7A8CEA ;"
        type="submit"
        v-on:click="goPrevious()"
      >
        Previous
      </button>
      <button
        id="next"
        class="btn my-5 mx-2 px-5 fw-semibold"
        style="background-color:#7A8CEA ;"
        type="submit"
        v-on:click="goNext()"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemList: [],
      item :"",
      showDelete: [], // Array to track delete button visibility


    };
  },
  methods: {
    goPrevious() {
      this.$emit('buttonAction',"previous")
      
    },

    goNext() {
      console.log("values : ", this.itemList);
      this.$emit('buttonAction',"next")
      this.$emit('addExclusion', this.itemList);
    },

    // AddItem(){
    //   var input = prompt("What ingredient do you wish to exclude");
    //   this.itemList.push(input)
    // },
    // DeleteItem(index){
    //   this.itemList.splice(index,1)
    // }


    AddItem() {
      var input = prompt("What ingredient do you wish to exclude");
      if (input && input.trim() !== '') {
        this.itemList.push(input);
        this.showDelete.push({ item: input, showDelete: false });
      }
    },
    DeleteItem(index) {
      this.itemList.splice(index, 1);
      this.showDelete[this.itemList[index].showDelete].splice(index, 1);
    },
    showDeleteButton(index) {
      this.$set(this.showDelete, index, true);
    },
    hideDeleteButton(index) {
      this.$set(this.showDelete, index, false);
    },

  }, // methods
};
</script>

<style scoped>
.card-title{
color:grey;
font-size:small;
}

.card{
  height:60vh;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.50);
  background: #F9F7F7;
  flex-shrink: 0;
}
li{
  padding:10px;
  margin:4px;
  background-color: white;
  border-color:4px black;
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.50);
  border-radius: 10px;
  justify-content: space-between;
  display:inline-block

}
#addbutton{
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.50);
  background: #F9F7F7;
  
}
li:hover{
  background-color: grey;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.50);
}

</style>