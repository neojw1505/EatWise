<template>
  <div>
    <div class="d-flex align-items-center">
      <span class="fw-bold">Ingredients to be {{ nameOfAction }}:</span>
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
    <div class="m-3 d-flex justify-content-start" style="max-width: 800px; flex-wrap: wrap;">
      <div
        v-for="i in ingrediendList"
        :key="i"
        class="rounded-5 border bg-dark-subtle p-2 align-items-center mx-1 "
        :value="i"
      >
        {{ i
        }}<span
          class="fw-bolder border rounded-5 bg-light px-2 pb-1 align-items-center"
          @click="removeIngredient(i)"
          >x</span
        >
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ["nameOfAction"],
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
      // console.log(this.ingrediendList);
      if(this.nameOfAction=="added"){
        this.$emit('addIngredient',this.ingrediendList)
      }
      else{
        this.$emit('removeIngredient',this.ingrediendList)
      }
    },
    removeIngredient(i) {
      let index = this.ingrediendList.indexOf(i);
      this.ingrediendList.splice(index, 1);
      // console.log(this.ingrediendList);
      if(this.nameOfAction=="added"){
        this.$emit('addIngredient',this.ingrediendList)
      }
      else{
        this.$emit('removeIngredient',this.ingrediendList)
      }
    },
  },
};
</script>

<style></style>
