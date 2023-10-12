<template>
  <div class="mySwiper p-5 pt-2 shadow border rounded-4 my-3 d-flex mx-auto"  style="max-width: 1600px;" >
    <div
    
    class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 justify-content-start g-4"
    >
      <FindRecipePreviewCard
        v-for="item in dummyRecipe"
        :key="item.recipeName"
        :recipe="item"
        :routerTO="item.routerTO"
        style="text-decoration: none"
      />
    </div>
  </div>
</template>

<script>
import healthyRecipeImage from "../card/healthymeal.jpeg";
export default {
  data() {
    return {
      dummyRecipe: [
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
        {
          recipeName: "This is a dummy data",
          recipeImage: healthyRecipeImage,
          cal: 100,
          routerTO: "/find-recipes",
        },
      ],
    };
  },
};
</script>

<style></style>
