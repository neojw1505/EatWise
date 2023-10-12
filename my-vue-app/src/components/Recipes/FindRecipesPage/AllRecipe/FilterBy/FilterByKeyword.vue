<template>
  <div class="my-1">
    <div
      class="d-block p-2 text-white rounded-4 d-flex justify-content-between align-items-center"
      data-bs-toggle="collapse"
      data-bs-target="#FilterByKeywordOptions"
      aria-expanded="false"
      aria-controls="FilterByKeywordOptions"
      style="background-color: #4f919f"
    >
      <div>By Keyword</div>
      <div class="arrow-down"></div>
    </div>

    <div class="collapse" id="FilterByKeywordOptions">
      <div class=" my-2 ">
        <FilterByIngredients nameOfAction="Ingredients to be added"/>
        <FilterByIngredients nameOfAction="Ingredients to be removed"/>
        <!-- <FilterByPriceRange />
        <FilterBySupermarket/> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterOption:"btn col-3 rounded-3 mx-auto bg-light border  text-center justify-content-center d-flex align-items-center",
    filterOptionCheck:"btn col-3 rounded-3 mx-auto  bg-warning border  text-center justify-content-center d-flex align-items-center",
    filterBy: []
    };
  },
  methods: {
    addIngredient() {
      // console.log(this.addIngredientsToFilter)
      if (this.addIngredientsToFilter == "") {
        return;
      }
      this.ingrediendList.push(this.addIngredientsToFilter);
      this.addIngredientsToFilter = "";
      console.log(this.ingrediendList);
      console.log(this.addIngredientsToFilter);
    },
    removeIngredient(i) {
      console.log(i);
      this.ingrediendList.splice();
      let index = this.ingrediendList.indexOf(i);
      this.ingrediendList.splice(index, 1);
    },
  },
};
</script>

<style>
.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid ; /* Change the color as needed */
}</style>
