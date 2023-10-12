<template>
    <div>
      <div class="d-flex align-items-center">
        <span class="fw-bold">Ingredient:</span>
        <input
          class="form-control d-inline"
          v-model="addIngredientsToFilter"
        /><span
          @click="addIngredient"
          class="btn border rounded-3 mx-2 px-2 border-2"
          type="button"
          >+</span
        >
      </div>
      <div class="m-3">
        <span
          v-for="i in ingrediendList"
          :key="i"
          class="rounded-5 border bg-dark-subtle p-2"
          :value="i"
          >{{ i
          }}<span
            class="border rounded-5 bg-light mx-2 px-2 align-items-center"
            @click="removeIngredient(i)"
            >x</span
          ></span
        >
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ingrediendList: [],
        addIngredientsToFilter: "",
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
        console.log(i)
        this.ingrediendList.splice()
        let index = this.ingrediendList.indexOf(i);
        this.ingrediendList.splice(index,1);
      },
    },
  };
  </script>
  
  <style></style>
  