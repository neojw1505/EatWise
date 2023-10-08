<template>
  <router-link :to="routerTO">
        <div class="card col-2 cardStyle">
          <img
            class="card-img-top"
            :src="recipe.recipeImage"
            alt="Recipe Image"
          />
          <div class="card-body img-fluid">
            <h4 class="card-title" style="font-size: large; height: 50px">
              {{formattedRecipeName}}
            </h4>
            <p class="card-text">{{recipe.cal}} cal</p>
          </div>
        </div>
      </router-link>
</template>

<script>
export default {
    name: "FindRecipePreviewCard",
        //recipe is an object which consist of recipeName,image and cal. 
        //routerTo is the path which will bring the user to view the complete recipe
        props: ["recipe", "routerTO"],
        computed: {
            //in the event that the name of the recipe is too long, we shorten the name
          formattedRecipeName() {
            return this.recipe.recipeName.length > 30
              ? this.recipe.recipeName.slice(0, 27) + "..."
              : this.recipe.recipeName;
          },
        },
        methods: {},
}
</script>

<style>

</style>