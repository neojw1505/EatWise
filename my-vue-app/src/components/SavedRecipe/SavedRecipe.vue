<template>
  <div>
    <Navbar />
    <div class="mx-auto">
      <h2 class="m-3">Saved Recipes</h2>
      <button @click="getUserSavedRecipes">getUserSavedRecipes</button>
      <div class="mx-auto" style="max-width: 1200px">
        <div class="p-4 pt-2 shadow border rounded-4 my-3 d-flex mx-3 d-flex row">
          <div>
            <div v-if="data" class="d-flex flex-wrap">
            <SavedRecipeCard
              v-for="(item,recipeID) in data"
              :key="recipeID"
              :recipe="item"
              :routerTO="item.id"
              style="text-decoration: none"
              class=""
            />
            </div>

            <div v-else class="mx-auto text-center" style="width: 400px;">
                No Saved recipe Found
                <font-awesome-icon :icon="['fas', 'face-frown']" size="xl" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async getUserSavedRecipes() {
      this.data = await this.$smAPI.getUserSavedRecipes();
      // console.log(this.data);
    },
  },
  async created(){
    await this.getUserSavedRecipes();
  }
};
</script>

<style></style>
